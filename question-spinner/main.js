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
		count:0
	},{
		enabled:true,
		text:"Bob",
		count:0
	},{
		enabled:true,
		text:"Sally",
		count:0
	},{
		enabled:true,
		text:"Jack",
		count:0
	},{
		enabled:true,
		text:"Jill",
		count:0
	},{
		enabled:true,
		text:"Bill",
		count:0
	},{
		enabled:true,
		text:"Don",
		count:0
	},{
		enabled:true,
		text:"Sam",
		count:0
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
	let data=req.json();
	// let pData=JSON.parse(localStorage.getItem("people"));
	// let qData=JSON.parse(localStorage.getItem("questions"));
	let pData=data?.people;
	let qData=data?.questions;
	if(pData!=null&&qData!=null){
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

loadFunc();

let saveFunc=()=>{
	if(saveLock){
		console.log("Skipped save");
		return;
	}
	let pData=unbind(peopleData);
	let qData=unbind(questionData);
	
	fetch("/save",{
		method: "POST",
		body:JSON.stringify({
			room:"default",
			people:pData,
			questionData:qData,
		})
	})
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
link(saveFunc,questionData,peopleData);
let saveFuncLink=link(()=>{
	questionData.forEach(x=>link(saveFunc,
		x.enabled,
		x.text,
		x.count
	));
	peopleData.forEach(x=>link(saveFunc,
		x.enabled,
		x.text,
		x.count
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
	${new EndSymbol}
	${new EditBox()}
`();
addElm(body,document.body);
body.disolve();

