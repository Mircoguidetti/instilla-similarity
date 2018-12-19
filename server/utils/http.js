const axios = require('axios')
    , cheerio = require('cheerio')

module.exports = (urlOne, urlTwo) => {
  return new Promise((resolve, reject) => {

  let links = {
    firstUrlLinks: [],
    secondUrlLinks: []
  };

  return axios.get(urlOne).then((response) => {
  let $ = cheerio.load(response.data);
  $('a').each(function() {
    let link = $(this).attr('href');
    if(link && link.includes(urlOne)) {
      links.firstUrlLinks.push(link);
    }

  });
  return axios.get(urlTwo);
}).then((response) => {
  let $ = cheerio.load(response.data);
  $('a').each(function() {
    let link = $(this).attr('href')
    if(link && link.includes(urlTwo)) {
      links.secondUrlLinks.push(link);
    }
  });


  return resolve(links)
}).catch((error) => {
  return reject(error)
});
});
}
