const axios = require('axios');

module.exports.getAnimeData = getAnimeData;

// Retrieve the list of seasonal anime 
async function getAnimeData(year, season){
    const response = await axios.get(`https://api.jikan.moe/v4/seasons/${year}/${season}`);

    return response.data.data;
}