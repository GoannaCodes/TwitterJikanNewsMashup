var express = require('express');
var router = express.Router();
const seasonList = require('./helper/seasonList');
const axios = require('axios');
const key = process.env.TWITTER_BEARER;

/* GET users listing. */
router.get('/:year/:season', function(req, res, next) {
  let season = req.params.season;
  let year = req.params.year;
  let tweets = []

  seasonList.getAnimeData(year, season)
  .then(data=>{
    // extract series titles
    animeNames = getSeriesName(data);
    return animeNames;
  })
  .then(async(resAnime)=>{
    for (let i = 0; i < 10; i++){
      options = createTwitterOptions(resAnime[i].title);
      await axios.request(options)
      .then(response=>{
        tweets.push({
          anime: resAnime[i].title,
          tweets: [response.data.statuses[0].id_str, response.data.statuses[1].id_str, response.data.statuses[2].id_str]
        })
        
      })
      .catch(error=> console.log(error));
    }
    res.json(tweets);
  })
  .catch(error=> res.json(error));
  
});

// Extracts just the titles from the response data
function getSeriesName(rsp){
  let animeTitles = [];

  for(let i = 0; i < 10; i++){
    currentAnime=rsp[i];
    animeTitles.push({
      title: currentAnime.title
    })
  }
  return animeTitles;
}

// Options for querying twitter API
function createTwitterOptions(title){
  const twitterOptions = {
    method: "GET",
    url: "https://api.twitter.com/1.1/search/tweets.json",
    params: {
      // remove retweets
      q: title + '-RT -myanimelist -anilist',
      lang: 'en',
      result_type: 'recent',
      // amount of tweets returned for each query
      count: 3
    },
    headers: {
      'Authorization': `Bearer ${key}`
    }
  }
}
module.exports = router;
