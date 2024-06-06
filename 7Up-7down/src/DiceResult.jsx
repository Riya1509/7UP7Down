import React from 'react'

const DiceResult = ({diceResult}) => {
    if(diceResult.dice1===null)return null;
  return (
    <div>
      <div className='dice1'> Dice 1 : {diceResult.dice1} </div> 
      <div className='dice2'> Dice 2 : {diceResult.dice2}</div> 
    </div>
  );
}

export default DiceResult