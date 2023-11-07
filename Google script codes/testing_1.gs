var cse_cgpa = newSheetName2    ; 
var ece_cgpa = newSheetName3    ;
var dsai_cgpa = newSheetName4   ;
var cse_courses = newSheetName5 ;
var ece_courses = newSheetName6 ;
var dsai_courses = newSheetName7;

var timestamp_idx = 0; 
var regno_col_id = 1;   
var pref_st_idx = 2;

function getCourseCodeByRegNo(regNo) {
    for (var i = 1; i < all_branches_courses_data.length; i++) {
        var rowData = all_branches_courses_data[i];
        if (rowData[0] === regNo) {
            return rowData[1]; // Return the course code
        }
    }
    return []; 
}

function createDefaultListMap() {
    const map = new Map();

    // Define a function to return an empty list for unknown keys
    map.getOrDefault = function(key) {
        if (!this.has(key)) {
            this.set(key, []);
        }
        return this.get(key);
    };

    return map;
}


function hr()
{
  const coursesMap = get_map_courses();
  const regNoToSearch = '20bcs001';
  const courseCodes = coursesMap.getOrDefault(regNoToSearch);
  //Logger.log(courseCodes);
}

function tr()
{
   var t1 = get_map_cgpa() ;
   //Logger.log(t1.get('20bcs010'));
}



function generateRandomTimedelta() {
  var randomSeconds = Math.floor(Math.random() * 50) + 1; // Random seconds between 1 and 50
  return randomSeconds * 1000; // Convert seconds to milliseconds
}

function generateRandomTimestamp() {
  var randomMilliseconds = generateRandomTimedelta();
  var currentTimestamp = new Date().getTime();
  return new Date(currentTimestamp + randomMilliseconds);
}

function generateData() {
  var arr = [
    ['Introduction to Virtualization and Cloud Computing', 'Advanced Optimization Techniques', 'Advanced Computer Networks', 'Industry 4.0 : Trends in Industrial IoT and Computing'],
    ['Quantum Natural Language Processing', 'Advanced Speech and Natural Language Processing', 'Deep Learning', 'Deep Learning for Computer Vision'],
    ['Data Science Systems', 'Data Analytics For Healthcare', 'DevOps and Microservices'],
    ['Parallel Computing', 'Digital Image Processing', 'Digital Image Processing and its Applications']
  ];

  var branchName = 'CS';
  var students = 50;
  var resultArrays = [];

  for (var i = 0; i < students; i++) {
    var newArray = JSON.parse(JSON.stringify(arr)); // Deep copy the original array
    newArray.forEach(function (innerArray) {
      innerArray.sort(function () { return 0.5 - Math.random(); }); // Shuffle the inner arrays
    });
    resultArrays.push(newArray);
  }

  var values = [];
  for (var idx = 0; idx < resultArrays.length; idx++) {
    var randomTimestamp = generateRandomTimestamp();
    var studentId = '20b' + branchName + idx;

    var flattenedData = [];
    resultArrays[idx].forEach(function (innerArray) {
      flattenedData = flattenedData.concat(innerArray);
    });

    var rowData = [randomTimestamp, studentId].concat(flattenedData);
    values.push(rowData);
  }
  sheet_name='ght'
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(sheetName);

    if (sheet) {
      sheet.getRange(sheet.getLastRow() + 1, 1, values.length, values[0].length).setValues(values);
      //Logger.log('Data has been written to sheet: ' + sheetName);
    } else {
      //Logger.log('Sheet not found: ' + sheetName);
  }
}


function get_branch_responses1(sheet_name='Sheet41',branchSubj,branch_name,electiveCount=[4,4],result=[]){
  var mapi={'First':0,'Second':1,'Third':2,'Fourth':3}
  var {sheet,data} = get_sheet_by_data(sheet_name);
  start_time = new Date("07/07/2023 10:58:19")
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var timestamp = new Date(row[timestamp_idx]),timestampDifference=(timestamp-start_time)/1000;
    // var timestampDifference = Math.floor((row[timestamp_idx]-start_time)/1000000); //Calculate the time diff sometihing worng as in student datils giving same value
    var regNo = row[regno_col_id].split('@')[0];

    var cgpa = 10;     
    var idx=pref_st_idx;//preferance start index 
    var studentDetails = [];  //2D list containing student details, basketwise preferences list

    studentDetails.push([timestampDifference,cgpa,regNo,branch_name]); //each student array

    // Getting the course list for each basket
    for(var j=0;j<electiveCount.length;j++){
      var numCoursesInBasket = electiveCount[j];

      var basket = [];
      for (var h = 0; h < numCoursesInBasket; h++) {
        basket.push(null);}

      for(var k=0; k<numCoursesInBasket;k++){
        // subject=data[0][idx];
        subject=data[0][idx].split('[')[1].split(']')[0];
        
        //Logger.log(subject)
        subject=subject.toLowerCase()
        temp=data[i][idx].split(" ")[0]
        basket[mapi[temp]]=subject
        idx++;
      }
      studentDetails.push(basket);
    }
    
    result.push(studentDetails);//final array
  }
}

