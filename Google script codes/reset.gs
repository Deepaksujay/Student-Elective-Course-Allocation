function reset() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var newSheetName = "Sheet1";
  var new_sheet = spreadsheet.getSheetByName(newSheetName);

  if (new_sheet) {
    // Here I am clearing the content of existing "new_sheet" and populate with data
    new_sheet.clear();
  } else {
    // Here I am creating a new sheet called "new_sheet"
    new_sheet = spreadsheet.insertSheet(newSheetName);
  }

  // Get all existing sheets
  var sheets = spreadsheet.getSheets();

  // Delete all sheets except the newly created one
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    if (sheet.getName() !== newSheetName) {
      spreadsheet.deleteSheet(sheet);
    }
  }

  var result_object = get_sheet_by_coordinates(newSheetName , 1 , 1 , 5 , 10);
  var result_object_data = result_object.data;
  var result_object_sheet = result_object.sheet;
  var result_object_dataRange = result_object.dataRange;
  var admin_email = Session.getActiveUser().getEmail();
  result_object_data[0][0] = "Administrator Mail: ";
  result_object_data[0][1] = admin_email ;

  var row_num1 = 4 ;
  
   var range1 = result_object_sheet.getRange(row_num1, 1, 1, 2);
   var range2 = result_object_sheet.getRange(row_num1 ,5 , 1 , 2);
   var range3 = result_object_sheet.getRange(row_num1 ,9 , 1 , 2);

   range1.merge();
   range2.merge();
   range3.merge();

   row_num1 = row_num1-1 ;

  result_object_data[row_num1][0] = "CSE" ;
  result_object_data[row_num1][4] = "ECE";
  result_object_data[row_num1][8] = "DSAI";

  result_object_dataRange.setHorizontalAlignment("center");

  result_object_data[row_num1+1][0] = "Baskets-Courses Input";
  result_object_data[row_num1+1][4] = "Baskets-Courses Input";
  result_object_data[row_num1+1][8] = "Baskets-Courses Input";
  result_object_data[row_num1+1][1] = "[]";
  result_object_data[row_num1+1][5] = "[]";
  result_object_data[row_num1+1][9] = "[]";

  write_data(result_object_sheet , result_object_data);
}


