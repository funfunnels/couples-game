// Import Firebase (add these scripts to your index.html)
// <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>

// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyB5J1IV0HncV9W7jIj5aqTMD2AysUsaOR8",
  authDomain: "couples-game-d0777.firebaseapp.com",
  databaseURL: "https://couples-game-d0777-default-rtdb.firebaseio.com",
  projectId: "couples-game-d0777",
  storageBucket: "couples-game-d0777.appspot.com",
  messagingSenderId: "60305831515",
  appId: "1:60305831515:web:619adaa678540edc41b17e",
  measurementId: "G-FXHDTQJT61"
}
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Constants
const DICE_ROLL_DURATION = 1000;
const DICE_SIDES = 6;

// Questions array (keep as is)
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
// Utility functions
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getAnswerMethod = (diceValue) => {
  const methods = {
    1: "ענו כרגיל",
    2: "ענו מנקודת המבט של בן/בת הזוג",
    3: "ענו בפנטומימה",
    4: "ענו בציור",
    5: "ענו בשיר או בחרוז",
    6: "בחרו איך לענות"
  };
  return methods[diceValue] || "הטילו את הקובייה";
};

// Components
const Dice = ({ rolling, value }) => (
  <div className={`dice ${rolling ? 'rolling' : ''}`}>
    {value}
  </div>
);

const ProgressBar = ({ progress }) => (
  <div className="progress-bar">
    <div className="progress" style={{width: `${progress}%`}}></div>
  </div>
);

function App() {
  const [gameId, setGameId] = React.useState(null);
  const [playerRole, setPlayerRole] = React.useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [shuffledQuestions, setShuffledQuestions] = React.useState([]);
  const [diceValue, setDiceValue] = React.useState(null);
  const [rolling, setRolling] = React.useState(false);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('gameId');
    if (id) {
      setGameId(id);
      setPlayerRole('player2');
      joinGame(id);
    } else {
      createNewGame();
    }
  }, []);

  const createNewGame = () => {
    const newGameRef = database.ref('games').push();
    setGameId(newGameRef.key);
    setPlayerRole('player1');
    const shuffledQuestions = shuffleArray([...questions]);
    setShuffledQuestions(shuffledQuestions);
    newGameRef.set({
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      diceValue: null
    });
  };

  const joinGame = (id) => {
    const gameRef = database.ref(`games/${id}`);
    gameRef.once('value', (snapshot) => {
      const gameData = snapshot.val();
      if (gameData) {
        setShuffledQuestions(gameData.questions);
        setCurrentQuestionIndex(gameData.currentQuestionIndex);
        setDiceValue(gameData.diceValue);
      }
    });
  };

  React.useEffect(() => {
    if (gameId) {
      const gameRef = database.ref(`games/${gameId}`);
      gameRef.on('value', (snapshot) => {
        const gameData = snapshot.val();
        if (gameData) {
          setShuffledQuestions(gameData.questions);
          setCurrentQuestionIndex(gameData.currentQuestionIndex);
          setDiceValue(gameData.diceValue);
        }
      });
      return () => gameRef.off();
    }
  }, [gameId]);

  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * DICE_SIDES) + 1;
      setDiceValue(newValue);
      setRolling(false);
      database.ref(`games/${gameId}`).update({ diceValue: newValue });
    }, DICE_ROLL_DURATION);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setDiceValue(null);
      database.ref(`games/${gameId}`).update({
        currentQuestionIndex: newIndex,
        diceValue: null
      });
    } else {
      alert("המשחק הסתיים! תודה ששיחקתם.");
    }
  };

  const shareGame = () => {
    const gameUrl = `${window.location.origin}${window.location.pathname}?gameId=${gameId}`;
    if (navigator.share) {
      navigator.share({
        title: 'משחק זוגי',
        text: 'בואו לשחק במשחק זוגי מהנה!',
        url: gameUrl
      }).then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert(`שתף את הקישור הזה עם בן/בת הזוג שלך: ${gameUrl}`);
    }
  };

  if (!gameId) {
    return <div>טוען משחק...</div>;
  }

  return (
    <div className="app">
      <div className="image-placeholder">
        <img 
          src="https://ourevent.co.il/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-03-at-20.43.51.jpeg" 
          alt="תמונה זוגית" 
          className="couple-image" 
        />
      </div>
      <ProgressBar progress={progress} />
      <h1 className="question">{shuffledQuestions[currentQuestionIndex]}</h1>
      <Dice rolling={rolling} value={diceValue || '?'} />
      <button className="button" onClick={rollDice} disabled={rolling || playerRole !== 'player1'}>
        {rolling ? 'מגלגל...' : 'גלגל קובייה'}
      </button>
      {!rolling && diceValue && (
        <p className="result">
          {getAnswerMethod(diceValue)}
        </p>
      )}
      <button className="button" onClick={nextQuestion} disabled={playerRole !== 'player1'}>
        שאלה הבאה
      </button>
      <button className="button share-button" onClick={shareGame}>
        הזמן שחקן
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
