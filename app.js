const columns = [
"REV1",
"REV2",
"REV3",
"REV4",
"DPP1",
"DPP2",
"PYQ1",
"PYQ2",
"MOCK1",
"MOCK2"
];

const subjects = {
"Computer Networks":[
"IPv4 Addressing",
"Error Control",
"Flow Control",
"IPv4 Header & Fragmentation",
"TCP & UDP",
"Medium Access Control",
"Routing Protocols",
"Switching",
"Application Protocol",
"IP Support Protocol"
],

"Operating Systems":[
"Process Management",
"CPU Scheduling",
"Synchronization",
"Deadlock",
"Memory Management",
"File System & Device Management",
"SYStem Calls & Threads"
],

"C Programming":[
"Data Types & Operators",
"Control Flow Statements",
"Functions & Storage Classes",
"Arrays & Pointers",
"Strings",
"Structures & Union",
"Miscellaneous"
],

"Data Structures":[
"Introduction",
"Arrays",
"Linked List",
"Stack & Queues",
"Trees",
"Graphs",
"Hashing"
],
"Digital Logic":[
"Logic Gates",
"Minimization",
"Combinational Circuit",

"Sequential Circuit",
"Number System"

],
"Theory Of Computation":[
"Finite Automata",
"Push Down Automata",
"Turing Machine Recursively Enumerable",
"Decidability"
],
"Compiler Design":[
"Lexical & Syntax Analysis",
"Syntax Directed Translation",
"Intermediate Code & Code Optimization"
],

"DBMS":[
"FDs & Normalisation",
"Transaction And Concurrency Control",
"ER Model",
"Query Language",
"File Organisation & Indexing"
],

"Algorithms":[
"Analysis Of Algorithms",
"Design Strategies",
"Greedy Method",
"Dynamic Programming",
"Graph Algorithms",
"Heap Algorithms",
"Backtracking & Branch Bound"
],

"Computer Organisation & Architecture":[
"Introduction Of COA",
"Machine Instruction And Addressing Modes",
"Floating Point Representation",
"ALU And Control Unit",
"Instruction And Pipelining",
"Cache Memory",
"Secondary Memory & IO Interface"
],
"Discrete Mathematics":[
"Graph Theory",
"Mathematical Logic",
"Set Theory",
"Combinatorics"
],

};

function createTracker(){

let container =
document.getElementById("tracker");

for(let subject in subjects){

let html = `
<div class="subject">

<div class="subjectTitle">
${subject}
</div>

<table>

<tr>
<th>Chapter</th>
${columns.map(x=>`<th>${x}</th>`).join("")}
</tr>
`;

subjects[subject].forEach(ch=>{

html += `<tr>
<td class="chapter">${ch}</td>`;

columns.forEach(c=>{

const key = subject+"_"+ch+"_"+c;

html += `
<td>
<input
type="checkbox"
data-key="${key}"
class="task">
</td>`;
});

html += "</tr>";
});

html += "</table></div>";

container.innerHTML += html;
}

loadData();

document
.querySelectorAll(".task")
.forEach(box=>{

box.addEventListener("change",()=>{

localStorage.setItem(
box.dataset.key,
box.checked
);

updateStats();

});

});

updateStats();
}

function loadData(){

document
.querySelectorAll(".task")
.forEach(box=>{

if(
localStorage.getItem(
box.dataset.key
)==="true"
){
box.checked=true;
}

});
}

function updateStats(){

let total =
document.querySelectorAll(".task").length;

let completed =
document.querySelectorAll(".task:checked")
.length;

let percent =
Math.round(
(completed/total)*100
);

document.getElementById(
"progressPercent"
).innerText=percent+"%";

document.getElementById(
"completedCount"
).innerText=completed;

document.getElementById(
"readiness"
).innerText=percent+"%";

updateCharts(
completed,
total-completed
);
}

let pieChart;

function updateCharts(done,pending){

if(pieChart){
pieChart.destroy();
}

pieChart =
new Chart(
document.getElementById("overallChart"),
{
type:"doughnut",
data:{
labels:[
"Completed",
"Pending"
],
datasets:[{
data:[
done,
pending
]
}]
}
});
}

function saveDate(){

let date =
document.getElementById(
"examDate"
).value;

localStorage.setItem(
"gateExamDate",
date
);

updateCountdown();
}

function updateCountdown(){

let target =
localStorage.getItem(
"gateExamDate"
);

if(!target) return;

let diff =
new Date(target)
- new Date();

let days =
Math.floor(diff/
(1000*60*60*24));

document.getElementById(
"countdown"
).innerText =
days+" Days Remaining";
}

function exportData(){

const data={};

for(let i=0;
i<localStorage.length;
i++){

let k=localStorage.key(i);

data[k]=
localStorage.getItem(k);
}

const blob =
new Blob(
[
JSON.stringify(
data,
null,
2)
],
{
type:"application/json"
}
);

const a =
document.createElement("a");

a.href=
URL.createObjectURL(blob);

a.download=
"gate-backup.json";

a.click();
}

function importData(event){

const file =
event.target.files[0];

const reader =
new FileReader();

reader.onload=e=>{

const data =
JSON.parse(
e.target.result
);

Object.keys(data)
.forEach(k=>{

localStorage.setItem(
k,
data[k]
);

});

location.reload();
};

reader.readAsText(file);
}

document
.getElementById("themeBtn")
.addEventListener(
"click",
()=>{
document.body
.classList.toggle(
"dark"
);
}
);

createTracker();
updateCountdown();