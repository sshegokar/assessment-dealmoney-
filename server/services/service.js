
const user = require('../model/usermodel')
const file = require('./fileupload');
const _ = require('underscore');



exports.uploadBulk = (req, res, type, callback) => {
    const promise = new Promise((resolve, reject) => {
      let fileDetailsObject;
      return new Promise((resolve, reject) => {
       file.upload(req,
          res,
          (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          });
      })
        .then(fileDetails => {
          if (!fileDetails.files || Object.keys(fileDetails.files).length == 0) {
            return Promise.reject(new RestError(404, `No files found`));
          } else {
              fileUpload.create({
                  fileName:fileDetails.files.file[0].name,
                  dateTime: new Date()
              });
            fileDetailsObject = fileDetails;
            return file.loadFileAsBuffer(fileDetails.files.file[0].name
            );
          }
        })
        .then(bufferObject => {
            if (_.size(bufferObject) > 0) {
                return Promise.resolve(bufferObject);
              } else {
                return Promise.reject(new RestError(404, `No data found`));
              }
        })
        .then(details => {
            let promises =[];
        _.each(details,function(data){
            promises.push(user.create({
             ts:data.ts,
             val:data.val   
            }));
        });
        return promise.all(promises);
    })
        .then(() => {
          resolve({
            success: true
          });
        })
        .catch(reject);
    });
    if (callback !== null && typeof callback === 'function') {
      promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
    } else {
      return promise;
    }
  };

      exports.exportFileData = (req, res, callback) => {
        const promise = new Promise(function (resolve, reject) {
          let headers = [
            { header: 'Ts', key: 'ts', width: 32 },
            { header: 'Val', key: 'val', width: 32 },
          ];
          fileUpload.find()
              .then(function (data) {
                  res.append('fileName', 'FileData.xlsx');
                  let excelSheet = excelUtils.createExcelReport(null, 'File', headers, data, null);
                  return excelSheet.xlsx.write(res)
                    .then(function () {
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
    