const similarity = require('similarity');

module.exports = (data, urlOne, urlTwo) => {

  let maxPercentage = 0;
  let mostSimilarLinks = [];

  for (let i = 0; i < data.firstUrlLinks.length; i++){
    let firstCleanedLink = data.firstUrlLinks[i].slice(urlOne.length + 1)
    for (let j = 0; j < data.secondUrlLinks.length; j++){
      let secondCleanedLink = data.secondUrlLinks[j].slice(urlTwo.length + 1 )
      // console.log(`cleaned ${firstCleanedUrl}, cleaned ${secondCleanedUrl}`)
      let percentage = (similarity(firstCleanedLink, secondCleanedLink) * 100);

      if(percentage > maxPercentage) {
        maxPercentage = percentage;
        mostSimilarLinks = [[data.firstUrlLinks[i], data.secondUrlLinks[j], `${maxPercentage.toFixed()}%`]]
      }if(percentage === maxPercentage) {
        maxPercentage = percentage;
        mostSimilarLinks.push([data.firstUrlLinks[i], data.secondUrlLinks[j], `${maxPercentage.toFixed()}%`])
      }
    }
  }
  return mostSimilarLinks
}
