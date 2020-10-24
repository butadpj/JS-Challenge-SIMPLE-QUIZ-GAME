let quiz = [
    {
        question: 'A group of ________ is commonly called as one byte.',
        choices: ['8 bits', '6 bits', '4 bits', '16 bits'],
        answer: '8 bits',
        shown: false
    },

    {
        question: 'Which among the following controls all parts of the computer and known as the brain of computer?',
        choices: ['RAM', 'ROM', 'CPU', 'Processor'],
        answer: 'CPU',
        shown: false
    },

    {
        question: 'Which among the following is the earliest functioning base of the computer?',
        choices: ['Window', 'P1 processor', 'Vacuum tubes', 'Microprocessor'],
        answer: 'Vacuum tubes',
        shown: false
    },

    {
        question: 'Which among the following is a communication system that transfers data between components inside a computer?',
        choices: ['Bus', 'RAM', 'Processor', 'LAN'],
        answer: 'Bus',
        shown: false
    },

    {
        question: 'While sending an email, sometimes you also add multiple recipients in ‘CC;’ CC stands for?',
        choices: ['Carbon copy', 'Creative copy', 'Carbon common', 'Creative common'],
        answer: 'Carbon copy',
        shown: false
    },
]

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

shuffle(quiz);

let currentQuiz = 0
let letters = ['A', 'B', 'C', 'D']
let questionContainer = document.querySelector('.question')
let choicesContainer = document.querySelector('.choices').children
let card = document.querySelector('.card')
let cardScore = document.querySelector('.card .card-body .card-text')
let restartBtn = document.querySelector('.card .card-body .restart')

let getScore = document.querySelector('.score span')
let score = (Number(getScore.innerHTML))
let getTimer = document.querySelector('.timer span')
let timer = (Number(getTimer.innerHTML))


function resetTimer() {
    getTimer.innerHTML = 10
    timer = 10
    quiz[currentQuiz].shown = true
}

function startTimer() {
    timer = timer - 1
    getTimer.innerHTML = timer
    if (timer == 0) {
        timer = 10
        showQuiz() 
    }
}

setTimeout(function(){
    setInterval(startTimer, 1000)
}, 1000) 
    
function showQuiz() {
    if (currentQuiz == quiz.length) {
        card.style.opacity = '1'
        card.style.pointerEvents = 'all'
        cardScore.innerHTML = `Your score is ${score}/ ${quiz.length}`
    }
    questionContainer.innerHTML = quiz[currentQuiz].question
    for (let i = 0; i < choicesContainer.length; i++) {
        choicesContainer[i].style.backgroundColor = 'var(--b)'
        let content = `${letters[i]}.) ${quiz[currentQuiz].choices[i]}`
        choicesContainer[i].innerHTML = content
    }
}
showQuiz()

document.addEventListener('click', function(e){
    for (let i = 0; i < letters.length; i++) {
        if (e.target.classList.contains(letters[i])) {
            let selectedAnswer = e.target.innerHTML.substring(3).trim()
            let correctAnswer = quiz[currentQuiz].answer

            if (selectedAnswer == correctAnswer) {
                score = score + 1
                getScore.innerHTML = score
                choicesContainer[i].style.backgroundColor = 'var(--lg)'
                setTimeout(function(){
                    currentQuiz = currentQuiz + 1
                    showQuiz()
                    resetTimer()
                }, 500)
            } else {
                choicesContainer[i].style.backgroundColor = 'var(--r)'
                setTimeout(function(){
                    currentQuiz = currentQuiz + 1
                    showQuiz()
                    resetTimer()
                }, 500)
            }
        }
    }  
})

restartBtn.addEventListener('click', function(){
    location.reload()
})