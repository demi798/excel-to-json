/**
 * @author 
 * @date 
 * @description
 */

let xlsx = require('node-xlsx');
const fs = require('fs')
const path = require('path')

// 解析得到文档中的所有 sheet
let sheets = xlsx.parse(fs.readFileSync(path.join(__dirname, 'track.xlsx')));

// 遍历 sheet
sheets.forEach(function (sheet) {
  let obj = {};
  const sheetData = sheet['data'];
  // 遍历xlsx每行内容
  for (let rowId in sheetData) {
    let row = sheetData[rowId];
    console.log('row[1]: ', row[1]);
    if (`${row[0]}` !== 'eventId') {
      if (obj[row[1]]) {
        row[2] && (obj[row[1]][row[2]] = row[0]);
      } else {
        console.log('obj: ', obj);
        row[2] && (obj[row[1]] = {
          [row[2]]: row[0],
        });
      }
    }
  }
  fs.writeFile(`./${sheet.name}.json`, JSON.stringify(obj), res => {
    console.log('write success');
  })
});
