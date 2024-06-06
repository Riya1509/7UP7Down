import React from 'react'

const BattellingPannel = ({setBetAmount, setBetType}) => {
  return (
    <div>
        <select onChange={(e) =>setBetAmount(Number(e.target.value))}>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
        </select>
        <select onChange={(e) => setBetType(e.target.value)}>
            <option value="7 UP">7 UP</option>
            <option value="7 Down">7 Down</option>
            <option value="7">Lucky Seven</option>


        </select>



    </div>
  )
}

export default BattellingPannel