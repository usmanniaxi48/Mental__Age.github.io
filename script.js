// Mental Age Checker Quiz Script

const questions = [
    {
        question: "When faced with a difficult problem, you usually:",
        options: [
            { text: "Panic and avoid it", score: 1 },
            { text: "Ask for help immediately", score: 2 },
            { text: "Analyze and try different solutions", score: 3 },
            { text: "Stay calm and solve it confidently", score: 4 }
        ]
    },
    {
        question: "How do you prefer to spend your free time?",
        options: [
            { text: "Playing games or having fun", score: 1 },
            { text: "Socializing with friends", score: 2 },
            { text: "Reading or learning something new", score: 3 },
            { text: "Reflecting or planning for the future", score: 4 }
        ]
    },
    {
        question: "Your reaction to unexpected changes is:",
        options: [
            { text: "Get stressed and upset", score: 1 },
            { text: "Feel uneasy but adapt slowly", score: 2 },
            { text: "Accept and adjust quickly", score: 3 },
            { text: "Embrace and find opportunities", score: 4 }
        ]
    },
    {
        question: "How do you handle criticism?",
        options: [
            { text: "Take it personally and get defensive", score: 1 },
            { text: "Feel bad but try to improve", score: 2 },
            { text: "Listen carefully and learn", score: 3 },
            { text: "Welcome it as a chance to grow", score: 4 }
        ]
    },
    {
        question: "When making decisions, you tend to:",
        options: [
            { text: "Act impulsively", score: 1 },
            { text: "Seek advice from others", score: 2 },
            { text: "Weigh pros and cons carefully", score: 3 },
            { text: "Make thoughtful and confident choices", score: 4 }
        ]
    },
    {
        question: "How do you approach new experiences?",
        options: [
            { text: "Avoid them", score: 1 },
            { text: "Feel nervous but try", score: 2 },
            { text: "Excited and curious", score: 3 },
            { text: "Eager and proactive", score: 4 }
        ]
    },
    {
        question: "Your friends would describe you as:",
        options: [
            { text: "Playful and carefree", score: 1 },
            { text: "Friendly and supportive", score: 2 },
            { text: "Responsible and reliable", score: 3 },
            { text: "Wise and mature", score: 4 }
        ]
    },
    {
        question: "How do you manage stress?",
        options: [
            { text: "Ignore it and hope it goes away", score: 1 },
            { text: "Talk to someone about it", score: 2 },
            { text: "Use healthy coping strategies", score: 3 },
            { text: "Stay calm and solve the root cause", score: 4 }
        ]
    },
    {
        question: "When working in a team, you:",
        options: [
            { text: "Avoid responsibility", score: 1 },
            { text: "Do your part but stay quiet", score: 2 },
            { text: "Contribute ideas and help others", score: 3 },
            { text: "Lead and motivate the team", score: 4 }
        ]
    },
    {
        question: "Your attitude towards learning is:",
        options: [
            { text: "I don’t like learning new things", score: 1 },
            { text: "I learn when I have to", score: 2 },
            { text: "I enjoy learning new skills", score: 3 },
            { text: "I actively seek knowledge", score: 4 }
        ]
    }
];

let currentQuestionIndex = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultsContainer = document.getElementById('results-container');
const quizContainer = document.getElementById('quiz-container');
const mentalAgeEl = document.getElementById('mental-age');
const descriptionEl = document.getElementById('description');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion(index) {
    const q = questions[index];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';

    q.options.forEach((option, i) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = option.text;
        optionDiv.addEventListener('click', () => {
            selectOption(i);
        });
        if (selectedAnswers[index] === i) {
            optionDiv.classList.add('selected');
        }
        optionsEl.appendChild(optionDiv);
    });

    prevBtn.disabled = index === 0;
    nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
}

function selectOption(optionIndex) {
    selectedAnswers[currentQuestionIndex] = optionIndex;
    updateOptionsUI();
}

function updateOptionsUI() {
    const optionDivs = optionsEl.querySelectorAll('.option');
    optionDivs.forEach((div, i) => {
        div.classList.toggle('selected', selectedAnswers[currentQuestionIndex] === i);
    });
}

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (selectedAnswers[currentQuestionIndex] === null) {
        alert('Please select an option before proceeding.');
        return;
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

submitBtn.addEventListener('click', () => {
    if (selectedAnswers[currentQuestionIndex] === null) {
        alert('Please select an option before submitting.');
        return;
    }
    showResults();
});

restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    selectedAnswers.fill(null);
    resultsContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion(currentQuestionIndex);
});

function showResults() {
    let totalScore = 0;
    for (let i = 0; i < selectedAnswers.length; i++) {
        const answerIndex = selectedAnswers[i];
        if (answerIndex !== null) {
            totalScore += questions[i].options[answerIndex].score;
        }
    }

    const maxScore = questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    let mentalAge = '';
    let description = '';
    let bgColor = '';

    if (percentage <= 30) {
        mentalAge = 'Youthful & Playful';
        description = 'You have a fun-loving and carefree spirit, enjoying life with a youthful mindset.';
        bgColor = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    } else if (percentage <= 60) {
        mentalAge = 'Balanced Adult';
        description = 'You have a well-rounded and balanced approach to life, combining fun and responsibility.';
        bgColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else {
        mentalAge = 'Mature & Wise';
        description = 'You possess wisdom and maturity, handling life with confidence and insight.';
        bgColor = 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)';
    }

    mentalAgeEl.textContent = mentalAge;
    descriptionEl.textContent = description;
    resultsContainer.querySelector('.result-card').style.background = bgColor;

    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
}

// Initialize quiz
loadQuestion(currentQuestionIndex);
