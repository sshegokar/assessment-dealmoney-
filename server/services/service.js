
const user = require('../model/usermodel')
const _ = require('underscore');
const excel = require('excel4node');
const fs = require('fs');
const file = require('./fileupload')
const Promise = require('bluebird');
const workbook = new excel.Workbook();


function chunkArray(myArray, chunk_size){
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  
  for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index+chunk_size);
      tempArray.push(myChunk);
  }

  return tempArray;
}
function processBatch(batchItem) {
    return user.create(batchItem);
};

exports.uploadBulk = (req, res, callback) => {
    const promise = new Promise((resolve, reject) => {
      let fileDetailsObject = req.body;
      let arrayBatch = chunkArray(fileDetailsObject, 1000)
      return Promise.map(arrayBatch, processBatch, { concurrency: 1 })
      .then(function() {
        console.log("done");
       }).then((data) => {
         console.log('insterted all record')
          resolve({
            success: true
          })
        })
        .catch(reject);
    });
    if (callback !== null && typeof callback === 'function') {
      promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
    } else {
      return promise;
    }
  };

      exports.exportFileData = (res, callback) => {
        const promise = new Promise(function (resolve, reject) {
          let headers = [
            { header: 'Ts', key: 'ts', width: 32 },
            { header: 'Val', key: 'val', width: 32 },
          ];
          user.find()
              .then(function (data) {
                let excelSheet=file.createExcelReport(null, 'File', headers, data, null);
                    return excelSheet.xlsx.write(res).then(function () {
                      res.end();
                    });
              })
              .catch(function (err) {
                console.error(err);
                return callback(err);
              });
        });
    
        if (callback !== null && typeof callback === 'function') {
          promise
            .then(function (data) {
              return callback(null, data);
            })
            .catch(function (err) {
              return callback(err);
            });
        } else {
          return promise;
        }
      };
    