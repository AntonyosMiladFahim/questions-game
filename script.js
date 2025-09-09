// Array of 20 questions
var questions = [
  "What is HTML?",
  "What is CSS?",
  "What is JavaScript?",
  "Which HTML tag is used for the largest heading?",
  "Which property is used to change text color in CSS?",
  "Which company developed JavaScript?",
  "Which tag is used to create a hyperlink in HTML?",
  "Which CSS property controls the font size?",
  "Inside which HTML element do we put JavaScript?",
  "Which symbol is used for single-line comments in JS?",
  "Which attribute is used in <img> tag to specify the source?",
  "Which CSS property is used to set the background color?",
  "What does DOM stand for?",
  "Which HTML tag is used to display a table row?",
  "Which method is used to print something in the browser console?",
  "What is the default display value of a <div> element?",
  "Which keyword is used to declare a variable in JS (ES6)?",
  "Which CSS unit is relative to the root element font-size?",
  "Which method removes the last element from an array in JS?",
  "Which HTML attribute specifies an inline CSS style?"
];

// Array of answers (each sub-array has 4 options and the fifth element is the answer)
var answers = [
  ["Hyper Text Markup Language", "Hyper Text Markdown Language", "Hyper Tool Markup Language", "HighText Machine Language", "Hyper Text Markup Language"],
  ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheet", "Cascading Style Sheets"],
  ["JavaScript", "Java", "JQuery", "JSON", "JavaScript"],
  ["h6", "heading", "h1", "head", "h1"],
  ["text-style", "color", "font-color", "text-color", "color"],
  ["Netscape", "Microsoft", "Oracle", "Google", "Netscape"],
  ["link", "a", "href", "hyperlink", "a"],
  ["font-size", "text-size", "font", "size", "font-size"],
  ["scripting", "script", "javascript", "js", "script"],
  ["//", "/* */", "#", "!-- --", "//"],
  ["src", "href", "link", "alt", "src"],
  ["background", "bgcolor", "background-color", "color", "background-color"],
  ["Document Object Model", "Data Object Method", "Desktop Oriented Mode", "Document Order Map", "Document Object Model"],
  ["td", "th", "tr", "row", "tr"],
  ["console.log()", "print()", "document.write()", "log.print()", "console.log()"],
  ["block", "inline", "flex", "inline-block", "block"],
  ["var", "let", "const", "int", "let"],  
  ["em", "px", "rem", "%", "rem"],
  ["pop()", "push()", "shift()", "remove()", "pop()"],
  ["class", "style", "css", "design", "style"]
];

// class question

class Question{
    constructor(qid,qtitle,qop1,qop2,qop3,qop4,qans){
        this.qid=qid;
        this.qtitle=qtitle;
        this.qop1=qop1;
        this.qop2=qop2;
        this.qop3=qop3;
        this.qop4=qop4;
        this.qans=qans;
        
    }
}

// getting 3 random numbers from 0 to 19

var index1=Math.floor(Math.random()*questions.length);
var index2=Math.floor(Math.random()*questions.length);
var index3=Math.floor(Math.random()*questions.length);

// make sure the numbers are different

while(index1==index2 || index2==index3) index2=Math.floor(Math.random()*questions.length);
while(index1==index3 || index1==index2) index1=Math.floor(Math.random()*questions.length);
var q1=new Question("q1",questions[index1],answers[index1][0],answers[index1][1],answers[index1][2],answers[index1][3],answers[index1][4]);
var q2=new Question("q2",questions[index2],answers[index2][0],answers[index2][1],answers[index2][2],answers[index2][3],answers[index2][4]);
var q3=new Question("q3",questions[index3],answers[index3][0],answers[index3][1],answers[index3][2],answers[index3][3],answers[index3][4]);

var questionsdiv=document.getElementById("questions");

var questionsarr=[q1,q2,q3];

// add questions and answers tags to html

var questionshtml="";
for(quest of questionsarr)
{
    questionsdiv.innerHTML+=`
        <div class="question">
            <h3>${quest.qid} :  ${quest.qtitle}</h3>
            <input type="radio" name="${quest.qid}" value="${quest.qop1}"> ${quest.qop1}
            <input type="radio" name="${quest.qid}" value="${quest.qop2}"> ${quest.qop2}
            <input type="radio" name="${quest.qid}" value="${quest.qop3}"> ${quest.qop3}
            <input type="radio" name="${quest.qid}" value="${quest.qop4}"> ${quest.qop4}
        </div>
    `;
}

// calculate result if submit
document.forms["form1"].addEventListener("submit",function(event){
    event.preventDefault();
    calulateresult();
});

    
function calulateresult()
{
    var score=0;
    for(quest of questionsarr)
    {
        if(!document.querySelector(`input[name=${quest.qid}]:checked`))continue;
        var userans=document.querySelector(`input[name=${quest.qid}]:checked`).value;
        if(userans==quest.qans)
        {
            score++;
        }
    }
    document.forms["form1"].reset();
    document.getElementById("timerdiv").remove();
    document.body.removeChild(document.forms["form1"]);
    var result=document.getElementById("result");
    result.classList.add("result");
    if(score>=questionsarr.length/2)
    {
        result.innerHTML=`Congratulation , You scored ${score} out of ${questionsarr.length} questions`;
        result.style.color="green";
    }
    else
    {
        result.innerHTML=`Try Again , You scored ${score} out of ${questionsarr.length} questions`;
        result.style.color="red";
    }
}

console.log(index1);
console.log(index2);
console.log(index3);



// timer 


if(document.getElementById('timer')){
    document.getElementById('timer').innerHTML =1 + ":" + 0o1;
    startTimer();
}


function startTimer() {
    if(document.getElementById('timer')){
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSecond((timeArray[1] - 1));
        if(s==59){m=m-1}
        if(m<0){
            return
        }
        if(document.getElementById('timer')){
            document.getElementById('timer').innerHTML =
                m + ":" + s;
            console.log(m)
            setTimeout(startTimer, 1000);
        }

  
    }

}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  if((timeArray[1] - 1)==0 &&  timeArray[0]==0)calulateresult();
  return sec;
}
