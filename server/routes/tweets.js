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
        // 
        if (resAnime.title_english === null){

        }
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

// could you just use map/filter to filter out just the titles?
// probably
function getSeriesName(rsp){

}
module.exports = router;
