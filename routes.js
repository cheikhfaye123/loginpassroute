const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
  res.send(`
    <form action="/check" method="POST">
      <input type="text" name="word" placeholder="Enter the secret word">
      <button type="submit">Submit</button>
    </form>
  `);
});

router.post('/check', (req, res) => {
  const { word } = req.body;
  const secretWord = process.env.SECRET_WORD;

  console.log('Entered word:', word);
  console.log('Secret word:', secretWord);

  if (word === secretWord) {
    res.send('Success! You found the secret word.');
  } else {
    res.redirect('/');
  }
});

module.exports = router;