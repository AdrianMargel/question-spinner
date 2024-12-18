class Input extends CustomElm{
	constructor(text){
		super();
		text=bind(text);
		this.define(html`
			<input
				value=${attr(text)(text)}
				oninput=${attr(act((event)=>{
					text.data=event.target.value;
				}))()}
			/>
		`);
	}
}
defineElm(Input,scss`&{
	${theme.elementReset}
	position:relative;
	>input{
		width:100%;
		background-color:${theme.color.inputStep(-1.5)};
		border: 2px solid ${theme.color.inputStep(0)};
		padding:5px 10px;
		color:${theme.color.white};
		${theme.font.sizeStep(0)}
		box-sizing: border-box;
		height:40px;
	}
}`);

class InputInt extends CustomElm{
	constructor(num){
		super();
		num=bind(num);
		this.define(html`
			<input
				value=${attr(num)(num)}
				oninput=${attr(act((event)=>{
					let val=event.target.value;
					if(this.validate(val)){
						num.data=Number(val);
					}
				}))()}
			/>
		`);
	}
	validate(val){
		let vInt=Number(val);
		return !Number.isNaN(vInt)&&vInt>=0&&!val.includes(".");
	}
}
defineElm(InputInt,scss`&{
	${theme.elementReset}
	position:relative;
	>input{
		width:100%;
		background-color:${theme.color.inputStep(-1.5)};
		border: 2px solid ${theme.color.inputStep(0)};
		padding:0px 10px;
		color:${theme.color.white};
		${theme.font.sizeStep(0)}
		box-sizing: border-box;
		height:40px;
	}
}`);

class InputCheck extends CustomElm{
	constructor(checked){
		super();
		checked=bind(checked);
		this.define(html`
			<div
				onclick=${attr(act(()=>{
					checked.data=!checked.data;
				}))}
				class=${attr(()=>checked.data?"checked":"unchecked")(checked)}
			>
				<img src="img/xmark.svg" class="uncheck"/>
				<img src="img/check.svg" class="check"/>
			</div>
		`);
	}
}
defineElm(InputCheck,scss`&{
	${theme.elementReset}
	position:relative;
	>div{
		width:100%;
		background-color:${theme.color.inputStep(-1.5)};
		border: 2px solid ${theme.color.inputStep(0)};
		box-sizing: border-box;
		height:40px;
		${theme.center}
		img{
			width:30px;
			height:30px;
			display:none;
			user-select:none;
			pointer-events: none;
		}
		&.checked>img.check{
			display:block;
		}
		&.unchecked>img.uncheck{
			display:block;
		}
	}
}`);

class ButtonClickable extends CustomElm{
	constructor(text,event,selected=false){
		super();
		text=bind(text);
		event=bind(event);
		selected=bind(selected);
		this.define(html`
			<button
				class=${attr(()=>selected.data?"selected":"")(selected)}
				onclick=${attr(act(event.data))(event)}
			>
				<div class="surface">
					${html`${text}`(text)}
				</div>
				<div class="selector"><div></div></div>
			</button>
		`);
	}
}
defineElm(ButtonClickable,scss`&{
	>button{
		position: relative;
		padding: 0;
		border: none;
		background-color: ${theme.color.highlightDark};
		border-radius: 12px;
		${theme.boxShadowStep(-3)}
		.surface{
			font-family: 'Sen', sans-serif;
			font-weight: 700;
			font-size: 20px;
			color: white;
			background-color: ${theme.color.highlight};
			border: none;
			padding: 10px 30px;
			border-radius: 12px;
			position: relative;
			bottom: 10px;
			transition: bottom 0.1s;
		}
		.selector{
			opacity: 0;
			position: absolute;
			border: 12px solid transparent;
			border-bottom-color: #28282E;
			width: 0;
			height: 0;
			bottom: -12px;
			right: calc(50% - 12px);
			transition: bottom 0.4s, opacity 0.4s;
			div{
				position: absolute;
				border: 10px solid transparent;
				border-bottom-color: white;
				width: 0;
				height: 0;
				top: -4px;
				right: calc(50% - 10px);
			}
		}
		&.selected .selector{
			opacity: 1;
			bottom: -6px;
		}
		&:active .surface{
			bottom: 4px;
		}
		&:active .selector{
			bottom: -12px;
		}
	}
}`);

class ButtonExtraClickable extends CustomElm{
	constructor(text,event,selected=false){
		super();
		text=bind(text);
		event=bind(event);
		selected=bind(selected);
		this.hue=bind(0);
		this.hueAnim=animate((t,delta)=>this.hue.data=t%1,20,true);
		this.hueAnim.start();
		this.define(html`
			<button
				class=${attr(()=>selected.data?"selected":"")(selected)}
				onclick=${attr(act(event.data))(event)}
				style=${attr(()=>`background-color :${hsv(this.hue.data,.75,.5)}`)(this.hue)}
			>
				<div
					class="surface"
					style=${attr(()=>`background-color :${hsv(this.hue.data,.75,.75)}`)(this.hue)}
				>
					${html`${text}`(text)}
				</div>
				<div class="selector"><div></div></div>
			</button>
		`);
	}
}
defineElm(ButtonExtraClickable,scss`&{
	>button{
		position: relative;
		padding: 0;
		border: none;
		border-radius: 15px;
		box-shadow: 0px 0px 10px ${rgb(0,0,0,.75)};
		.surface{
			font-family: 'Sen', sans-serif;
			font-weight: 700;
			font-size: 20px;
			color: white;
			border: none;
			padding: 10px 30px;
			border-radius: 15px;
			position: relative;
			bottom: 10px;
			transition: bottom 0.1s;
		}
		.selector{
			opacity: 0;
			position: absolute;
			border: 12px solid transparent;
			border-bottom-color: #28282E;
			width: 0;
			height: 0;
			bottom: -12px;
			right: calc(50% - 12px);
			transition: bottom 0.4s, opacity 0.4s;
			div{
				position: absolute;
				border: 10px solid transparent;
				border-bottom-color: white;
				width: 0;
				height: 0;
				top: -4px;
				right: calc(50% - 10px);
			}
		}
		&.selected .selector{
			opacity: 1;
			bottom: -6px;
		}
		&:active .surface{
			bottom: 4px;
		}
		&:active .selector{
			bottom: -12px;
		}
	}
}`);

class ButtonLink extends CustomElm{
	constructor(text,event){
		super();
		text=bind(text);
		event=bind(event);
		this.hue=bind(0);
		this.hueAnim=animate((t,delta)=>this.hue.data=t%1,20,true);
		this.hueAnim.start();
		this.define(html`
			<button
				onclick=${attr(act(event.data))(event)}
				style=${attr(()=>`color :${hsv(this.hue.data,.75,.75)}`)(this.hue)}
			>
				${html`${text}`(text)}
			</button>
		`);
	}
}
defineElm(ButtonLink,scss`&{
	>button{
		margin: 0;
		padding: 0;
		display: inline;
		cursor: pointer;
		background-color: transparent;
		&:hover{
			text-decoration: underline;
		}
	}
}`);

class EndSymbol extends CustomElm{
	constructor(){
		super();
		this.define(html`
			<div class="icon"></div>
			<div class="line"></div>
			<div class="cover"></div>
		`);
	}
}
defineElm(EndSymbol,scss`&{
	height: 70px;
	${theme.centerX}
	opacity: 0.2;
	position: absolute;
	bottom:0;
	right: calc(50% - 90px);
	width: 180px;
	z-index: -1;
	.icon{
		position: absolute;
		top: 0px;
		width: 60px;
		height: 60px;
		background-image: url("./img/logoSmall.png");
		background-position: center;
		background-size: cover;
		z-index: 2;
	}
	.line{
		position: absolute;
		top: 30px;
		width: 100%;
		border-top: 1px solid white;
	}
	.cover{
		position: absolute;
		top: 0px;
		width: 60px;
		height: 60px;
		background-color: #28282E;
	}
}`);

class Spinner extends CustomElm{
	constructor(reverse){
		super();
		// this.list=peopleData;
		this.list=def(()=>peopleData.filter(a=>a.enabled.data),peopleData);
		this.listLink=link(()=>peopleData.forEach(x=>{
			x.enabled.sub(this.list.updateSub);
		}),peopleData);
		this.listLink();

		this.reverse=reverse;
		this.ang=bind(0);
		this.prevAng=0;
		this.nextAng=0;
		this.spinAnim=animate((t,delta)=>
			this.ang.data=mix(this.prevAng,this.nextAng,1-pow(1-t,3)),4,false);
		this.define(html`
			<div class="spinner" style=${attr(()=>`transform: rotate(${this.ang.data}rad)`)(this.ang)}>
				${()=>this.list.data.map((a,i,arr)=>new SpinnerSlice(a.text,i,arr.length)
				)}
			</div>
		`(this.list));
	}
	spin(resultIdx){
		this.prevAng=this.ang.data;
		let tarAng=resultIdx/this.list.data.length*TAU;
		let offAng=this.prevAng%TAU;
		this.nextAng=this.prevAng-offAng-tarAng+(this.reverse?-2:3)*TAU;
		this.spinAnim.start();
	}
}
defineElm(Spinner,scss`&{
	display:block;
	position:relative;
	width: 800px;
	height: 800px;
	.spinner{
		box-shadow: 0px 0px 50px ${rgb(0,0,0,.75)};
		border-radius: 1000px;
		width: 100%;
		height: 100%;
		position:relative;
	}
}`);
class SpinnerSlice extends CustomElm{
	constructor(text,num,range){
		super();

		this.text=bind(text);


		// let colBase=RGB(...[
		// 	[247,146,30],
		// 	[177,70,34],
		// 	[96,39,72],
		// 	[62,28,52],
		// ][num%4]).toSpace("hsv");
		let colBase=hsv(num/range,.75,1);
		let colDark=colBase.cln().scl([1.,1.,.7,1.]);
		let colText=hsv(colBase.cln().x,1,1);
		let colTextBorder=colText.cln().scl([1.,.5,1.,1.]);
		let colTextBack=colText.cln().scl([1.,.75,.25,1.]);

		let arcStart=VecA(50,PI/range).add(50);
		let arcEnd=VecA(50,-PI/range).add(50);
		this.define(html`
			<div style="transform: rotate(${num/range*TAU}rad)">
				<svg viewBox="0 0 100 100">
				${(range>1)?svg`
					<path
						d="M ${arcStart.x} ${arcStart.y}
							A 50 50 0 0 0 ${arcEnd.x} ${arcEnd.y}
							L 50 50
							L ${arcStart.x} ${arcStart.y}"
						fill="${colBase}"
					/>
					<path
						d="M ${arcStart.x} ${arcStart.y}
							A 50 50 0 0 0 ${arcEnd.x} ${arcEnd.y}
							L 50 50
							L ${arcStart.x} ${arcStart.y}"
						fill="url(#pattern${num%6})"
					/>
					<path
						d="M ${arcStart.x} ${arcStart.y}
							L 50 50
							L ${arcEnd.x} ${arcEnd.y}"
						fill="transparent"
						stroke="${colDark}"
						stroke-width=".5"
					/>
				`:null}
				</svg>
				<p 
					style="
						background-color:${colTextBack};
						border-color:${colTextBorder};
						color:${colText};
					"
				>
					${html`${this.text}`(this.text)}
				</p>
			</div>
		`);
	}
}
defineElm(SpinnerSlice,scss`&{
	>div{
		${theme.centerY}
		justify-content:flex-end;
		position: absolute;
		inset:0;
		>p{
			margin-right:20px;
			position:relative;
			padding:5px 10px;
			border-radius:100px;
			box-shadow: 0px 0px 10px ${rgb(0,0,0,.75)};
			border: 2px solid;
			${theme.font.interact}
			margin-right:30px;
		}
		>svg{
			position: absolute;
			inset:0px;
		}
	}
}`);
class SpinnerStack extends CustomElm{
	constructor(spinFunc,updateCountFunc){
		super();
		this.hue=bind(1);
		this.hueAnim=animate((t,delta)=>this.hue.data=t%1,20,true);
		this.hueAnim.start();
		this.updateCountDisabled=bind(true);

		this.spinner1;
		this.spinner2;

		this.define(html`
			<div>
				${this.spinner1=addClass("first",new Spinner())}
				${this.spinner2=addClass("second",new Spinner(true))}
				<div class="center">
					${new ButtonExtraClickable("SPIN",()=>{
						this.updateCountDisabled.data=false;
						spinFunc();
					})}
					${new ButtonLink("UPDATE COUNTS",()=>{
						this.updateCountDisabled.data=true;
						updateCountFunc();
					}).attr("class",()=>this.updateCountDisabled.data?"disabled":"")(this.updateCountDisabled)}
					<div class="arrow"></div>
					<div class="line"></div>
					<div class="highlight"></div>
				</div>
				<div
					class="highlightBack"
					style=${attr(()=>`border-color:${hsv(this.hue.data,.75,.75)}`)(this.hue)}
				></div>
			</div>
		`);
	}
	spin(){
		let enabledPeople=peopleData.filter(x=>x.enabled.data);
		let enabledQuestions=questionData.filter(x=>x.enabled.data);
		if(enabledPeople.length<2||enabledQuestions.length<1){
			return;
		}

		function pick(list,pickByFunc){
			let sorted=[...list].sort((a,b)=>pickByFunc(a)-pickByFunc(b));
			let least=pickByFunc(sorted[0]);
			let options=sorted.filter(x=>pickByFunc(x)<=least);
			let idx=flr(rand(options.length));
			return options[idx];
		}
		
		let personAnswer=pick(enabledPeople,x=>x.answerCount.data);
		let remainingPeople=[...enabledPeople].filter(x=>x!=personAnswer); //prevent people from asking themselves
		let personAsk=pick(remainingPeople,x=>x.askCount.data);

		let question=pick(enabledQuestions,x=>x.count.data);
		
		this.spinner1.spin(enabledPeople.indexOf(personAnswer));
		this.spinner2.spin(enabledPeople.indexOf(personAsk));
		return {question,personAnswer,personAsk};
	}
}
defineElm(SpinnerStack,scss`&{
	${theme.elementReset}
	>div{
		width:400px;
		height:400px;
		position:relative;
		${theme.center}
		>${Spinner}{
			user-select:none;
			pointer-events:none;
			position:absolute;
			&.first{
				width: 1200px;
				height: 1200px;
			}
			&.second{
				width: 800px;
				height: 800px;
			}
		}
		>.center{
			z-index:1;
			box-shadow: 0px 0px 50px ${rgb(0,0,0,.75)};
			position:absolute;
			height:400px;
			width:400px;
			border-radius:1000px;
			background-color:${theme.color.white};
			${theme.center}
			flex-direction:column;
			>${ButtonLink}{
				button{
					transition: opacity .5s;
					margin-top:60px;
					margin-bottom:10px;
					${theme.font.interact}
				}
				&.disabled{
					button{
						opacity:0;
						pointer-events:none;
					}
				}
			}
			>.arrow{
				position:absolute;
				height:30px;
				width:30px;
				border-radius:5px;
				background-color:${theme.color.white};
				right:-10px;
				transform: rotate(45deg);
			}
			>.line{
				position:absolute;
				height:8px;
				border-radius:100px;
				width:330px;
				box-shadow: inset 0px 0px 5px ${rgb(0,0,0,.2)};
			}
			>.highlight{
				position:absolute;
				height:8px;
				border-radius:100px;
				height:60px;
				right:-390px;
				left:350px;
				border-top-left-radius:0;
				border-bottom-left-radius:0;
				border: 8px solid ${theme.color.white};
				border-left:none;
			}
		}
		>.highlightBack{
			position:absolute;
			height:8px;
			border-radius:100px;
			height:${60-8}px;
			right:-${390+4}px;
			left:350px;
			border-top-left-radius:0;
			border-bottom-left-radius:0;
			border: 16px solid;
			border-left:none;
		}
	}
}`);

class QuestionDisplay extends CustomElm{
	constructor(question,personAnswer,personAsk){
		super();
		this.question=question;
		this.personAnswer=personAnswer;
		this.personAsk=personAsk;

		this.delayAnim=animate((t,delta)=>{
			if(t==1)
				this.peopleFadeAnim.start();
		},3.5);

		this.peopleFade=bind(0);
		this.peopleFadeAnim=animate((t,delta)=>{
			this.peopleFade.data=easeInOutQuad(t);
			if(t>.5)
				this.questionFadeAnim.resume();
		},1);

		this.questionFade=bind(0);
		this.questionFadeAnim=animate((t,delta)=>{
			this.questionFade.data=easeInOutQuad(t);
		},1);

		this.define(html`
			<div>
				<p
					class="people"
					style=${attr(()=>`
						opacity:${this.peopleFade.data};
						top:${this.peopleFade.data*20-10}px;
					`)(this.peopleFade)}
				>
					${html`${()=>
						this.personAsk.data==null?
							""
							:html`${this.personAsk.data.text}`(this.personAsk.data.text)
					}`(this.personAsk)}
					asks
					${html`${()=>
						this.personAnswer.data==null?
							""
							:html`${this.personAnswer.data.text}`(this.personAnswer.data.text)
					}`(this.personAnswer)}
				</p>
				<p
					class="question"
					style=${attr(()=>`
						opacity:${this.questionFade.data};
						top:${this.questionFade.data*40-20}px;
					`)(this.questionFade)}
				>
					${html`${()=>
						this.question.data==null?
							""
							:html`${this.question.data.text}`(this.question.data.text)
					}`(this.question)}
				</p>
				<div 
					class="back"
					style=${attr(()=>`
						opacity:${this.questionFade.data};
					`)(this.questionFade)}
				></div>
			</div>
		`);
	}
	ask(){
		this.questionFade.data=0;
		this.questionFadeAnim.stop();
		this.questionFadeAnim.reset();

		this.peopleFade.data=0;
		this.peopleFadeAnim.stop();
		this.peopleFadeAnim.reset();

		this.delayAnim.start();
	}
}
defineElm(QuestionDisplay,scss`&{
	${theme.elementReset}
	${theme.center}
	>div{
		padding-right:40px;
		padding-left:40px;
		padding-top:20px;
		padding-bottom:60px;
		position:relative;
		>p{
			z-index:1;
			text-shadow: 0px 0px 20px ${rgb(0,0,0,1)},0px 0px 20px ${rgb(0,0,0,1)};
			position:relative;
			margin:0;
			&.people{
				${theme.font.interact}
				${theme.font.sizeStep(0)}
				text-decoration:underline;
			}
			&.question{
				${theme.font.sizeStep(3)}
				max-width:1000px;
			}
		}
		>.back{
			position:absolute;
			inset:0;
			background-color:${theme.color.greyStep(0)};
			border: 4px solid ${theme.color.white};
			border-radius:40px;
			box-shadow: 0px 0px 20px ${rgb(0,0,0,.75)};
		}
	}
}`);

class SpinnerBox extends CustomElm{
	constructor(){
		super();

		this.spinnerElm;
		this.questionElm;

		this.question=bind(null);
		this.personAnswer=bind(null);
		this.personAsk=bind(null);

		this.define(html`
			<div>
				<div class="spinner">
					${this.spinnerElm=new SpinnerStack(()=>{
						let result=this.spinnerElm.spin();
						if(result!=null){
							this.question.data=result.question;
							this.personAnswer.data=result.personAnswer;
							this.personAsk.data=result.personAsk;
							this.questionElm.ask();
						}
					},()=>this.updateCount())}
				</div>
				${this.questionElm=new QuestionDisplay(this.question,this.personAnswer,this.personAsk)}
			</div>
		`);
	}
	updateCount(){
		lockSave();
		if(this.question.data!=null)
			this.question.data.count.data++;
		if(this.personAnswer.data!=null)
			this.personAnswer.data.answerCount.data++;
		if(this.personAsk.data!=null)
			this.personAsk.data.askCount.data++;

		this.normalizeCount();
		unlockSave();
	}
	normalizeCount(){
		function norm(list,getFunc,setFunc){
			if(list.length>=2){
				let minVal=list.map(getFunc).reduce((a,b)=>min(a,b));
				if(minVal>0){
					list.forEach(x=>setFunc(x,minVal));
				}
			}
		}

		norm(questionData,x=>x.count.data,(x,v)=>x.count.data-=v);
		norm(peopleData,x=>x.askCount.data,(x,v)=>x.askCount.data-=v);
		norm(peopleData,x=>x.answerCount.data,(x,v)=>x.answerCount.data-=v);
	}
}
defineElm(SpinnerBox,scss`&{
	display:block;
	overflow:hidden;
	>div{
		height:max(900px, 100vh);
		position:relative;
		>.spinner{
			${theme.center}
			>${SpinnerStack}{
				margin-top:20px;
				margin-bottom:20px;
			}
		}
	}
}`);

class QuestionEditList extends CustomElm{
	constructor(list){
		super();

		this.list=list;

		this.define(html`
			<div class="head">
				<div class="delete">
				</div>
				<div class="name">
					<p>Name<p>
				</div>
				<div class="num">
					<p>Count<p>
				</div>
				<div class="on">
					<p>On<p>
				</div>
			</div>
			<div class="body">
				${html`${()=>this.list.map((a,i)=>html`
					<div class=${attr(()=>"item "+(a.enabled.data?"":"disabled"))(a.enabled)}>
						<div class="idx"><p>${i}</p></div>
						<button class="delete" onclick=${attr(act(()=>{
							let idx=this.list.indexOf(a);
							if(idx!=-1){
								this.list.lock();
								this.list.splice(idx,1);
								this.list.unlock();
							}
						}))}>
							<img src="img/trash-can.svg">
						</button>
						<div class="name">
							${new Input(a.text)}
						</div>
						<div class="num">
							${new InputInt(a.count)}
						</div>
						<div class="on">
							${new InputCheck(a.enabled)}
						</div>
						<div class="cover"></div>
					</div>
				`)}`(this.list)}
				<button class="addItem" onclick=${attr(act(()=>{
					this.list.push({
						enabled:true,
						text:"",
						count:0
					})
				}))}>
					<p>ADD NEW</p>
				</button>
			</div>
		`);
	}
}
defineElm(QuestionEditList,scss`&{
	display:block;
	width:100%;
	>.head{
		border: 2px solid ${theme.color.inputStep(0)};
		border-bottom:none;
		background-color:${theme.color.inputStep(-.5)};
		${theme.center}
		>div{
			border: 2px solid ${theme.color.inputStep(0)};
			border-bottom:none;
			height:${40-2}px;
			${theme.center}
			box-sizing: border-box;
			${theme.font.interact}
			color:${theme.color.inputStep(5)};
		}
		>.delete{
			width:40px;
			min-width:40px;
		}
		>.name{
			flex-grow:1;
		}
		>.num{
			width:100px;
			min-width:100px;
		}
		>.on{
			width:40px;
			min-width:40px;
		}
	}
	>.body{
		border: 2px solid ${theme.color.inputStep(0)};
		>.item{
			display:flex;
			position: relative;
			>.idx{
				height:40px;
				width:40px;
				position: absolute;
				${theme.center}
				>p{
					position: relative;
					right:40px;
					opacity:.25;
					color:${theme.color.white};
					${theme.font.secondary};
					${theme.font.sizeStep(0)}
				}
			}
			>.delete{
				cursor: pointer;
				background-color:${theme.color.inputStep(-1.5)};
				border: 2px solid ${theme.color.inputStep(0)};
				width:40px;
				min-width:40px;
				${theme.center}
				>img{
					z-index:2;
					width:20px;
					height:20px;
					opacity:.25;
				}
				&:hover{
					>img{
						opacity:1;
					}
				}
			}
			>.name{
				flex-grow:1;
			}
			>.num{
				width:100px;
				min-width:100px;
			}
			>.on{
				width:40px;
				min-width:40px;
			}
			&.disabled{
				>.cover{
					position:absolute;
					inset:2px;
					background-color: ${theme.color.inputStep(-2)};
					opacity:.75;
					pointer-events:none;
				}
			}
		}
		>.addItem{
			cursor: pointer;
			background-color:${theme.color.inputStep(-1.5)};
			height:40px;
			border: 2px solid ${theme.color.inputStep(0)};
			${theme.center}
			width:100%;
			>p{
				${theme.font.interact}
				color:${theme.color.white};
				user-select:none;
			}
			&:hover{
				background-color:${theme.color.inputStep(-.5)};

			}
		}
	}
}`);

class PeopleEditList extends CustomElm{
	constructor(list){
		super();

		this.list=list;

		this.define(html`
			<div class="head">
				<div class="delete">
				</div>
				<div class="name">
					<p>Name<p>
				</div>
				<div class="num">
					<p>Asked<p>
				</div>
				<div class="num">
					<p>Answered<p>
				</div>
				<div class="on">
					<p>On<p>
				</div>
			</div>
			<div class="body">
				${html`${()=>this.list.map((a,i)=>html`
					<div class=${attr(()=>"item "+(a.enabled.data?"":"disabled"))(a.enabled)}>
						<div class="idx"><p>${i}</p></div>
						<button class="delete" onclick=${attr(act(()=>{
							let idx=this.list.indexOf(a);
							if(idx!=-1){
								this.list.lock();
								this.list.splice(idx,1);
								this.list.unlock();
							}
						}))}>
							<img src="img/trash-can.svg">
						</button>
						<div class="name">
							${new Input(a.text)}
						</div>
						<div class="num">
							${new InputInt(a.askCount)}
						</div>
						<div class="num">
							${new InputInt(a.answerCount)}
						</div>
						<div class="on">
							${new InputCheck(a.enabled)}
						</div>
						<div class="cover"></div>
					</div>
				`)}`(this.list)}
				<button class="addItem" onclick=${attr(act(()=>{
					this.list.push({
						enabled:true,
						text:"",
						askCount:0,
						answerCount:0
					})
				}))}>
					<p>ADD NEW</p>
				</button>
			</div>
		`);
	}
}
defineElm(PeopleEditList,scss`&{
	display:block;
	width:100%;
	>.head{
		border: 2px solid ${theme.color.inputStep(0)};
		border-bottom:none;
		background-color:${theme.color.inputStep(-.5)};
		${theme.center}
		>div{
			border: 2px solid ${theme.color.inputStep(0)};
			border-bottom:none;
			height:${40-2}px;
			${theme.center}
			box-sizing: border-box;
			${theme.font.interact}
			color:${theme.color.inputStep(5)};
		}
		>.delete{
			width:40px;
			min-width:40px;
		}
		>.name{
			flex-grow:1;
		}
		>.num{
			width:100px;
			min-width:100px;
		}
		>.on{
			width:40px;
			min-width:40px;
		}
	}
	>.body{
		border: 2px solid ${theme.color.inputStep(0)};
		>.item{
			display:flex;
			position: relative;
			>.idx{
				height:40px;
				width:40px;
				position: absolute;
				${theme.center}
				>p{
					position: relative;
					right:40px;
					opacity:.25;
					color:${theme.color.white};
					${theme.font.secondary};
					${theme.font.sizeStep(0)}
				}
			}
			>.delete{
				cursor: pointer;
				background-color:${theme.color.inputStep(-1.5)};
				border: 2px solid ${theme.color.inputStep(0)};
				width:40px;
				min-width:40px;
				${theme.center}
				>img{
					z-index:2;
					width:20px;
					height:20px;
					opacity:.25;
				}
				&:hover{
					>img{
						opacity:1;
					}
				}
			}
			>.name{
				flex-grow:1;
			}
			>.num{
				width:100px;
				min-width:100px;
			}
			>.on{
				width:40px;
				min-width:40px;
			}
			&.disabled{
				>.cover{
					position:absolute;
					inset:2px;
					background-color: ${theme.color.inputStep(-2)};
					opacity:.75;
					pointer-events:none;
				}
			}
		}
		>.addItem{
			cursor: pointer;
			background-color:${theme.color.inputStep(-1.5)};
			height:40px;
			border: 2px solid ${theme.color.inputStep(0)};
			${theme.center}
			width:100%;
			>p{
				${theme.font.interact}
				color:${theme.color.white};
				user-select:none;
			}
			&:hover{
				background-color:${theme.color.inputStep(-.5)};

			}
		}
	}
}`);

class EditBox extends CustomElm{
	constructor(){
		super();


		this.define(html`
			<div>
				<div class="people">
					<p>People</p>
					<div class="buttons">
						${new ButtonClickable("SORT NAME",()=>{
							peopleData.lock();
							peopleData.sort((a,b)=>a.text.data.localeCompare(b.text.data));
							peopleData.unlock();
						})}
						${new ButtonClickable("SORT ASKED",()=>{
							peopleData.lock();
							peopleData.sort((a,b)=>a.askCount.data-b.askCount.data);
							peopleData.unlock();
						})}
						${new ButtonClickable("SORT ANSWERED",()=>{
							peopleData.lock();
							peopleData.sort((a,b)=>a.answerCount.data-b.answerCount.data);
							peopleData.unlock();
						})}
					</div>
					${new PeopleEditList(peopleData)}
				</div>
				<div class="questions">
					<p>Questions</p>
					${new ButtonClickable("SORT",()=>{
						questionData.lock();
						questionData.sort((a,b)=>a.count.data-b.count.data);
						questionData.unlock();
					})}
					${new QuestionEditList(questionData)}
				</div>
			</div>
		`);
	}
}
defineElm(EditBox,scss`&{
	display:block;
	overflow:hidden;
	>div{
		${theme.centerX}
		align-items:stretch;
		flex-wrap:wrap;
		>div{
			min-width:400px;
			margin-bottom:60px;
			flex-grow:1;
			flex-basis:0;
			${theme.centerY}
			flex-direction:column;
			>p{
				${theme.centerText}
				${theme.font.title}
				border-bottom:4px solid ${theme.color.greyStep(1)};
				padding-bottom:10px;
				align-self:stretch;
				margin:0 40px;
			}
			padding:0 40px;
			>${QuestionEditList},>${PeopleEditList}{
				margin-top:30px;
				${theme.boxShadowStep(0)}
			}
			>${ButtonClickable}{
				margin-top:30px;
			}
			&.people >.buttons{
				${theme.centerX}
				margin-top:30px;
				>*:first-child{
					margin-right:20px;
				}
				>*:last-child{
					margin-left:20px;
				}
			}
		}
	}
}`);