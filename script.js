// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5J1IV0HncV9W7jIj5aqTMD2AysUsaOR8",
  authDomain: "couples-game-d0777.firebaseapp.com",
  databaseURL: "https://couples-game-d0777-default-rtdb.firebaseio.com",
  projectId: "couples-game-d0777",
  storageBucket: "couples-game-d0777.appspot.com",
  messagingSenderId: "60305831515",
  appId: "1:60305831515:web:619adaa678540edc41b17e",
  measurementId: "G-FXHDTQJT61"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

firebase.auth().signInAnonymously().catch(function(error) {
  console.error("Authentication error:", error);
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("User is signed in anonymously");
  } else {
    console.log("User is signed out");
  }
});

// Constants
const DICE_ROLL_DURATION = 1000;
const DICE_SIDES = 6;
const QUESTION_TIME_LIMIT = 120; // 2 minutes in seconds
const MOODS = ['😞', '😐', '🙂', '😊', '😃'];

// Questions array
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

const Timer = ({ time }) => (
  <div className="timer">
    זמן נותר: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
  </div>
);

const MoodSelector = ({ currentMood, onMoodSelect }) => (
  <div className="mood-selector">
    {MOODS.map((mood, index) => (
      <button 
        key={index} 
        className={`mood-button ${currentMood === index ? 'selected' : ''}`} 
        onClick={() => onMoodSelect(index)}
      >
        {mood}
      </button>
    ))}
  </div>
);

const MemoryBank = ({ memories, onSaveMemory }) => (
  <div className="memory-bank">
    <h3>זכרונות משותפים</h3>
    <button className="button" onClick={onSaveMemory}>שמור זיכרון</button>
    <ul>
      {memories.map((memory, index) => (
        <li key={index}>
          <strong>שאלה:</strong> {memory.question}<br />
          <strong>תשובה:</strong> {memory.answer}
        </li>
      ))}
    </ul>
  </div>
);

function App() {
  const [gameId, setGameId] = React.useState(null);
  const [playerRole, setPlayerRole] = React.useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [shuffledQuestions, setShuffledQuestions] = React.useState([]);
  const [diceValue, setDiceValue] = React.useState(null);
  const [rolling, setRolling] = React.useState(false);
  const [currentTurn, setCurrentTurn] = React.useState('player1');
  const [timeLeft, setTimeLeft] = React.useState(QUESTION_TIME_LIMIT);
  const [player1Mood, setPlayer1Mood] = React.useState(null);
  const [player2Mood, setPlayer2Mood] = React.useState(null);
  const [memories, setMemories] = React.useState([]);
  const [currentAnswer, setCurrentAnswer] = React.useState('');

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

  React.useEffect(() => {
    if (gameId) {
      const gameRef = database.ref(`games/${gameId}`);
      gameRef.on('value', (snapshot) => {
        const gameData = snapshot.val();
        if (gameData) {
          setShuffledQuestions(gameData.questions);
          setCurrentQuestionIndex(gameData.currentQuestionIndex);
          setDiceValue(gameData.diceValue);
          setCurrentTurn(gameData.currentTurn);
          setTimeLeft(gameData.timeLeft || QUESTION_TIME_LIMIT);
          setPlayer1Mood(gameData.player1Mood);
          setPlayer2Mood(gameData.player2Mood);
        }
      });
      return () => gameRef.off();
    }
  }, [gameId]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(time => time - 1);
        database.ref(`games/${gameId}`).update({ timeLeft: timeLeft - 1 });
      } else {
        alert("הזמן נגמר עברו לשאלה הבאה");
        nextQuestion();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameId]);
 
  React.useEffect(() => {
    if (gameId) {
      const memoriesRef = database.ref(`games/${gameId}/memories`);
      memoriesRef.on('value', (snapshot) => {
        const memoriesData = snapshot.val();
        if (memoriesData) {
          setMemories(Object.values(memoriesData));
        }
      });
      return () => memoriesRef.off();
    }
  }, [gameId]);
  
  const saveMemory = () => {
    if (currentAnswer.trim() !== '') {
      const newMemory = {
        question: shuffledQuestions[currentQuestionIndex],
        answer: currentAnswer,
        timestamp: Date.now()
      };
      const memoriesRef = database.ref(`games/${gameId}/memories`).push();
      memoriesRef.set(newMemory);
      setCurrentAnswer('');
    } else {
      alert('אנא הזן תשובה לפני שמירת הזיכרון');
    }
  };

  const handleAnswerChange = (event) => {
    setCurrentAnswer(event.target.value);
  };

  const createNewGame = () => {
    const newGameRef = database.ref('games').push();
    setGameId(newGameRef.key);
    setPlayerRole('player1');
    const shuffledQuestions = shuffleArray([...questions]);
    setShuffledQuestions(shuffledQuestions);
    newGameRef.set({
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      diceValue: null,
      currentTurn: 'player1',
      timeLeft: QUESTION_TIME_LIMIT,
      player1Mood: null,
      player2Mood: null,
      memories: {}
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
        setCurrentTurn(gameData.currentTurn);
        setTimeLeft(gameData.timeLeft || QUESTION_TIME_LIMIT);
        setPlayer1Mood(gameData.player1Mood);
        setPlayer2Mood(gameData.player2Mood);
        setMemories(gameData.memories ? Object.values(gameData.memories) : []);
      }
    });
  };
  
  const rollDice = () => {
    if (currentTurn === playerRole) {
      setRolling(true);
      setTimeout(() => {
        const newValue = Math.floor(Math.random() * DICE_SIDES) + 1;
        setDiceValue(newValue);
        setRolling(false);
        database.ref(`games/${gameId}`).update({ diceValue: newValue });
      }, DICE_ROLL_DURATION);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      const nextTurn = currentTurn === 'player1' ? 'player2' : 'player1';
      setCurrentQuestionIndex(newIndex);
      setDiceValue(null);
      setTimeLeft(QUESTION_TIME_LIMIT);
      database.ref(`games/${gameId}`).update({
        currentQuestionIndex: newIndex,
        diceValue: null,
        currentTurn: nextTurn,
        timeLeft: QUESTION_TIME_LIMIT,
        player1Mood: null,
        player2Mood: null
      });
    } else {
      alert("המשחק הסתיים! תודה ששיחקתם.");
    }
  };

  const handleMoodSelect = (mood) => {
    const moodKey = playerRole === 'player1' ? 'player1Mood' : 'player2Mood';
    database.ref(`games/${gameId}`).update({ [moodKey]: mood });
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
      <ProgressBar progress={(currentQuestionIndex + 1) / shuffledQuestions.length * 100} />
      <Timer time={timeLeft} />
      <h1 className="question">{shuffledQuestions[currentQuestionIndex]}</h1>
      <h2>איך אתם מרגישים?</h2>
      <MoodSelector 
        currentMood={playerRole === 'player1' ? player1Mood : player2Mood}
        onMoodSelect={handleMoodSelect}
      />
          
      {playerRole === 'player1' && player2Mood !== null && (
        <p>מצב הרוח של בן/בת הזוג: {MOODS[player2Mood]}</p>
      )}
      {playerRole === 'player2' && player1Mood !== null && (
        <p>מצב הרוח של בן/בת הזוג: {MOODS[player1Mood]}</p>
      )}
      <Dice rolling={rolling} value={diceValue || '?'} />
      <button className="button" onClick={rollDice} disabled={rolling || currentTurn !== playerRole}>
        {rolling ? 'מגלגל...' : 'גלגל קובייה'}
      </button>
      {!rolling && diceValue && (
        <p className="result">
          {getAnswerMethod(diceValue)}
        </p>
      )}
     <div className="answer-section">
        <textarea
          value={currentAnswer}
          onChange={handleAnswerChange}
          placeholder="הזן את תשובתך כאן"
        />
      </div>
      <MemoryBank memories={memories} onSaveMemory={saveMemory} />
      <button className="button" onClick={nextQuestion} disabled={currentTurn !== playerRole}>
        שאלה הבאה
      </button>
      <button className="button share-button" onClick={shareGame}>
        הזמן שחקן
      </button>
      <p>תור: {currentTurn === playerRole ? 'שלך' : 'של בן/בת הזוג'}</p>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
