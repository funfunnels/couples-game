const questions = [
  "מהם שלושת הערכים החשובים ביותר עבורך בזוגיות?",
  "איך אתה רואה את חיי המשפחה שלנו בעוד 5 שנים?",
  "מהו החלום הגדול ביותר שלך שהיית רוצה שנגשים יחד?",
  "איזה הרגל או מסורת חדשה היית רוצה ליצור יחד?",
  "מהו האתגר הגדול ביותר שלדעתך נצטרך להתמודד איתו כזוג, ואיך נוכל להתכונן אליו?",
  "איך היית רוצה שנחגוג את ההצלחות שלנו כזוג?",
  "מהו המקום האידיאלי עבורך לגור בו בעתיד ולמה?",
  "איזה סוג של הורים היית רוצה שנהיה (אם רלוונטי)?",
  "מהי הדרך הטובה ביותר עבורך לקבל ולהביע אהבה בזוגיות?",
  "איך אנחנו יכולים לתמוך זה בזה בהגשמת החלומות האישיים שלנו?",
  "מהו הזיכרון המשותף האהוב עליך עד כה, ואיזה סוג של זיכרונות היית רוצה ליצור בעתיד?",
  "איך היית רוצה שנתמודד עם קונפליקטים או מחלוקות בינינו?",
  "מהי ההגדרה שלך לזוגיות מוצלחת?",
  "איזה תחביב או פעילות חדשה היית רוצה שנלמד ונעשה יחד?",
  "איך אנחנו יכולים לשמור על הרומנטיקה והריגוש בזוגיות שלנו לאורך זמן?",
  "מהי המטרה הכלכלית המשותפת הגדולה ביותר שלנו לחמש השנים הקרובות?",
  "איזה סוג של איזון בין קריירה לחיי משפחה היית רוצה שיהיה לנו?",
  "מהו הדבר שאתה הכי מעריך בי ולמה?",
  "איך אנחנו יכולים לשפר את התקשורת בינינו?",
  "מהו החלום שלך לגבי טיול משותף שלנו? לאן ומה היית רוצה שנעשה?",
  "איך היית רוצה שנחלק את המטלות והאחריות בבית?",
  "מהי הפנטזיה הרומנטית שלך שהיית רוצה להגשים איתי?",
  "איזה ערך או מסורת מהמשפחה שלך היית רוצה להעביר לזוגיות ולמשפחה שלנו?",
  "מהו הדבר שאתה הכי חושש ממנו בעתיד שלנו יחד, ואיך נוכל להתמודד עם זה?",
  "איך אנחנו יכולים לעזור זה לזה להתפתח ולצמוח כאנשים?",
  "מהי החוויה החדשה שהכי היית רוצה שנחווה יחד?",
  "איך היית רוצה שנתמודד עם לחצים מהמשפחות שלנו?",
  "מהו הדבר שאתה הכי אוהב לעשות איתי ולמה?",
  "איזה סוג של אווירה היית רוצה שתהיה בבית שלנו?",
  "מהי המשמעות של מחויבות בזוגיות עבורך?",
  "איך אנחנו יכולים לשלב את החברים שלנו בחיים המשותפים שלנו?",
  "מהו החלום המקצועי שלך ואיך אני יכול/ה לתמוך בך בהגשמתו?",
  "איזה סוג של חופשות היית רוצה שנעשה יחד?",
  "מהי הדרך הטובה ביותר עבורך לפתור מחלוקות בזוגיות?",
  "איך היית רוצה שנחגוג את ימי ההולדת והחגים שלנו?",
  "מהו הדבר שהכי מפחיד אותך בקשר ואיך אני יכול/ה לעזור לך להתמודד עם זה?",
  "איזה הרגלים בריאות היית רוצה שנאמץ יחד?",
  "מהי התפיסה שלך לגבי ניהול כספים משותף?",
  "איך אנחנו יכולים לשמור על הפרטיות והעצמאות שלנו בתוך הזוגיות?",
  "מהו הדבר שהיית רוצה שנשפר בחיי האינטימיות שלנו?",
  "איזה סוג של תרומה לקהילה או לחברה היית רוצה שנעשה יחד?",
  "מהי הדרך הטובה ביותר עבורך לקבל תמיכה רגשית ממני?",
  "איך היית רוצה שנתמודד עם אתגרים בריאותיים (שלנו או של בני משפחה) בעתיד?",
  "מהו הדבר שהכי מרגש אותך לגבי העתיד שלנו יחד?",
  "איזה סוג של טקסים או הרגלים יומיומיים היית רוצה שיהיו לנו כזוג?",
  "מהי התפיסה שלך לגבי גידול ילדים (אם רלוונטי) ואיך נוכל לשלב את הגישות שלנו?",
  "איך אנחנו יכולים לתמוך זה בזה בזמנים של לחץ או משבר?",
  "מהו הדבר שהכי היית רוצה ללמוד או לשפר בעצמך, ואיך אני יכול/ה לעזור?",
  "איזה סוג של בית היית רוצה שיהיה לנו בעתיד?",
  "מהי המשמעות של אהבה עבורך ואיך היא באה לידי ביטוי?",
  "איך אנחנו יכולים לשמור על הקשרים עם המשפחות שלנו תוך כדי בניית הזוגיות שלנו?",
  "מהו הדבר שהכי מאתגר אותך בזוגיות ואיך נוכל להתמודד איתו יחד?",
  "איזה חלומות אישיים שלך היית רוצה להגשים בחמש השנים הקרובות?",
  "מהי הציפייה הכי חשובה שלך ממני כבן/בת זוג?",
  "איך אנחנו יכולים לשמור על הספונטניות והכיף בזוגיות שלנו?"
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
