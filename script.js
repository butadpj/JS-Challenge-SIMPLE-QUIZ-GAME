const loader = document.querySelector('.loader-main')
window.addEventListener('load', function(){
    const countDown = document.querySelector('.countdown-main')
    const countDownTimer = document.querySelector('.countdown p')

    loader.classList.add('hide')
    countDown.classList.remove('hide')

    let cdTimer = 3
    
    let cdTimerInterval = setInterval(startCdTimer, 1000)

    function startCdTimer() {
        cdTimer = cdTimer - 1
        countDownTimer.innerHTML = cdTimer

        if (cdTimer < 0) {
            countDownTimer.innerHTML = 'G!'
            clearInterval(cdTimerInterval)
            countDown.classList.add('hide')

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
            
            //Shuffles an array
            function shuffle(array) {
                let lastIndex = array.length - 1 
                let holder
                let randomIndex
            
                //Loop through the array starting from last
                for (lastIndex; lastIndex >= 0; lastIndex--) {
        
                    randomIndex = Math.floor(Math.random() * array.length)
        
                    holder = array[lastIndex]
                    array[lastIndex] = array[randomIndex]
                    array[randomIndex] = holder
                }
        
                return array
            }
            shuffle(quiz)
            
            let currentQuiz = 0
            let letters = ['A', 'B', 'C', 'D']
            const questionContainer = document.querySelector('.question')
            const choicesContainer = document.querySelector('.choices').children
            const card = document.querySelector('.card')
            const cardScore = document.querySelector('.card .card-body .card-text')
            const restartBtn = document.querySelector('.card .card-body .restart')
            
            const getScore = document.querySelector('.score span')
            let score = 0
            const getTimer = document.querySelector('.timer span')
            let timer = 10
            
            
            function resetTimer() {
                getTimer.innerHTML = 10
                timer = 10
                if (currentQuiz == quiz.length) {
                    return
                }
                quiz[currentQuiz].shown = true
            }
            
            function startTimer() {
                timer = timer - 1
                getTimer.innerHTML = timer
                if (timer == 0) {
                    timer = 10
                    currentQuiz = currentQuiz + 1
                    showQuiz() 
                }
            }
            
            let timerInterval = setInterval(startTimer, 1000)

            function showQuiz() {
                if (currentQuiz == quiz.length) {
                    card.classList.remove('hide')
                    cardScore.innerHTML = `Your score is ${score}/ ${quiz.length}`
                    clearInterval(timerInterval)
                    return
                }
                questionContainer.innerHTML = quiz[currentQuiz].question
                for (let i = 0; i < choicesContainer.length; i++) {
                    choicesContainer[i].style.backgroundColor = 'var(--b)'
                    let content = `${letters[i]}.) ${quiz[currentQuiz].choices[i]}`
                    choicesContainer[i].innerHTML = content
                }
            }
            showQuiz()
            
            document.addEventListener('click', function(e) {
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
            
            document.addEventListener('mouseover', function(e) {
                for (let i = 0; i < letters.length; i++) {
                    if (e.target.classList.contains(letters[i])) {
                        e.target.style.backgroundColor = 'var(--hover)'
                    }
                }  
            })

            document.addEventListener('mouseout', function(e) {
                for (let i = 0; i < letters.length; i++) {
                    if (e.target.classList.contains(letters[i])) {
                        e.target.style.backgroundColor = 'var(--b)'
                    }
                }  
            })
            
            restartBtn.addEventListener('click', function(){
                location.reload()
            })

        }
    }
})

