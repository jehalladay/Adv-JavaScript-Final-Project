const options=document.querySelector(".options").children;
const questionNumberSpan=document.querySelector(".question-num-value");
const totalQuestionSpan=document.querySelector(".total-question");
const question=document.querySelector(".question");
const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
const op4=document.querySelector(".option4");

let questionIndex;
let index=0;
let myArray=[];
let score=0;
const correctAnswerSpan=document.querySelector(".correct_answer")
const totalQuestionSpan2=document.querySelector(".total-question2")


const questions=[
{
    q:' ______ JavaScript is also called client-side JavaScript.',
    options:['microsoft','navigator','livewire','native'],
    answer:1
},
{
    q:'HTML stands for?',
    options:['Hpertext Markup Language','hypertension mode language','Hi There Man','None of the above'],
    answer:0
},
{

    q:'CSS is used for?',
    options:['fashioning','cutting','scripting','styling'],
    answer:3
},
{

    q:'javascrip is another name for java',
    options:['true','false',' both','None of the above'],
    answer:1
},
{

    q:'What is the correct JavaScript syntax to print "Hello World"?',
    options:['console.log("Hello World")','print("Hellow World")','cout<<"Hellow World','None of the above'],
    answer:0
}


]
totalQuestionSpan.innerHTML=questions.length;
function load(){
    
    questionNumberSpan.innerHTML=index+1;
    question.innerHTML=questions[questionIndex].q;
    op1.innerHTML=questions[questionIndex].options[0];
    op2.innerHTML=questions[questionIndex].options[1];
    op3.innerHTML=questions[questionIndex].options[2];
    op4.innerHTML=questions[questionIndex].options[3];
    index++
}
function disabledOptions()
{
    for(var i=0;i<options.length;i++){
        options[i].classList.add("disabled");
        if(options[i].id==questions[questionIndex].answer){
            options[i].classList.add("correct");
        }
    }
}
function enabledOptions(){
    for(var i=0;i<options.length;i++){
        options[i].classList.remove("disabled","correct","wrong")
    }
}
function check(element)
{
    if(element.id==questions[questionIndex].answer){
        element.classList.add("correct")
        score++;
    }
    else{
        element.classList.add("wrong");
    }
    disabledOptions()
}

function randomQuestion()
{
    let randomNumber=Math.floor(Math.random()*questions.length);
    var duplicates=0;
    if(index==questions.length){
        quizover()
    }
    else{
        if(myArray.length>0){
            for(var i=0;i<myArray.length;i++)
            {
             if(myArray[i]==randomNumber)
             {
                 duplicates=1;
                 break;
             }
            }
            if(duplicates==1){randomQuestion()}
            else{
                questionIndex=randomNumber;
                load();
            }
        }if(myArray.length==0){
            questionIndex=randomNumber;
            this.load();
        }
      
    }
    //questionIndex=randomNumber;
    //console.log(questionIndex);
    
}
window.onload=function(){
    this.randomQuestion()
}
function next(){
    if(!options[0].classList.contains("disabled")){
        alert("select one option before moving to next")
    }
    else{
        enabledOptions()
        randomQuestion();
    }
}

function quizover()
{
    
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
}
function tryagain()
{
    window.location.reload()
}
function submit(){

}