const similarity = require('similarity');

module.exports = (data) => {
  let maxPercentage = 0;
  let mostSimilarLinks = [];

  for (let i = 0; i < data.firstLinks.length; i++){
    let firstCleanedUrl = data.firstLinks[i].slice(data.firstLinks[0].length + 1)
    for (let j = 0; j < data.secondLinks.length; j++){
      let secondCleanedUrl = data.secondLinks[j].slice(data.secondLinks[0].length + 1 )
      // console.log(`cleaned ${firstCleanedUrl}, cleaned ${secondCleanedUrl}`)
      let percentage = (similarity(firstCleanedUrl, secondCleanedUrl) * 100);

      if(percentage > maxPercentage) {
        maxPercentage = percentage;
        mostSimilarLinks = [[data.firstLinks[i], data.secondLinks[j], `${maxPercentage.toFixed()}%`]]
      }if(percentage === maxPercentage) {
        maxPercentage = percentage;
        mostSimilarLinks.push([data.firstLinks[i], data.secondLinks[j], `${maxPercentage.toFixed()}%`])
      }
    }
  }
  return mostSimilarLinks
}
