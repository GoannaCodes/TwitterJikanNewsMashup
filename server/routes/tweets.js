var express = require('express');
var router = express.Router();
const data = require('./helper/seasonList');
const axios = require('axios');
const key = process.env.TWITTER_BEARER;

/* GET tweets talking about seasonal shows. */
router.get('/:year/:season', function(req, res, next) {
  let season = req.params.season;
    let year = req.params.year;    
    let tweets = []

    data.getAnimeData(year, season).then(data=>{
        //extract just the series titles 
        animeNames = getSeriesName(data);
        
        return animeNames;
    })
    .then(async (resAnime)=>{
        //send this off to the twitter search API
        for (let i = 0; i < 10; i++){
            options = createTwitterOptions(resAnime[i].title);
            await axios.request(options)
            .then(response=>{
                tweets.push({
                    anime: resAnime[i].title,
                    tweets: [response.data.statuses[0].id_str, response.data.statuses[1].id_str, response.data.statuses[2].id_str]})
            })
            .catch(error => console.log(error));
        }
        res.json(tweets);

    })
    .catch((error)=>{
        res.json(error);
    })
})

function getSeriesName(rsp){
  let animeTitles = [];
  for (let i = 0; i < 10; i++){
    currentAnime = rsp[i];
    animeTitles.push({
      title: currentAnime.title
    })
  }
  return animeTitles;
}

function createTwitterOptions(title){
  const twitterOptions = {
    method: 'GET',
    url: 'https://api.twitter.com/1.1/search/tweets.json',
    params: {
        //remove retweets from results
        q: title + ' -RT -myanimelist -anilist',
        lang: 'en',
        result_type: 'mixed',
        // amount of tweets returned for each query
        count: 3
    },
    headers: {
        'Authorization': `Bearer ${key}`
    }
  }
  return twitterOptions;
}
module.exports = router;
