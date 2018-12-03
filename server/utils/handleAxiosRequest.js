const axios = require('axios');
const cheerio = require('cheerio');

let handleAxiosRequest = (firstUrl, secondUrl) => {
  return new Promise((resolve, reject) => {
  let urlLinks = {
    firstUrl: [],
    secondUrl: []
  }
  return axios.get(firstUrl).then((response) => {
  let $ = cheerio.load(response.data);
  $('a').each(function() {
    let link = $(this).attr('href');
    if(link && link.includes(firstUrl)) {
      urlLinks.firstUrl.push(link);
    }

  });
  return axios.get(secondUrl);
}).then((response) => {
  let $ = cheerio.load(response.data);
  $('a').each(function() {
    let link = $(this).attr('href')
    if(link && link.includes(secondUrl)) {
      urlLinks.secondUrl.push(link);
    }
  });
  return resolve(urlLinks)
}).catch((error) => {
  console.log(error)
  return reject(error)
});
});
}

module.exports = { handleAxiosRequest };
