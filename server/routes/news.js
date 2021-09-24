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

  data.getAnimeData(year, season).then(data=>{
    animeTitles = getEnglishNames(data);
    return animeTitles;
  })
  .then(async(animeTitles)=>{
    for(let i = 0; i < 10; i++){
      q = animeTitles[i].englishTitle + " anime";
      url = `https://newsapi.org/v2/everything?q=${q}&pageSize=1&language=en&apiKey=${key}`;
      await axios.get(url)
      .then(response=>{
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