const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "https://7-up-7-down-upfj.vercel.app/"
  }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Server is running. Use POST /roll-dice or POST /calculate-result to play the game.');
});


app.post('/roldice', (req, res) => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    res.json({ dice1, dice2 });
});

app.post('/calculateResult', (req, res) => {
    const { dice1, dice2, betAmount, betType, points } = req.body;
    const total = dice1 + dice2;
    let newPoints = points;
    let message = '';
    if (total < 7 && betType === '7 Down' || total > 7 && betType === '7 UP') {
        newPoints += betAmount * 2;
        message = 'You won!';
    } else if (total === 7 && betType === '7') {
        newPoints += betAmount * 5;
        message = 'Jackpot!';
    } else {
        newPoints -= betAmount;
        message = 'You lost!';
    }
    res.json({ newPoints, message });
});



