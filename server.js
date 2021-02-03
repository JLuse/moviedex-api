const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const MOVIES = require('./movies-data.json');

const app = express()

app.use(logger('dev'))
app.use(helmet())
app.use(cors())

app.use(validateBearerTokens = (req, res, next) => {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
    }
    
  next();
})

handleGetMovie = (req, res) => {
  let response = MOVIES;

  if (req.query.genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }

  if (req.query.country) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
  }

  if (req.query.avg_vote) {
    response = response.filter(movie =>
      movie.avg_vote >= req.query.avg_vote
    )
  }

  res.json(response);
}

app.get('/movie', handleGetMovie);

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})