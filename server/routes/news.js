var express = require('express');
var router = express.Router();
const data = require('./helper/seasonData');
const axios = require('axios');
const key = process.env.NEWS_KEY;

/* GET news articles */
router.get('/:year/:season', function(req, res, next) {
  let season = req.params.season;
  let year = req.params.year;
  let articles = [];

  // get the list of seasonal anime entries
  data.getAnimeData(year, season).then(data=>{
    // extract just the westernised names of the shows
    animeTitles = getEnglishNames(data);
    return animeTitles;
  })
  .then(async(animeTitles)=>{
    for(let i = 0; i < 10; i++){
      // query to send to NEWS API
      q = animeTitles[i].englishTitle + " anime";
      url = `https://newsapi.org/v2/everything?q=${q}&pageSize=1&language=en&apiKey=${key}`;
      await axios.get(url)
      .then(response=>{
        // store article data and anime used for query
        articles.push({
          anime: animeTitles[i].englishTitle,
          article: response.data.articles
        })
      })
      .catch(error=> console.log(error))
    }
    res.json(articles);
  })
  .catch(error=> res.json(error));
});

module.exports = router;


function getEnglishNames(rsp){
  let animeDetails = [];

  for (let i = 0; i < 10; i++){
    currentAnime = rsp[i];
    englishName = currentAnime.title_english;
    

    //series that do not have an english name logged, try to use synonyms
    // and replace any '-' characters with empty space 
    if (englishName == null){
      englishName = currentAnime.title_synonyms[0].replace('-', ' ');
    }
    
    animeDetails.push({
      title: currentAnime.title,
      englishTitle: englishName
    })
  }
  return animeDetails;
}