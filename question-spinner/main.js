// Create global page styles
createStyles(scss`&{
	background-color: ${theme.color.greyStep(-1)};
	svg.patterns{
		position:absolute;
		opacity:0;
		width:0;
		height:0;
		>pattern>g{
			opacity:.3;
		}
	}
}`());

// Create data
let peopleData=bind([
	{
		enabled:true,
		text:"John",
		answerCount:0,
		askCount:0,
	},{
		enabled:true,
		text:"Bob",
		answerCount:0,
		askCount:0,
	},{
		enabled:true,
		text:"Sally",
		answerCount:0,
		askCount:0,
	},{
		enabled:true,
		text:"Jack",
		answerCount:0,
		askCount:0,
	},{
		enabled:true,
		text:"Jill",
		answerCount:0,
		askCount:0,
	},{
		enabled:true,
		text:"Bill",
		answerCount:0,
		askCount:0,
	},{
		enabled:true,
		text:"Don",
		answerCount:0,
		askCount:0,
	},{
		enabled:true,
		text:"Sam",
		answerCount:0,
		askCount:0,
	}
]);
let questionData=bind([
	{
		enabled:true,
		text:"How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
		count:0
	},{
		enabled:true,
		text:"What is your favorite color?",
		count:0
	}
]);

let loadFunc=async ()=>{
	let req=await fetch("/load/default");
	let data;
	try{
		data=await req.json();
	}catch(e){
		console.log("Skipped load, no data to load");
		return;
	}
	// let pData=JSON.parse(localStorage.getItem("people"));
	// let qData=JSON.parse(localStorage.getItem("questions"));
	let pData=data?.people;
	let qData=data?.questions;
	if(pData!=null&&qData!=null){
		console.log("load");
		// TODO: technically there should be validation here but it doesn't really matter
		peopleData=bind(
			pData
		);
		questionData=bind(
			qData
		);
	}else{
		console.log("Skipped load, data was null");
	}
};

let saveFunc=()=>{
	if(saveLock){
		console.log("Skipped save, due to save lock");
		return;
	}
	console.log("save");
	let pData=unbind(peopleData);
	let qData=unbind(questionData);
	
	fetch("/save",{
		method: "POST",
		body:JSON.stringify({
			room:"default",
			people:pData,
			questions:qData,
		})
	});
	// localStorage.setItem("people",JSON.stringify(pData)),
	// localStorage.setItem("questions",JSON.stringify(qData));
}
let saveLock=false;//TODO: use save locking
let lockSave=()=>{saveLock=true};
let unlockSave=(update=true)=>{
	saveLock=false;
	if(update){
		saveFunc();	
	}
};
let saveFuncLink;

async function main(){
	await loadFunc();
	link(saveFunc,questionData,peopleData);
	saveFuncLink=link(()=>{
		questionData.forEach(x=>link(saveFunc,
			x.enabled,
			x.text,
			x.count
		));
		peopleData.forEach(x=>link(saveFunc,
			x.enabled,
			x.text,
			x.askCount,
			x.answerCount
		));
	},questionData,peopleData);
	saveFuncLink();

	// Set up scroll watcher
	let scrollPosition=bind(0);
	document.addEventListener('scroll', ()=>{
		scrollPosition.data=window.scrollY;
	});

	// Populate page html
	let body=html`
		${new SpinnerBox()}
		${new EditBox()}
	`();
	addElm(body,document.body);
	body.disolve();
}
main();

