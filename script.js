const questions = [
  "איך אתה רואה את חיי המשפחה שלנו בעוד 5 שנים?",
  "מהו החלום הגדול ביותר שלך שהיית רוצה שנגשים יחד?",
  "מהם שלושת הערכים החשובים ביותר עבורך בזוגיות?",
  // ... הוסף את שאר השאלות כאן
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Dice = ({ rolling, value }) => {
  return (
    <div className={`dice ${rolling ? 'rolling' : ''}`}>
      {value}
    </div>
  );
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [shuffledQuestions, setShuffledQuestions] = React.useState(shuffleArray([...questions]));
  const [diceValue, setDiceValue] = React.useState(null);
  const [rolling, setRolling] = React.useState(false);

  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newValue);
      setRolling(false);
    }, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setDiceValue(null);
    } else {
      alert("המשחק הסתיים! תודה ששיחקתם.");
    }
  };

  const getAnswerMethod = () => {
    switch(diceValue) {
      case 1: return "ענו כרגיל";
      case 2: return "ענו מנקודת המבט של בן/בת הזוג";
      case 3: return "ענו בפנטומימה";
      case 4: return "ענו בציור";
      case 5: return "ענו בשיר או בחרוז";
      case 6: return "בחרו איך לענות";
      default: return "הטילו את הקובייה";
    }
  };

  const shareGame = () => {
    if (navigator.share) {
      navigator.share({
        title: 'משחק זוגי',
        text: 'בואו לשחק במשחק זוגי מהנה!',
        url: window.location.href
      }).then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('שיתוף לא נתמך בדפדפן זה');
    }
  };

  return (
    <div className="app">
      <div className="image-placeholder">
        <img src="https://via.placeholder.com/150" alt="תמונה זוגית" className="couple-image" />
      </div>
      <div className="progress-bar">
        <div className="progress" style={{width: `${progress}%`}}></div>
      </div>
      <h1 className="question">{shuffledQuestions[currentQuestionIndex]}</h1>
      <Dice rolling={rolling} value={diceValue || '?'} />
      <button className="button" onClick={rollDice} disabled={rolling}>
        {rolling ? 'מגלגל...' : 'גלגל קובייה'}
      </button>
      {!rolling && diceValue && (
        <p className="result">
          {getAnswerMethod()}
        </p>
      )}
      <button className="button" onClick={nextQuestion}>
        שאלה הבאה
      </button>
      <button className="button share-button" onClick={shareGame}>
        שתף משחק
      </button>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
