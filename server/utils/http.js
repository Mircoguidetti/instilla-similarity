const axios = require('axios')
    , cheerio = require('cheerio');

module.exports = (firstUrl, secondUrl) => {
  return new Promise((resolve, reject) => {
  let urlLinks = {
    firstLinks: [],
    secondLinks: []
  }

  urlLinks.firstLinks.push(firstUrl)
  urlLinks.secondLinks.push(secondUrl)
  return axios.get(firstUrl).then((response) => {
  let $ = cheerio.load(response.data);
  $('a').each(function() {
    let link = $(this).attr('href');
    if(link && link.includes(firstUrl)) {
      urlLinks.firstLinks.push(link);
    }

  });
  return axios.get(secondUrl);
}).then((response) => {
  let $ = cheerio.load(response.data);
  $('a').each(function() {
    let link = $(this).attr('href')
    if(link && link.includes(secondUrl)) {
      urlLinks.secondLinks.push(link);
    }
  });

  return resolve(urlLinks)
}).catch((error) => {
  console.log(error)
  return reject(error)
});
});
}
