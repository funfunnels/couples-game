const questions = [
    "איך אתה רואה את חיי המשפחה שלנו בעוד 5 שנים?",
    "מהו החלום הגדול ביותר שלך שהיית רוצה שנגשים יחד?",
    "מהם שלושת הערכים החשובים ביותר עבורך בזוגיות?",
    // ... הוסף את שאר השאלות כאן
];

let currentQuestionIndex = 0;
let shuffledQuestions = shuffleArray([...questions]);
let diceValue = null;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function rollDice() {
    const dice = document.getElementById('dice');
    const rollButton = document.getElementById('rollButton');
    const result = document.getElementById('result');

    dice.classList.add('rolling');
    rollButton.disabled = true;
    result.textContent = '';

    setTimeout(() => {
        diceValue = Math.floor(Math.random() * 6) + 1;
        dice.textContent = diceValue;
        dice.classList.remove('rolling');
        rollButton.disabled = false;
        result.textContent = getAnswerMethod();
    }, 1000);
}

function nextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        document.getElementById('question').textContent = shuffledQuestions[currentQuestionIndex];
        document.getElementById('dice').textContent = '?';
        document.getElementById('result').textContent = '';
        diceValue = null;
    } else {
        alert("המשחק הסתיים! תודה ששיחקתם.");
    }
}

function getAnswerMethod() {
    switch(diceValue) {
        case 1: return "ענו כרגיל";
        case 2: return "ענו מנקודת המבט של בן/בת הזוג";
        case 3: return "ענו בפנטומימה";
        case 4: return "ענו בציור";
        case 5: return "ענו בשיר או בחרוז";
        case 6: return "בחרו איך לענות";
        default: return "הטילו את הקובייה";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('question').textContent = shuffledQuestions[currentQuestionIndex];
    document.getElementById('rollButton').addEventListener('click', rollDice);
    document.getElementById('nextButton').addEventListener('click', nextQuestion);
});
