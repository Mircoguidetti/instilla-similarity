const fs = require('fs');
const path = require('path')
const similarity = require('similarity');
const { handleAxiosRequest } = require('./handleAxiosRequest');
const filePath = path.join(__dirname, '../files/data.csv');


let handleFileUpload = (firstUrl, secondUrl, percentage) => {
  handleAxiosRequest(firstUrl, secondUrl).then(data => {
    fs.writeFileSync(filePath, '');
    for (var i = 0; i < data.firstUrl.length; i++){
      for (var i = 0; i < data.secondUrl.length; i++){
        let compareUrls = similarity(data.firstUrl[i], data.secondUrl[i]) *100;

        if (compareUrls > percentage){

          fs.appendFileSync(filePath, `${data.firstUrl[i]},`);
          fs.appendFileSync(filePath, `${data.secondUrl[i]}, ${compareUrls.toFixed(2)}%\n`);
        }
      }
    }
  });
}

module.exports = { handleFileUpload };
