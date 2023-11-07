var branch_names_coordinates = [[6,1,'cse'],[6,5,'ece'],[6,9,'dsai']];
var timestamp_idx, regno_idx, pref_st_idx, start_time = new Date("07/07/2023 10:58:19");
var branch_form_name_map={ };

function hasOnlyUppercase(inputString) {
  // Use a regular expression to check if the string contains only uppercase letters and spaces
  return /^[A-Z\s]+$/.test(inputString);
}

function titleToNumber(columnTitle) {
  var result = 0;
  for (var i = 0; i < columnTitle.length; i++) {
    var char = columnTitle.charAt(i);
    var d = char.charCodeAt(0) - 'A'.charCodeAt(0) +1;
    result = result * 26 + d;
  }
  return result-1;
}

function get_config_sheet_details(sheet_name='Config_sheet', startRow=1, startColumn=4, numRows=3) {
  var {sheet,data} = get_sheet_by_data(sheet_name);
  var values=[];

  for(var i=startRow;i<startRow+numRows;i++){
    var subjName = data[i][startColumn].split(' ')[0];
    var formName = data[i][startColumn+2];

    branch_form_name_map[formName]=subjName;
    values.push(formName);
  }

  timestamp_idx=data[6][4];
  if(typeof timestamp_idx === 'string'){
    timestamp_idx=timestamp_idx.trim();
    if(!hasOnlyUppercase(timestamp_idx)){
      throw "Timestamp index is invalid. Please enter correctly in the config sheet"
    }
    timestamp_idx=titleToNumber(timestamp_idx);
  } 

  regno_idx=data[6][5];
  if(typeof regno_idx === 'string'){
    regno_idx=regno_idx.trim();
    if(!hasOnlyUppercase(regno_idx)){
      throw "Regno index is invalid. Please enter correctly in the config sheet"
    }
    regno_idx=titleToNumber(regno_idx);
  }

  pref_st_idx=data[6][6];
  if(typeof pref_st_idx === 'string'){
    pref_st_idx=pref_st_idx.trim();
    if(!hasOnlyUppercase(pref_st_idx)){
      throw "Preference Start index is invalid. Please enter correctly in the config sheet"
    }
    pref_st_idx=titleToNumber(pref_st_idx);
  }

  // Logger.log(timestamp_idx);
  // Logger.log(regno_idx);
  // Logger.log(pref_st_idx);

  if(timestamp_idx==='' || regno_idx==='' || pref_st_idx===''){
    throw "You need to fill Timestamp index, Reg no. index details and Preferences start index" ;
  }

  // Logger.log(values);
  return values;
}

function get_responses(){
  var formSheetNames = get_config_sheet_details("Config_sheet",1,4,3);
  // Logger.log(formSheetNames)
  var numBranches = branch_names_coordinates.length;
  // Logger.log(branch_names_coordinates.length)
  var result=[];
  // Logger.log(formSheetNames)  
  for(var b=0;b<numBranches;b++){
    var x=branch_names_coordinates[b][0],y=branch_names_coordinates[b][1];
    var branchSubjects= get_courses(x,y,'Courses') ;
    var branch_name=branch_names_coordinates[b][2];
    //Logger.log(branch_name)
    // Logger.log(branchSubjects)
    // if(branchSubjects.length === 0 && form){
    //   throw branch_name + " has no electives but form response sheet name given"
    // }
    var list = [];
    
    for(var i=0;i<branchSubjects.length;i++){
      list.push(branchSubjects[i].length);
      branchSubjects[i].sort();
    }
    if(formSheetNames[b] == '') {
      if(list.length == 0) continue;
      else{
        throw "Please fill form response sheet names of all branches" ;
      } 
    }
    get_branch_responses(formSheetNames[b],branchSubjects,list,result);
    // get_branch_responses1(formSheetNames[b],branchSubjects,branch_name,list,result);
  }

  //Logger.log(result);

  return result;
}

function get_map_courses() {
    const all_branches_courses_data = createDefaultListMap();

    function helper1(sheetName) {
        const returned_sheet = get_sheet_by_data(sheetName);
        const dataRange = returned_sheet.data;

        for (let i = 0; i < dataRange.length; i++) {
            if (i !== 0) {
                const row = dataRange[i];

                if (row.length === 2 && row[0] === 'Reg No' && row[1] === 'Course Code') {
                    continue;
                }

                if (row.every(cell => cell === "")) {
                    break;
                }

                const regNo = row[0].toLowerCase();
                const courseCode = row[1].toLowerCase();

                all_branches_courses_data.getOrDefault(regNo).push(courseCode);
            }
        }
    }

    const cseSubjects = get_courses(6, 1, 'Courses');
    const eceSubjects = get_courses(6, 5, 'Courses');
    const dsaiSubjects = get_courses(6, 9, 'Courses');

    if (cseSubjects.length !== 0) {
        helper1(cse_courses);
    }
    if (eceSubjects.length !== 0) {
        helper1(ece_courses);
    }
    if (dsaiSubjects.length !== 0) {
        helper1(dsai_courses);
    }

    return all_branches_courses_data;  //var courseCode = map_cources.getOrDefault(regNoToSearch);  
}

function get_map_cgpa() {
    var all_branches_cgpa_data = new Map();

    function helper2(sheetName) {
      // Logger.log(sheetName)
        var returned_sheet = get_sheet_by_data(sheetName);
        var dataRange = returned_sheet.data;

        for (var i = 2; i < dataRange.length; i++) {
            if (i !== 0) {
                var row = dataRange[i];

                if (row.length === 2 && row[0] === 'Reg No' && row[1] === 'CGPA') {
                    continue;
                }

                if (row.every(cell => cell === "")) {
                    break;
                }

                var regNo = row[0];
                var cgpa = parseFloat(row[1]);  // Assuming CGPA is a number

                var isNumeric = /^[0-9.]+$/.test(row[1]);

                if (isNumeric) {
                    var cgpa_float = parseFloat(cgpa);
                    all_branches_cgpa_data.set(regNo, cgpa);
                } 
                else {
                    throw "Invalid CGPA for registration number " + regNo + ' at row ' + (i + 1);
                    return ;
                }
            }
        }
    }

    let cseSubjects = get_courses(6, 1, 'Courses');
    let eceSubjects = get_courses(6, 5, 'Courses');
    let dsaiSubjects = get_courses(6, 9, 'Courses');

    if (cseSubjects.length !== 0) {
        helper2(cse_cgpa);
    }
    if (eceSubjects.length !== 0) {
        helper2(ece_cgpa);
    }
    if (dsaiSubjects.length !== 0) {
        helper2(dsai_cgpa);
    }

    return all_branches_cgpa_data;
}

function get_branch_responses(sheet_name,branchSubjects,electiveCount,result){
  var {sheet,data} = get_sheet_by_data(sheet_name);
 
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (regno_idx < 0 || regno_idx >= row.length) {
      throw "Enter a valid value in config sheet for Reg no index";
    }
    if (timestamp_idx < 0 || timestamp_idx >= row.length) {
      throw "Enter a valid value in config sheet for Timestamp index";
    }
    if (pref_st_idx < 0 || pref_st_idx >= row.length) {
      throw "Enter a valid value in config sheet for Preferences start index";
    }
    var map_cgpa=get_map_cgpa();
    var timestamp = new Date(row[timestamp_idx]),time_diff=(timestamp-start_time)/1000;
     var regNo=(typeof regno_idx === 'string')?sheet.getRange(regno_idx+i).getValue().toLowerCase():row[regno_idx].toLowerCase();
    // var regNo = row[regno_idx]
    var cgpa = map_cgpa.get(regNo);
    // Logger.log(regNo);
    if(cgpa == null){
      throw regNo + "'s CGPA is missing. Please fill it";
    }
    var idx=pref_st_idx;
    var branch_name = branch_form_name_map[sheet_name];

    var studentDetails = [],temp_studentDetails=[];  //2D list containing student details, basketwise preferences list

    studentDetails.push([time_diff,cgpa,regNo,branch_name]); 

    for(var j=0;j<electiveCount.length;j++){
      var basket = [],temp_basket=[];
      var numCoursesInBasket = electiveCount[j];

      for(var k=0; k<numCoursesInBasket;k++){
        if (idx >= row.length) {
          throw "Enter a valid value in config sheet for Preferences start index";
        }
        basket.push(data[i][idx].toLowerCase());
        temp_basket.push(data[i][idx].toLowerCase());
        // Logger.log(basket)
        // Logger.log(temp_basket)
        // Logger.log("here")
        idx++;
      }
      studentDetails.push(basket);

      temp_basket.sort();
      // Logger.log(basket)
      // Logger.log(temp_basket)
      temp_studentDetails.push(temp_basket);

      if(JSON.stringify(branchSubjects[j]) !== JSON.stringify(temp_studentDetails[j])){
        // Logger.log(branchSubjects)
        // Logger.log(temp_studentDetails)

        throw "There is a mismatch in courses in template and response";
      }
    }
    result.push(studentDetails);
  }

  //Logger.log(result);
  
}

function get_map_electives_count(sheet_name = "Config_sheet") {
  var sheet = get_sheet_by_data(sheet_name);
  var data = sheet.data;

  var courseMap = {};

  for (var i = 2; i < data.length; i++) {
    var course = data[i][0];
    course = course.toString().toLowerCase();
    var numSeats = data[i][1];

    if (!course && !numSeats){
      break
    }

    if (!course || !numSeats) {
      throw new Error("Both course name and No. of Seats must be Filled");
    }

    if (!Number.isInteger(numSeats)) {
      throw new Error("Number of Seats must be an integer.");
    }
    


    courseMap[course] = numSeats;
  }

  return courseMap;
}

function get_map_electives_requisites(sheet_name = "Config_sheet") {
  var reqMap = {};

  var sheet = get_sheet_by_data(sheet_name);
  var data = sheet.data;

  for (var i = 2; i < data.length; i++) {
    var course = data[i][0];
    course = course.toString().toLowerCase();
    var requisites = data[i][2];
    if (!course && !requisites){
        break
      }

    if (!course || !requisites) {
        throw new Error("Both course name and Requesites must be Filled");
      }
    try {
      requisites = requisites.replace(/([a-zA-Z0-9_]+)/g, '"$1"');
      var requisites_list = JSON.parse(requisites);
    } catch (error) {
      throw new Error("Requisites data must be in the form of an array.");
    }
    
    reqMap[course] = requisites_list;
  }
  return reqMap;
}

function get_preference_list(sheet_name = 'Config_sheet') {
  var sheet = get_sheet_by_data(sheet_name);
  var data = sheet.data;
  var preferenceCell = data[9][4];
  if (preferenceCell!='[0,1]' && preferenceCell!='[1,0]'){
    throw new Error("Preference data must be either [1, 0] or [0, 1].");
  }
  var sorting_preference = JSON.parse(preferenceCell);

  return sorting_preference;
}


function start_allocation(){
    
    const preferences = get_preference_list();
    const responses = get_responses();
    let electives_count = get_map_electives_count();
    let electives_pre_req = get_map_electives_requisites();
    const map_courses = get_map_courses();
    
    function custom_sort_time(a,b){
        if (a[0][0]==b[0][0]){
            return b[0][1]-a[0][1];
        }
        return a[0][0]-b[0][0];
    }
    
    function custom_sort_cgpa(a,b){
        if (a[0][1]==b[0][1]){
            return a[0][0]-b[0][0];
        }
        return b[0][1]-a[0][1];
    }

    // Sorting of the responses based on the preference
    responses.sort(preferences[0]===0?custom_sort_time:custom_sort_cgpa);

    function can_allocate(reg_no,course_name){
        if (electives_count[course_name]==0) return false;
        
        //Logger.log(course_name)
        //Logger.log( course_name in electives_pre_req);
        let pre_req = electives_pre_req[course_name];
        let electives = map_courses.getOrDefault(reg_no);

        // Check if all elements in pre_req are also in electives
        if (pre_req==null){
          throw new Error("Pre-requisites of course: "+course_name+" were not found in config sheet.")}
        return pre_req.every(element => electives.includes(element)); 
    }

    var allocations = [];

    // For each response in sorted array
    for (let i=0;i<responses.length;i++){
        let reg_no = responses[i][0][2];
        let temp=[reg_no,responses[i][0][3]];
       
        
        for (let j=1;j<responses[i].length;j++){
            // for each preference;
            // Logger.log(responses[i]);
            let allocation = false;
            for (let k=0;k<responses[i][j].length;k++){
                if (can_allocate(reg_no,responses[i][j][k])){
                    // Allocate the course
                    // break the for loop 
                    // write code below
                    temp.push(responses[i][j][k]);
                    electives_count[responses[i][j][k]]--;
                    allocation = true;
                    // Logger.log('3');
                    break;
                }            
            }
            //Logger.log('4');
            if (allocation==false){
                //pop an error to increase the course seats
                throw "Insufficient seats for basket no: "+j+" for branch "+responses[i][0][3];
                return;
            }
        } 
        let debug_statement =`${responses[i][0][0]} ${responses[i][0][1]} ${temp[0]}`;
        for (let j=2;j<temp.length;j++){
          debug_statement = debug_statement + ` ${temp[j]}:${electives_count[temp[j]]} [${electives_pre_req[temp[j]]}](pre_req):[${map_courses.getOrDefault(reg_no)}]`;
        }

        Logger.log(debug_statement);
      //  Logger.log(temp);
        allocations.push(temp);
    }
    //Logger.log(88);
    //Logger.log(allocations);
    organize_data_by_branch(allocations);
    //Logger.log(allocations);
    //showAlert('Allocation is Done. Look at the new sheets created!');

}

function create_new_sheet(name_of_sheet)
{
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var newSheetName = name_of_sheet;
  var new_sheet = spreadsheet.getSheetByName(newSheetName);

  if (new_sheet) {
    new_sheet.clear();
    return new_sheet;
  } else {
    new_sheet = spreadsheet.insertSheet(newSheetName);
    return new_sheet ;
  }
}

function organize_data_by_branch(data) {

  //Logger.log("the data");
  //Logger.log(data);

  var cseData = [];
  var eceData = [];
  var dsaiData = [];

  const cseSubjects_od = get_courses(6, 1, 'Courses');
  const eceSubjects_od = get_courses(6, 5, 'Courses');
  const dsaiSubjects_od = get_courses(6, 9, 'Courses');
  
  if(cseSubjects_od.length !== 0)
  {
    var cseSheet  = create_new_sheet("CSE Data");
  }

  if(eceSubjects_od.length !== 0)
  {
    var eceSheet  = create_new_sheet("ECE Data");
  }
  
  if(dsaiSubjects_od.length !== 0)
  {
    var dsaiSheet = create_new_sheet("DSAI Data");
  }

  for (var i = 0; i < data.length; i++) {
    var regNo = data[i][0].toLowerCase();
    var branch = data[i][1].toLowerCase();
    var values = data[i].slice(2).map(value => value.toLowerCase());  // Extract "aaa", "bbb", "ccc"

    if (branch === "cse") {
      cseData.push([regNo].concat(values));
    } else if (branch === "ece") {
      eceData.push([regNo].concat(values));
    } else if (branch === "dsai") {
      dsaiData.push([regNo].concat(values));
    }
  }

  if(cseSubjects_od.length !== 0)
  {
    var cse_headings = [];
    var final_cse = [];
    cse_headings.push("Registration Number");

    for (var i = 0; i < cseData[0].length-1; i++) {
      var basketElement = "Basket-" + (i+1);
      cse_headings.push(basketElement);
    }

    final_cse.push(cse_headings);

    for(var i = 0 ; i < cseData.length ; i++)
    {
        final_cse.push(cseData[i]);
    }
    
    write_data(cseSheet , final_cse);
  }
  
  if(eceSubjects_od.length !== 0)
  {

    var ece_headings = [];
    var final_ece = [];
    ece_headings.push("Registration Number");

    for (var i = 0; i < eceData[0].length-1; i++) {
      var basketElement = "Basket-" + (i+1);
      ece_headings.push(basketElement);
    }

    final_ece.push(ece_headings);

    for(var i = 0 ; i < eceData.length ; i++)
    {
        final_ece.push(eceData[i]);
    }

    write_data(eceSheet , final_ece);
  }

  if(dsaiSubjects_od.length !== 0)
  {

    var dsai_headings = [];
    var final_dsai = [];
    dsai_headings.push("Registration Number");

    for (var i = 0; i < dsaiData[0].length-1; i++) {
      var basketElement = "Basket-" + (i+1);
      dsai_headings.push(basketElement);
    }

    final_dsai.push(dsai_headings);

    for(var i = 0 ; i < dsaiData.length ; i++)
    {
        final_dsai.push(dsaiData[i]);
    }

    write_data(dsaiSheet , final_dsai);
  } 

}





