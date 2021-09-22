//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
class task {
	constructor(id, todo, marked) {
		this.id = id;
		this.todo = todo;
		this.marked = marked;
	}
}
//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
//let tasks =[];
let counter = 0;
var taskList = [];
//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
	//------------------------------------------------------
	document.querySelector('#forma1').onsubmit = function() {

		const taskValue = document.getElementById('input-task').value;
		if(taskValue.length>0)	{
			counter++;


			Generuj2(counter,taskValue,false,true);
			//Generuj();


		}

		else{
			alert("have to input something.");
		}


		return false;
	};
	//------------------------------------------------------

	//document.getElementById('checkbox1').addEventListener("click",function(){linijka(1);} );
	//document.getElementById('checkbox2').addEventListener("click",function(){linijka(2);} );
	//document.getElementById('checkbox3').addEventListener("click",function(){linijka(3);} );
	//------------------------------------------------------


	taskList = JSON.parse(localStorage.getItem("tasks")) || [];
	console.log("taskList="+taskList);
	var max = 0;

	for(let x in taskList){
		let taskID = taskList[x].id;
		let todo = taskList[x].todo;
		let marked = taskList[x].marked;
		let czyNowy = false;
		Generuj2(taskID,todo,marked,czyNowy);
		console.log("x="+x);
		console.log(x.todo);
		if(max < taskID) max= taskID;

	}


	counter = max;


});
//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
function Generuj(){

	var taskValue = document.getElementById('input-task').value;

	//*********************
	const el1 = document.createElement('li');
	//var el1 = document.createElement('p');
	el1.className = "list-group-item";
	//el1.innerHTML="kuku";
	el1.id = "task"+counter;
	const taskID = "task"+counter;;

	const el2 = document.createElement('div');
	el2.className = "d-flex justify-content-between";
	const el3 = document.createElement('div');
	el3.className = "";
	const el31 = document.createElement('input');
	el31.className = "form-check-input me-1";
	el31.setAttribute("type","checkbox");
	el31.setAttribute("value","");
	el31.setAttribute("aria-label","...");
	el31.id = "checkbox"+counter;

	const el32 = document.createElement('span');
	el32.className = "task";
	el32.id="taskspan"+counter;
	el32.innerHTML = taskValue;
	//el32.setAttribute = ("text-decoration","line-through;");


	const el4 = document.createElement('div');
	el4.className = "";
	const el41 = document.createElement('button');
	el41.className = "delete-btn";
	el41.id = "delete"+counter;
	el41.setAttribute("aria-label","Close");

	el41.addEventListener("click",function () {
		var elem = document.getElementById(taskID);
		elem.parentNode.removeChild(elem);

	});


	const el411 = document.createElement('span');
	el411.setAttribute = ("aria-hidden","true");
	el411.innerHTML = "&times;";


	el41.appendChild(el411);
	el4.appendChild(el41);

	el3.appendChild(el31);
	el3.appendChild(el32);
	el2.appendChild(el3);
	el2.appendChild(el4);
	el1.appendChild(el2);
	const el = document.getElementById('task-list');
	el.appendChild(el1);
	//*********************
	//alert("baton kliked, task = " + taskValue);
	document.getElementById('input-task').value ="";
	let a = counter;
	el31.addEventListener("click",function(){linijka(a);} );



}
//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
function linijka(a) {


	let cos = document.getElementById("checkbox"+a);
	console.log("checkbox"+a+" checked="+cos.checked+"=");
	//alert(cos.checked);
	let warunek = JSON.stringify(cos.checked);
	let cos2 = document.getElementById("taskspan"+a);

	if(warunek == "true"){

		//cos2.setAttribute = ("text-decoration","");
		//cos2.setAttribute = ("text-decoration","line-through;");
		cos2.style.textDecoration = "line-through";
		cos2.className="task finished";
		//text-decoration: line-through;
		console.log("tak "+cos2.innerHTML);

		let taskList2 = JSON.parse(localStorage.getItem("tasks")) || [];

		for(let x in taskList2){
			let taskID = taskList2[x].id;
			if(taskID == a){
				console.log("znaleziono ");
				taskList2[x].marked = true;
				localStorage.setItem('tasks', JSON.stringify(taskList2));
			}


		}

		taskList = JSON.parse(localStorage.getItem("tasks"));
		console.log(taskList);

	}
	else{
		//cos2.setAttribute = ("text-decoration","line-through;");
		cos2.style.textDecoration = "";
		cos2.className="task";
		console.log("nies");

		let taskList2 = JSON.parse(localStorage.getItem("tasks")) || [];

		for(let x in taskList2){
			let taskID = taskList2[x].id;
			if(taskID == a){
				taskList2[x].marked = false;
				localStorage.setItem('tasks', JSON.stringify(taskList2));
			}


		}

	}


}
//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
function Generuj2(taskID,todo,marked, czyNowy){

	var taskValue = document.getElementById('input-task').value;

	//*********************
	const el1 = document.createElement('li');
	//var el1 = document.createElement('p');
	el1.className = "list-group-item";
	//el1.innerHTML="kuku";
	el1.id = "task"+taskID;
	const taskIDa = "task"+taskID;;

	const el2 = document.createElement('div');
	el2.className = "d-flex justify-content-between";
	const el3 = document.createElement('div');
	el3.className = "";
	const el31 = document.createElement('input');
	el31.className = "form-check-input me-1";
	el31.setAttribute("type","checkbox");
	el31.setAttribute("value","");
	el31.setAttribute("aria-label","...");
	el31.id = "checkbox"+taskID;
	if(marked) el31.checked = true;

	const el32 = document.createElement('span');

	el32.id="taskspan"+taskID;
	el32.innerHTML = todo;
	if(marked){
		el32.className="task finished";
	}
	else{
		el32.className = "task";
	}

	//el32.setAttribute = ("text-decoration","line-through;");


	const el4 = document.createElement('div');
	el4.className = "";
	const el41 = document.createElement('button');
	el41.className = "delete-btn";
	el41.id = "delete"+taskID;
	el41.setAttribute("aria-label","Close");

	el41.addEventListener("click",function () {
		var elem = document.getElementById(taskIDa);
		elem.parentNode.removeChild(elem);

		let taskList2 = JSON.parse(localStorage.getItem("tasks")) || [];

		taskList2 = taskList2.filter(item => item.id !== taskID);
		localStorage.setItem('tasks', JSON.stringify(taskList2));






	});


	const el411 = document.createElement('span');
	el411.setAttribute = ("aria-hidden","true");
	el411.innerHTML = "&times;";


	el41.appendChild(el411);
	el4.appendChild(el41);

	el3.appendChild(el31);
	el3.appendChild(el32);
	el2.appendChild(el3);
	el2.appendChild(el4);
	el1.appendChild(el2);
	const el = document.getElementById('task-list');
	el.appendChild(el1);
	//*********************
	//alert("baton kliked, task = " + taskValue);
	document.getElementById('input-task').value ="";
	let a = taskID;
	el31.addEventListener("click",function(){linijka(a);} );

	//https://stackoverflow.com/questions/40985620/updating-localstorage-arrays-in-javascript

	if(czyNowy){
		let taskList2 = JSON.parse(localStorage.getItem("tasks")) || [];
		taskList2.push(new task(taskID,todo,marked));
		localStorage.setItem('tasks', JSON.stringify(taskList2));
		console.log("nowy");
	}


	taskList = JSON.parse(localStorage.getItem("tasks"));
	console.log(taskList);

}

