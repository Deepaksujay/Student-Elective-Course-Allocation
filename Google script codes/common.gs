function showAlert(message) {
  Browser.msgBox("Alert", message, Browser.Buttons.OK);
}

function get_sheet_by_coordinates(sheetName, x1, y1, x2, y2) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    throw sheet_name+" does not exist";
  }
  
  var dataRange = sheet.getRange(x1,y1,x2,y2);
  var data = dataRange.getValues();
  
  return {
    sheet: sheet,
    data: data,
    dataRange : dataRange,
  };
} 

function get_sheet_by_data(sheet_name) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheet_name);
  
  if (!sheet) {
    throw "Sheet: "+sheet_name+" does not exist";
  }
  
  var data = sheet.getDataRange().getValues();
  
  return {
    sheet: sheet,
    data: data
  };
}

function write_data(sheet,data,row_start=1,col_start=1){
   
  sheet.getRange(row_start,col_start, data.length, data[0].length).setValues(data);

}

function get_courses(row=6, col=1, word = 'Courses') {
  var sheet=get_sheet_by_data('Sheet1');
  var data=sheet.data;
  const resultArrays = [];
  let currentResultList = [];
  
  var list_string = data[row - 2][col];
  let list = JSON.parse(list_string);
  
  // not gettig the first error check
  for (let i = row; i < data.length; i++) {
    const cellValue = data[i][col];

    if (cellValue === word) {
      if (currentResultList.length > 0) {
        resultArrays.push(currentResultList);
        currentResultList = [];
      }
    } else if (cellValue !== "") {

      currentResultList.push(cellValue.toLowerCase());
    }
  }

  if (currentResultList.length > 0) {
    resultArrays.push(currentResultList);
  }

  // Count check
  if (resultArrays.length!=list.length){
    throw "No of baskets does not match";
  }
  
  for (let i = 0; i < resultArrays.length; i++) {
    const actualCount = resultArrays[i].length;
    const expectedCount = list[i];

    if (actualCount !== expectedCount) {
      throw new Error(`Course count mismatch in basket ${i + 1}. Expected: ${expectedCount}, Actual: ${actualCount}`);
    }
  }

   //Duplication check
  const flattenedArr = resultArrays.flat();
  const uniqueItems = new Set(flattenedArr);

  if (uniqueItems.size !== flattenedArr.length) {
    throw new Error(`Duplicate courses found in column no : ${col+1}`);
  }
  //Logger.log(resultArrays);
  return resultArrays;
}
