import { useState, useEffect } from 'react'
import './App.css'
import PointDisplay from './PointDisplay';
import BattellingPannel from './BattellingPannel';
import DiceResult from './DiceResult';
import Loader from './Loader';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function App() {
  
  const [points, setPoints] =useState(5000);
  const [betAmount, setBetAmount] = useState(100);
  const [betType, setBetType] = useState('7 Up');
  const [diceResult, setDiceResult]= useState({dice1:null, dice2: null});
  const [loading , setLoading] = useState(false);
  const [message ,setMessage] = useState('');
  const [showStartMessage, setShowStartMessage] = useState(false);

  const rolldice = async() => {
    setLoading(true);
    try {
      const result = await axios.post('https://sevenup7down.onrender.com/roldice');
      setDiceResult(result.data);
      const response = await axios.post('https://sevenup7down.onrender.com/calculateResult', {
      dice1: result.data.dice1,
      dice2: result.data.dice2,
      betAmount,
      betType,
      points,
         });
         setPoints(response.data.newPoints);
         setMessage(response.data.message);
         if(response.data.message==='You lost!'){
             setShowStartMessage(true);
         } else{
          setShowStartMessage(false);
         }
    } catch(err){
      console.log(err);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (showStartMessage) {
        setPoints(5000);  // Reset points or any other state reset logic
        setBetAmount(100);
        setBetType('7 Up');
        setDiceResult({ dice1: null, dice2: null });
        setMessage('');
        setShowStartMessage(false);
    }
};

useEffect(() => {
  window.addEventListener('keypress', handleKeyPress);
  return () => {
      window.removeEventListener('keypress', handleKeyPress);
  };
}, [showStartMessage]);


  const getMessageClass = () => {
    if (message === 'You won!') {
        return 'message message-won';
    } else if (message === 'Jackpot!') {
        return 'message message-jackpot';
    } else if (message === 'You lost!') {
        return 'message message-lost';
    } else {
        return 'message';
    }
};
    return (
    <>
    <div>
      <h1>7UP 7Down Game</h1>
    <PointDisplay points={points}/>
    <h4>Please select the points before starting and select the Bet type</h4>
    <h3>Roll the dice to start the Game</h3>
      
    <BattellingPannel setBetAmount={setBetAmount} setBetType={setBetType}/>
    <button className='btn' onClick={rolldice}>Roll Dice</button>
    {loading ? <CircularProgress /> : <DiceResult diceResult={diceResult} />}
    {message && <p className={getMessageClass()}>{message}</p>}
    {showStartMessage && <p className="start-message">Please press any key to start</p>}
    </div>
       
    </>
  )
}

export default App