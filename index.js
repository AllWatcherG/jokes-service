const express = require('express');
const app = express();
const { Joke } = require('./db');
const { Op } = require('sequelize')
const { Sequelize, Model, DataTypes } = require('sequelize')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  try {
    // TODO - filter the jokes by tags and content
    // const jokes = [];
    // res.send(jokes);
    const {content, tags, id} = req.query
    if(req.query.id){
      objkey = req.query.id
      res.send(await Joke.findByPk(objkey))
    }else if(req.query.tags){
      tagToFind = req.query.tags
      res.send(await Joke.findAll({
        where: {
          tags: {
            [Op.like]: `%${tagToFind}%`
          },
        },
      }))
    }else if(req.query.content){
      jokeToFind = req.query.content
      res.send(await Joke.findAll({
        where: {
          joke: {
            [Op.like]: `%${jokeToFind}%`
          }
        }
      }))
    }else{
      res.send(await Joke.findAll())
    }

  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
