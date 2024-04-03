import { Application, Router, Status, send } from "https://deno.land/x/oak@14.2.0/mod.ts";
import {
	MongoClient,
	ObjectId,
} from "https://deno.land/x/atlas_sdk@v1.1.0/mod.ts";

// MONGO DB
const client = new MongoClient({
	endpoint: "https://us-west-2.aws.data.mongodb-api.com/app/data-bduil/endpoint/data/v1",
	dataSource: "Main-Cluster",
	auth: {
		apiKey: Deno.env.get("MONGO_API_KEY"),
	},
});

const db=client.database("small-projects");
const table=db.collection("question-spinner");

// SERVER
const ROOT_DIR=Deno.cwd()+"/question-spinner";

const app=new Application();
const router = new Router();
router.post('/save', async (ctx,next) =>{
	const ip=ctx.request.ip;
	const time=new Date().getTime();

	let body=await ctx.request.body.text();
	if(body.length<100000){
		try{
			let data=JSON.parse(body);
			if(typeof data=="object"&&!Array.isArray(data)){
				let room=data.room;
				let people=data.people;
				let questions=data.questions;
				if(room==null||people==null||questions==null){
					ctx.response.status=Status.BAD_REQUEST;
					return;
				}
				
  				let found=await table.findOne({room});
				if(found!=null){
					await table.updateOne(
						{room},
						{$set:{ 
							ip,
							time,
							data:body,
						}},
					);
				}else{
					await table.insertOne({
						_id: new ObjectId(),

						room,
						ip,
						time,
						data:body,
					});
				}
				ctx.response.status=Status.OK;
				return;
			}
		}catch{}
	}
	ctx.response.status=Status.BAD_REQUEST;
});
router.get('/load/:room', async (ctx,next) =>{
	let room=ctx?.params?.room;
	if(room==null){
		ctx.response.status=Status.BAD_REQUEST;
		return;
	}
	ctx.response.body=(await table.findOne({room}))?.data;
	ctx.response.status=Status.OK;
});
app.use(router.allowedMethods());
app.use(router.routes());

app.use(async (ctx, next)=>{
	const filePath=ctx.request.url.pathname;
	let root=ROOT_DIR;
	try{
		await send(ctx,filePath,{
			root,
			index: "index.html",
		});
	}catch{}
});

await app.listen({ port: 8000 });