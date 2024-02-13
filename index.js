import { Application, send } from "https://deno.land/x/oak/mod.ts";

// SERVER
const ROOT_DIR=Deno.cwd()+"/question-spinner";

const app=new Application();

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