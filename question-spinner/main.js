// Create global page styles
createStyles(scss`&{
	background-color: ${theme.color.greyStep(-1)};
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
	}
]);
let questionData=bind([
	{
		enabled:true,
		text:"How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
		count:0
	}
]);

let loadFunc=()=>{
	let pData=JSON.parse(localStorage.getItem("people"));
	let qData=JSON.parse(localStorage.getItem("questions"));
	if(pData!=null&&qData!=null){
		peopleData=bind(
			pData
		);
		questionData=bind(
			qData
		);
	}
};

loadFunc();

let saveFunc=()=>{
	let pData=unbind(peopleData);
	let qData=unbind(questionData);
	localStorage.setItem("people",JSON.stringify(pData)),
	localStorage.setItem("questions",JSON.stringify(qData));
}
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

