  var newSheetName1 = "Config_sheet"   ;
  var newSheetName2 = "CSE cgpa sheet" ;
  var newSheetName3 = "ECE cgpa sheet" ;
  var newSheetName4 = "DSAI cgpa sheet";
  var newSheetName5 = "CSE Course sheet" ;
  var newSheetName6 = "ECE Course sheet" ;
  var newSheetName7 = "DSAI Course sheet";


function check_if_sheet_exists(new_sheet_par , newSheetName_par , spreadsheet_par){
  if (new_sheet_par) {
    new_sheet_par.clear();
  } else {
    new_sheet_par = spreadsheet_par.insertSheet(newSheetName_par);
  }
}

function create_config(){
  var spreadsheet1 = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet1.getSheets();

  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() !== "Sheet1") {
      spreadsheet1.deleteSheet(sheets[i]);
    }
  }
   
  var new_sheet2 =  spreadsheet1.getSheetByName(newSheetName2); 
  var new_sheet1 =  spreadsheet1.getSheetByName(newSheetName1);  
  var new_sheet3 =  spreadsheet1.getSheetByName(newSheetName3); 
  var new_sheet4 =  spreadsheet1.getSheetByName(newSheetName4); 
  var new_sheet5 =  spreadsheet1.getSheetByName(newSheetName5); 
  var new_sheet6 =  spreadsheet1.getSheetByName(newSheetName6); 
  var new_sheet7 =  spreadsheet1.getSheetByName(newSheetName7); 

    check_if_sheet_exists(new_sheet1 , newSheetName1 ,spreadsheet1);

    let cseSubjects= get_courses(6,1,'Courses') ;
    let eceSubjects= get_courses(6,5,'Courses') ;
    let dsaiSubjects=get_courses(6,9,'Courses') ;

    var combined_array= cseSubjects.concat(eceSubjects,dsaiSubjects)
    var unique_array = Array.from(new Set(combined_array.flat()));
    
    Logger.log("unique array");
    Logger.log(unique_array);

  var result_object1 = get_sheet_by_coordinates(newSheetName1 , 1 , 1 , 50 , 15);
  var result_object_sheet1 = result_object1.sheet;
  var result_object_data1 = result_object1.data;

  let cgpa_row = 1;
  let course_code_row = 1 ;
  const side_header_col = 4;
  const courses_row_header=1;

  if(cseSubjects.length != 0)
  {
      check_if_sheet_exists(new_sheet2 , newSheetName2 ,spreadsheet1);
      check_if_sheet_exists(new_sheet5 , newSheetName5 ,spreadsheet1);

      var result_object2 = get_sheet_by_coordinates(newSheetName2 , 1 , 1 , 20 , 30);
      var result_object_sheet2 = result_object2.sheet;
      var result_object_data2 = result_object2.data;

      var result_object5 = get_sheet_by_coordinates(newSheetName5 , 1 , 1 , 20 , 30);
      var result_object_sheet5 = result_object5.sheet;
      var result_object_data5 = result_object5.data;

      result_object_data2[cgpa_row][0] = "Reg No";
      result_object_data2[cgpa_row][1] = "CGPA" ;

      result_object_data5[course_code_row][0] = "Reg No";
      result_object_data5[course_code_row][1] = "Course Code";
      
      write_data(result_object_sheet2 , result_object_data2);
      write_data(result_object_sheet5 , result_object_data5);

      result_object_data1[1][side_header_col] = "CSE Form response sheet name";
  }

  if(eceSubjects.length != 0)
  {
      check_if_sheet_exists(new_sheet3 , newSheetName3 ,spreadsheet1);
      check_if_sheet_exists(new_sheet6 , newSheetName6 ,spreadsheet1);

      var result_object3 = get_sheet_by_coordinates(newSheetName3 , 1 , 1 , 20 , 30);
      var result_object_sheet3 = result_object3.sheet;
      var result_object_data3 = result_object3.data;

      var result_object6 = get_sheet_by_coordinates(newSheetName6 , 1 , 1 , 20 , 30);
      var result_object_sheet6 = result_object6.sheet;
      var result_object_data6 = result_object6.data;

      result_object_data3[cgpa_row][0] = "Reg No";
      result_object_data3[cgpa_row][1] = "CGPA" ;
    
    
      result_object_data6[course_code_row][0] = "Reg No";
      result_object_data6[course_code_row][1] = "Course Code";

      write_data(result_object_sheet3 , result_object_data3);
      write_data(result_object_sheet6 , result_object_data6);

      result_object_data1[2][side_header_col] = "ECE Form response sheet name";

  }

  if(dsaiSubjects.length != 0)
  {
      check_if_sheet_exists(new_sheet4 , newSheetName4 ,spreadsheet1);
      check_if_sheet_exists(new_sheet7 , newSheetName7 ,spreadsheet1);

      var result_object4 = get_sheet_by_coordinates(newSheetName4 , 1 , 1 , 20 , 30);
      var result_object_sheet4 = result_object4.sheet;
      var result_object_data4 = result_object4.data;

      var result_object7 = get_sheet_by_coordinates(newSheetName7 , 1 , 1 , 20 , 30);
      var result_object_sheet7 = result_object7.sheet;
      var result_object_data7 = result_object7.data;

      result_object_data4[cgpa_row][0] = "Reg No";
      result_object_data4[cgpa_row][1] = "CGPA" ;

      result_object_data7[course_code_row][0] = "Reg No";
      result_object_data7[course_code_row][1] = "Course Code";

      write_data(result_object_sheet4 , result_object_data4);
      write_data(result_object_sheet7 , result_object_data7);

      result_object_data1[3][side_header_col] = "DSAI Form response sheet name";
  }

 

  result_object_data1[courses_row_header][0] = "Elective Name";
  result_object_data1[courses_row_header][1] = "No of seats";
  result_object_data1[courses_row_header][2] = "Pre-requisites";


  const pref_row_headers = 8;
  const row_time_reg_index = 5 ;

  result_object_data1[row_time_reg_index][4] = "Time Stamp Index";
  result_object_data1[row_time_reg_index][5] = "RegNo Index" ;
  result_object_data1[row_time_reg_index][6] = "Preferences Starting Index" ;

  result_object_data1[row_time_reg_index+1][4] = "A" ;

  result_object_data1[pref_row_headers][4] = "preferences";
  result_object_data1[pref_row_headers][5] = "pref name" ;
  result_object_data1[pref_row_headers+1][5] = "pref code" ;
  result_object_data1[pref_row_headers][6] = "FCFS" ;
  result_object_data1[pref_row_headers+1][6] = "0" ;
  result_object_data1[pref_row_headers][7] = "CGPA" ;
  result_object_data1[pref_row_headers+1][7] = "1" ;
  result_object_data1[pref_row_headers+1][4] = "[0,1]";
 

  for(let i=0; i< unique_array.length; i++)
  {
    result_object_data1[i+2][0]=unique_array[i];
    result_object_data1[i+2][2]=`[]`;
  }

  write_data(result_object_sheet1 , result_object_data1);

}















