function send_forms() {
  var sheet_name = "sheet1"; // Name of the template sheet
  var result = get_sheet_by_data(sheet_name);
 
  var sheet = result.sheet;
  var data = result.data;

  var email = data[0][1];
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Send an email to the granted email address
  var sheetUrl = spreadsheet.getUrl();
  var subject = "Access Granted to Google Sheets\n";
  var body = "Hello,\n\nYou've been granted editor access to the Google Sheets document. You can now edit the sheet.\n" + sheetUrl + "\n\nThank you!";
  body += "Thank you!";
  
  // Send the email
  GmailApp.sendEmail(email, subject, body,email);

  var cseName = data[3][0];
  cseSubjects= get_courses(6,1,'Courses') ;
  //Logger.log(cseSubjects);
  var eceName = data[3][4];
  eceSubjects= get_courses(6,5,'Courses') ;
  //Logger.log(eceSubjects);
  var dsaiName = data[3][8];
  dsaiSubjects=get_courses(6,9,'Courses') ;
  //Logger.log(dsaiSubjects);

  if(cseSubjects.length !== 0)
      createAndSendForm(email, cseSubjects,cseName);
  if(eceSubjects.length !== 0)
      createAndSendForm(email, eceSubjects,eceName);
  if(dsaiSubjects.length !== 0)
      createAndSendForm(email, dsaiSubjects,dsaiName);

  create_config();

}

function listToTitleCase(inputList) {
  var titleCaseList = [];
  
  for (var i = 0; i < inputList.length; i++) {
    var inputString = inputList[i];
    var titleCaseString = inputString.replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    });
    titleCaseList.push(titleCaseString);
  }
  
  return titleCaseList;
}

function createMCQ(form, subjectsList,basketNo) {
  var preferences = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];
  var numRows = subjectsList.length; // Adjust the number of rows based on subjects count

  var formattedPreferences = preferences.slice(0, numRows).map(function(pref) {
    return "Preference " + pref;
  });

  var item = form.addGridItem();
  item.setTitle("Basket "+ basketNo)
      .setRows(formattedPreferences)
      .setColumns(listToTitleCase(subjectsList))
      .setRequired(true);

  var gridValidation = FormApp.createGridValidation()
    .requireLimitOneResponsePerColumn()
    .build();
  item.setValidation(gridValidation);

}

function createAndSendForm(admin_email, Subjects_list,subjName) {
  //Logger.log(subjName);
  var formTitle = subjName + " Elective Preference Form";

  // Create the Google Form
  var form = FormApp.create(formTitle);

  // Add name question 
  var textQuestion = form.addTextItem();
  textQuestion.setTitle("Student Name:")
    .setRequired(true);

  // Add regno question
  var textQuestion = form.addTextItem();
  textQuestion.setTitle("Student Roll No.:")
    .setRequired(true);

  for (var i = 0; i < Subjects_list.length; i++) {
    createMCQ(form, Subjects_list[i],i+1);
  }
  form.setCollectEmail(true);

  // Share the Google Form with the group
  var formFile = DriveApp.getFileById(form.getId());
  formFile.addEditor(admin_email);
}

