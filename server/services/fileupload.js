
const _ = require('underscore')
const Excel = require('exceljs');
const XLSX = require('xlsx');


  exports.createExcelReport= function (workbook, sheetName = 'Sheet 1', headers, records, options = { useStyles: true, useSharedStrings: true }) {
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
  }

