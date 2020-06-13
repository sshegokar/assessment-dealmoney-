
const multer = require('multer')


/**
 *@description:upload profile picture of user in aws s3 using multer middleware  
 */
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./fileContainer");
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({
    storage: Storage
}).array("fileUploader", 3); //Field name and max count

loadFileAsBuffer = function (fileName, callback) {
    const promise = new Promise(function (resolve, reject) {
      let buffers = [];
      downloadStream('fileContainer', fileName)
        .on('data', (chunk) => {
          buffers.push(chunk);
        })
        .once('end', () => {
          return resolve(Buffer.concat(buffers));
        })
        .once('error', (err) => {
          return reject(err);
        });
    });

    if (callback !== null && typeof callback === 'function') {
      promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
    } else {
      return promise;
    }
  };

  createExcelReport= function (workbook, sheetName = 'Sheet 1', headers, records, options = { useStyles: true, useSharedStrings: true }) {
    workbook = workbook || new Excel.Workbook(options);
    let worksheet = workbook.addWorksheet(sheetName);
    worksheet.getRow(6).values = _.pluck(headers, 'header');
    worksheet.getRow(6).font = { bold: true };
    let i = 6 + 1; //start row
    _.each(records, function (record) {
      let rowData = [];
      _.each(headers, function (header) {
        rowData.push(record[header.key]);
      });
      worksheet.getRow(i).values = (rowData);
      i++;
    });
    _.each(headers, function (header, index) {
      if (header.width) {
        worksheet.getColumn(index + 1).width = 16;
      }
      if (header.style && header.style.numFmt) {
        worksheet.getColumn(index + 1).numFmt = header.style.numFmt;
      }
    });
    return workbook;
  },

module.exports = upload;