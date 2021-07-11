const startBtn = document.getElementById("startBtn");
const quizBody = document.getElementById("container");
const exit = document.getElementById("exit");
const start = document.getElementById("continue");
const quizSection = document.querySelector(".quizGame");
const optionList = document.querySelector(".optionList");
const timeCount = document.querySelector(".timer .timeSecs");
const timeLine = document.querySelector("header .timeLine");
const timesUp = document.querySelector(".timer .timeText");

//start quiz
startBtn.addEventListener("click",()=>{
    quizBody.classList.add('activation');
})

//exit quiz
exit.addEventListener("click", () => {
    quizBody.classList.remove('activation');
})

//continue game
start.onclick= ()=>{
    quizBody.classList.remove('activation');
    quizSection.classList.add('activateQuiz')
    showQuestion(0)
    counterBtn(1);
    startTimer(10);
    startTimeLine(0);
}

let count = 0;
let quesNum = 1;
let counter, counterLine;
let timeVal = 10;
let withVal = 0;
let userCount = 0;

const nextBtn = document.querySelector(".btnNext");
const result = document.querySelector(".result");
const restartQuiz = document.getElementById("reset");
const exitQuiz = document.getElementById("quit");

restartQuiz.addEventListener("click", () => {
    quizSection.classList.add("activateQuiz");
    result.classList.remove("activateResult");
    let count = 0;
    let quesNum = 1;
    let counter, counterLine;
    let timeVal = 10;
    let withVal = 0;
    let userCount = 0;
    showQuestion(count);
    counterBtn(quesNum);
    clearInterval(counter);
    startTimer(timeVal);
    startTimeLine(0);
    clearInterval(counterLine);
    startTimeLine(withVal);
    nextBtn.style.display = "none";
    timesUp.textContent = "Times left"
})

exitQuiz.addEventListener("click",()=>{
    window.location.reload();
})

nextBtn.addEventListener("click",()=>{
    if(count < questions.length -1){
        count++;
        quesNum++;
        showQuestion(count);
        counterBtn(quesNum);
        clearInterval(counter);
        startTimer(timeVal);
        clearInterval(counterLine);
        startTimeLine(withVal);
        nextBtn.style.display = "none";
        timesUp.textContent = "Times left"
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
        console.log("Questions Covered");
    }
    
})
//render the questionList form another file and modify it
function showQuestion(index){
    const quesText = document.querySelector(".quizText");
    let quizTag = `<span>${questions[index].num}. ${questions[index].question}</span>`;
    quesText.innerHTML= quizTag;

    let optionTag = `<div class="option"><span>${questions[index].option[0]}</span></div>
                    <div class="option"><span>${questions[index].option[1]}</span></div>
                    <div class="option"><span>${questions[index].option[2]}</span></div>
                    <div class="option"><span>${questions[index].option[3]}</span></div>`
    optionList.innerHTML = optionTag;

    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

//next quizes
function counterBtn(index) {
    const countBtn = document.querySelector(".totalQuestions");
    let totalQuestionTag = `<span><p>${index}</p>/<p>${questions.length}</p></span>`;
    countBtn.innerHTML = totalQuestionTag;
}

let tickIcon = `<div class="icons tick"><i class="fa fa-check" aria-hidden="true"></i></div>`;
let crossIcon = `<div class="icons cross"><i class="fa fa-times" aria-hidden="true"></i></div>`;

//select correct and incorrect options
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let usrAns = answer.textContent;
    let corrAns = questions[count].answer;
    let allOptions = optionList.children.length;
    
    if(usrAns === corrAns){
        userCount += 2;
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend',tickIcon);
    }else{
        answer.classList.add('wrong');
        answer.insertAdjacentHTML('beforeend', crossIcon);

        //if answer is incorrect then automacially select correct option
        for (let i = 0; i < allOptions; i++) {
            if(optionList.children[i].textContent == corrAns){
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
            }
        }
    }
    //to not select other options
    for(let i=0;i<allOptions; i++){
        optionList.children[i].classList.add('disable')
    }
    nextBtn.style.display = "block";
}

function showResult(){
    quizBody.classList.remove('activation');
    quizSection.classList.remove('activateQuiz')
    result.classList.add('activateResult')  //show result

    const scoreText = result.querySelector(".scores");
    if(userCount > 7){
        let scoeTag = `<span>Congrats!, You got <p>${userCount}</p> out of <p>${(questions.length) * 2}</p> points</span>`
        scoreText.innerHTML=scoeTag;
    }
    else if (userCount > 4) {
        let scoeTag = `<span>Nice, You got <p>${userCount}</p> out of <p>${(questions.length) * 2}</p> points</span>`
        scoreText.innerHTML = scoeTag;
    }
    else{
        let scoeTag = `<span>Sorry! You got <p>${userCount}</p> out of <p>${(questions.length) * 2}</p> points</span>`
        scoreText.innerHTML = scoeTag;
    }
}

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){
            let addZero = timeCount.textContent;
            timeCount.textContent = `0${addZero}`
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = '00';
            timesUp.textContent="Times Up"

            let corrAns = questions[count].answer;
            let allOptions = optionList.children.length;
            
            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == corrAns) {
                    optionList.children[i].setAttribute("class", "option correct");
                    optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
                }
            }

            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add('disable')
            }
            nextBtn.style.display = "block";
        }
    }
}

//progress bar
function startTimeLine(time) {
    counterLine = setInterval(timer, 20);

    function timer() {
        time+=1;
        timeLine.style.width = time+"px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}