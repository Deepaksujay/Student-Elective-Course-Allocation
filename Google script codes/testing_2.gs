function generateRandomTimedelta() {
  var randomSeconds = Math.floor(Math.random() * 50) + 1; // Random seconds between 1 and 50
  return randomSeconds * 1000; // Convert seconds to milliseconds
}

function generateRandomTimestamp() {
  var randomMilliseconds = generateRandomTimedelta();
  var currentTimestamp = new Date().getTime();
  return new Date(currentTimestamp + randomMilliseconds);
}

function generateData(sheetName='DS',students=5) {
  var sub = {
    'CS' : 1,
    'EC' : 5,
    'DS' : 9
  }
  var arr = get_courses(6,sub[sheetName]);

  var branchName = sheetName;
  var resultArrays = [];

  for (var i = 0; i < students; i++) {
    var newArray = JSON.parse(JSON.stringify(arr)); // Deep copy the original array
    newArray.forEach(function (innerArray) {
      innerArray.sort(function () { return 0.5 - Math.random(); }); // Shuffle the inner arrays
    });
    resultArrays.push(newArray);
  }

  var values = [];
  for (var idx = 1; idx <= resultArrays.length; idx++) {
    var randomTimestamp = generateRandomTimestamp();
    var idxx = '000'+idx;
    var studentId = '20b' + branchName.toLowerCase() + idxx.slice(-3);

    var flattenedData = [];
    resultArrays[idx-1].forEach(function (innerArray) {
      flattenedData = flattenedData.concat(innerArray);
    });

    var rowData = [randomTimestamp, studentId].concat(flattenedData);
    values.push(rowData);
  }
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = create_new_sheet(sheetName);

    if (sheet) {
      //sheet.getRange(sheet.getLastRow() + 1, 1, values.length, values[1].length).setValues(values);
      write_data(sheet,values,2,1);
      //Logger.log('Data has been written to sheet: ' + sheetName);
    } else {
      //Logger.log('Sheet not found: ' + sheetName);
  }
}

function main(){
  var students = 5;
  var arr = ['CS','EC','DS'];
  for (i=0;i<arr.length;i++){
    generateData(arr[i],students);
  }
}

function test_sheet(){

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = 'CSE cgpa sheet'; 
    var sheetName2 = "ECE cgpa sheet" ;
    var sheetName3 = "DSAI cgpa sheet";
    var sheetName4 = "CSE Course Sheet" ;
    var sheetName5 = "ECE Course Sheet";
    var sheetName6 = "DSAI Course Sheet";

    var sheet = spreadsheet.getSheetByName(sheetName);
    if (sheet)
    {
        var datacsecgpa = [
            ["Reg No" , "CGPA"],
            ["20bcs001", 7.1],
            ["20bcs002", 7.2],
            ["20bcs003", 7.3],
            ["20bcs004", 7.3],
            ["20bcs005", 7.3],
            ["20bcs006", 7.4],
            ["20bcs007", 7.4],
            ["20bcs008", 7.4],
            ["20bcs009", 7.4],
            ["20bcs010", 7.4],
            ["20bcs011", 8.3],
            ["20bcs012", 8.3],
            ["20bcs013", 8.3],
            ["20bcs014", 8.3],
            ["20bcs015", 6.7],
            ["20bcs016", 6.9],
            ["20bcs017", 9.6],
            ["20bcs018", 6.9],
            ["20bcs019", 6.9],
            ["20bcs020", 6.9],
            ["20bcs021", 6.9],
            ["20bcs022", 6.9],
            ["20bcs023", 6.9],
            ["20bcs024", 6.9],
            ["20bcs025", 6.9],
            ["20bcs026", 6.9],
            ["20bcs027", 6.9],
            ["20bcs028", 6.9],
            ["20bcs029", 6.9],
            ["20bcs030", 6.9],
            ["20bcs031", 6.9],
            ["20bcs032", 6.9],
            ["20bcs033", 6.9],
            ["20bcs034", 6.9],
            ["20bcs035", 6.9],
            ["20bcs036", 6.9],
            ["20bcs037", 6.9],
            ["20bcs038", 6.9],
            ["20bcs039", 6.9],
            ["20bcs040", 6.9],
            ["20bcs041", 6.9],
            ["20bcs042", 6.9],
            ["20bcs043", 6.9],
            ["20bcs044", 6.9],
            ["20bcs045", 6.9],
            ["20bcs046", 6.9],
            ["20bcs047", 6.9],
            ["20bcs048", 6.9],
            ["20bcs049", 6.9],
            ["20bcs050", 6.9],
            ["20bcs051", 6.9],
            ["20bcs052", 6.9],
            ["20bcs053", 6.9],
            ["20bcs054", 6.9],
            ["20bcs055", 6.9],
            ["20bcs056", 6.9],
            ["20bcs057", 6.9],
            ["20bcs058", 6.9],
            ["20bcs059", 6.9],
            ["20bcs060", 6.9],
            ["20bcs061", 6.9],
            ["20bcs062", 6.9],
            ["20bcs063", 6.9],
            ["20bcs064", 6.9],
            ["20bcs065", 6.9],
            ["20bcs066", 6.9],
            ["20bcs067", 6.9],
            ["20bcs068", 6.9],
            ["20bcs069", 6.9],
            ["20bcs070", 6.9],
            ["20bcs071", 6.9],
            ["20bcs072", 6.9]
        ];


        sheet.clear();

        for (var i = 0; i < datacsecgpa.length; i++) {
          sheet.getRange(i + 2, 1, 1, 2).setValues([datacsecgpa[i]]);
        }

        
        
    }
    
    var sheet2 = spreadsheet.getSheetByName(sheetName2);
    if (sheet2){
          var dataececgpa = [
              ["Reg No" , "CGPA"],
              ["20bec001", 7.1],
              ["20bec002", 7.2],
              ["20bec003", 7.3],
              ["20bec004", 7.3],
              ["20bec005", 7.3],
              ["20bec006", 7.4],
              ["20bec007", 7.4],
              ["20bec008", 7.4],
              ["20bec009", 7.4],
              ["20bec010", 7.4],
              ["20bec011", 8.3],
              ["20bec012", 8.3],
              ["20bec013", 8.3],
              ["20bec014", 8.3],
              ["20bec015", 8.3],
              ["20bec016", 8.3],
              ["20bec017", 8.3],
              ["20bec018", 8.3],
              ["20bec019", 6.8],
              ["20bec020", 6.8],
              ["20bec021", 6.8],
              ["20bec022", 6.8],
              ["20bec023", 6.8],
              ["20bec024", 6.8],
              ["20bec025", 6.8],
              ["20bec026", 6.8],
              ["20bec027", 6.8],
              ["20bec028", 6.8],
              ["20bec029", 6.8],
              ["20bec030", 9.1],
              ["20bec031", 9.1],
              ["20bec032", 9.1],
              ["20bec033", 9.1],
              ["20bec034", 9.1],
              ["20bec035", 9.1],
              ["20bec036", 9.1],
              ["20bec037", 9.1],
              ["20bec038", 9.1],
              ["20bec039", 9.1],
              ["20bec040", 9.1],
              ["20bec041", 9.1],
              ["20bec042", 9.1],
              ["20bec043", 9.1],
              ["20bec044", 9.1],
              ["20bec045", 9.1],
              ["20bec046", 9.1],
              ["20bec047", 9.1],
              ["20bec048", 9.1],
              ["20bec049", 9.1],
              ["20bec050", 9.1],
              ["20bec051", 9.1],
              ["20bec052", 9.1],
              ["20bec053", 9.1],
              ["20bec054", 9.1],
              ["20bec055", 9.1],
              ["20bec056", 9.1],
              ["20bec057", 9.1],
              ["20bec058", 9.1],
              ["20bec059", 9.1],
              ["20bec060", 9.1],
              ["20bec061", 9.1],
              ["20bec062", 9.1],
              ["20bec063", 9.1],
              ["20bec064", 9.1],
              ["20bec065", 9.1],
              ["20bec066", 9.1],
              ["20bec067", 9.1],
              ["20bec068", 9.1],
              ["20bec069", 9.1],
              ["20bec070", 9.1]
          ];

           sheet2.clear();

        for (var i = 0; i < dataececgpa.length; i++) {
          sheet2.getRange(i + 2, 1, 1, 2).setValues([dataececgpa[i]]);
        }

    }

    var sheet3 = spreadsheet.getSheetByName(sheetName3);

    if (sheet3){

      var datadsaicgpa = [
              ["Reg no" , "CGPA"],
              ["20bds001", 7.1],
              ["20bds002", 7.2],
              ["20bds003", 7.3],
              ["20bds004", 7.3],
              ["20bds005", 7.3],
              ["20bds006", 7.4],
              ["20bds007", 7.4],
              ["20bds008", 7.4],
              ["20bds009", 7.4],
              ["20bds010", 7.4],
              ["20bds011", 8.3],
              ["20bds012", 8.3],
              ["20bds013", 8.3],
              ["20bds014", 8.3],
              ["20bds015", 6.7],
              ["20bds016", 6.9],
              ["20bds017", 9.6],
              ["20bds018", 6.9],
              ["20bds019", 7.8],
              ["20bds020", 7.8],
              ["20bds021", 7.8],
              ["20bds022", 7.2],
              ["20bds023", 9.3],
              ["20bds024", 9.3],
              ["20bds025", 9.3],
              ["20bds026", 9.3],
              ["20bds027", 9.3],
              ["20bds028", 9.3],
              ["20bds029", 9.3],
              ["20bds030", 9.3],
              ["20bds031", 9.3],
              ["20bds032", 9.3],
              ["20bds033", 9.3],
              ["20bds034", 9.3],
              ["20bds035", 9.3],
              ["20bds036", 9.3],
              ["20bds037", 9.3],
              ["20bds038", 9.3],
              ["20bds039", 9.3],
              ["20bds040", 9.3],
              ["20bds041", 9.3],
              ["20bds042", 9.3],
              ["20bds043", 9.3],
              ["20bds044", 9.3],
              ["20bds045", 9.3],
              ["20bds046", 9.3],
              ["20bds047", 9.3],
              ["20bds048", 9.3],
              ["20bds049", 9.3],
              ["20bds050", 9.3],
              ["20bds051", 9.3],
              ["20bds052", 9.3],
              ["20bds053", 9.3],
              ["20bds054", 9.3],
              ["20bds055", 9.3],
              ["20bds056", 9.3],
              ["20bds057", 9.3],
              ["20bds058", 9.3],
              ["20bds059", 9.3],
              ["20bds060", 9.3],
              ["20bds061", 9.3],
              ["20bds062", 9.3],
              ["20bds063", 9.3],
              ["20bds064", 9.3],
              ["20bds065", 9.3],
              ["20bds066", 9.3],
              ["20bds067", 9.3],
              ["20bds068", 9.3],
              ["20bds069", 9.3],
              ["20bds070", 7.8],
              ["20bds071", 7.8],
              ["20bds072", 7.8],
              ["20bds073", 7.8],
              ["20bds074", 7.8],
              ["20bds075", 7.8],
              ["20bds076", 7.8],
              ["20bds077", 7.8],
              ["20bds078", 7.8],
              ["20bds079", 7.8],
              ["20bds080", 7.8],
              ["20bds081", 7.8],
              ["20bds082", 7.8],
              ["20bds083", 7.8],
              ["20bds084", 7.8],
              ["20bds085", 8.8],
              ["20bds086", 8.8],
              ["20bds087", 8.8],
              ["20bds088", 8.8],
              ["20bds089", 8.8],
              ["20bds090", 8.8],
              ["20bds091", 8.8],
              ["20bds092", 8.8],
              ["20bds093", 8.8],
              ["20bds094", 8.8],
              ["20bds095", 8.8],
              ["20bds096", 8.8],
              ["20bds097", 8.8],
              ["20bds098", 7.9],
              ["20bds099", 7.9],
              ["20bds100", 7.9],
              ["20bds101", 7.9],
              ["20bds102", 7.9],
              ["20bds103", 7.9],
              ["20bds104", 7.9],
              ["20bds105", 7.9],
              ["20bds106", 7.9],
              ["20bds107", 7.9],
              ["20bds108", 7.9],
              ["20bds109", 7.9],
              ["20bds110", 7.9],
              ["20bds111", 7.9],
              ["20bds112", 7.9],
              ["20bds113", 7.9],
              ["20bds114", 7.9],
              ["20bds115", 7.9],
              ["20bds116", 7.9],
              ["20bds117", 7.9],
              ["20bds118", 7.9],
              ["20bds119", 7.9],
              ["20bds120", 7.9],
          ]

          sheet3.clear();

          
        for (var i = 0; i < datadsaicgpa.length; i++) {
          sheet3.getRange(i + 2, 1, 1, 2).setValues([datadsaicgpa[i]]);
        }
    }

    var sheet4 = spreadsheet.getSheetByName(sheetName4);

    if(sheet4){

        var datacsecourses = [
           ["Reg no" , "Course Code"],
    ["20bcs001", "xyz001"],
    ["20bcs002", "xyz002"],
    ["20bcs003", "xyz003"],
    ["20bcs004", "xyz004"],
    ["20bcs005", "xyz005"],
    ["20bcs006", "xyz006"],
    ["20bcs007", "xyz007"],
    ["20bcs008", "xyz008"],
    ["20bcs009", "xyz009"],
    ["20bcs010", "xyz010"],
    ["20bcs011", "xyz011"],
    ["20bcs012", "xyz012"],
    ["20bcs013", "xyz013"],
    ["20bcs014", "xyz014"],
    ["20bcs015", "xyz015"],
    ["20bcs016", "xyz016"],
    ["20bcs017", "xyz017"],
    ["20bcs018", "xyz018"],
    ["20bcs019", "xyz019"],
    ["20bcs020", "xyz020"],
    ["20bcs021", "xyz021"],
    ["20bcs022", "xyz022"],
    ["20bcs023", "xyz023"],
    ["20bcs024", "xyz024"],
    ["20bcs025", "xyz025"],
    ["20bcs026", "xyz026"],
    ["20bcs027", "xyz027"],
    ["20bcs028", "xyz028"],
    ["20bcs029", "xyz029"],
    ["20bcs030", "xyz030"],
    ["20bcs031", "xyz031"],
    ["20bcs032", "xyz032"],
    ["20bcs033", "xyz033"],
    ["20bcs034", "xyz034"],
    ["20bcs035", "xyz035"],
    ["20bcs036", "xyz036"],
    ["20bcs037", "xyz037"],
    ["20bcs038", "xyz038"],
    ["20bcs039", "xyz039"],
    ["20bcs040", "xyz040"],
    ["20bcs041", "xyz041"],
    ["20bcs042", "xyz042"],
    ["20bcs043", "xyz043"],
    ["20bcs044", "xyz044"],
    ["20bcs045", "xyz045"],
    ["20bcs046", "xyz046"],
    ["20bcs047", "xyz047"],
    ["20bcs048", "xyz048"],
    ["20bcs049", "xyz049"],
    ["20bcs050", "xyz050"],
    ["20bcs051", "xyz051"],
    ["20bcs052", "xyz052"],
    ["20bcs053", "xyz053"],
    ["20bcs054", "xyz054"],
    ["20bcs055", "xyz055"],
    ["20bcs056", "xyz056"],
    ["20bcs057", "xyz057"],
    ["20bcs058", "xyz058"],
    ["20bcs059", "xyz059"],
    ["20bcs060", "xyz060"],
    ["20bcs061", "xyz061"],
    ["20bcs062", "xyz062"],
    ["20bcs063", "xyz063"],
    ["20bcs064", "xyz064"],
    ["20bcs065", "xyz065"],
    ["20bcs066", "xyz066"],
    ["20bcs067", "xyz067"],
    ["20bcs068", "xyz068"],
    ["20bcs069", "xyz069"],
    ["20bcs070", "xyz070"],
    ["20bcs071", "xyz071"],
    ["20bcs072", "xyz072"]
];

        sheet4.clear();
        for (var i = 0; i < datacsecourses.length; i++) {
          sheet4.getRange(i + 2, 1, 1, 2).setValues([datacsecourses[i]]);
        }
    }

    var sheet5 = spreadsheet.getSheetByName(sheetName5);

    if(sheet5){

        var dataececourses = [
          ["Reg no" , "Course Code"],
        ["20bec001", "qqqwqwq001"],
        ["20bec002", "qqqwqwq002"],
        ["20bec003", "qqqwqwq003"],
        ["20bec004", "qqqwqwq004"],
        ["20bec005", "qqqwqwq005"],
        ["20bec006", "qqqwqwq006"],
        ["20bec007", "qqqwqwq007"],
        ["20bec008", "qqqwqwq008"],
        ["20bec009", "qqqwqwq009"],
        ["20bec010", "qqqwqwq010"],
        ["20bec011", "qqqwqwq011"],
        ["20bec012", "qqqwqwq012"],
        ["20bec013", "qqqwqwq013"],
        ["20bec014", "qqqwqwq014"],
        ["20bec015", "qqqwqwq015"],
        ["20bec016", "qqqwqwq016"],
        ["20bec017", "qqqwqwq017"],
        ["20bec018", "qqqwqwq018"],
        ["20bec019", "qqqwqwq019"],
        ["20bec020", "qqqwqwq020"],
        ["20bec021", "qqqwqwq021"],
        ["20bec022", "qqqwqwq022"],
        ["20bec023", "qqqwqwq023"],
        ["20bec024", "qqqwqwq024"],
        ["20bec025", "qqqwqwq025"],
        ["20bec026", "qqqwqwq026"],
        ["20bec027", "qqqwqwq027"],
        ["20bec028", "qqqwqwq028"],
        ["20bec029", "qqqwqwq029"],
        ["20bec030", "qqqwqwq030"],
        ["20bec031", "qqqwqwq031"],
        ["20bec032", "qqqwqwq032"],
        ["20bec033", "qqqwqwq033"],
        ["20bec034", "qqqwqwq034"],
        ["20bec035", "qqqwqwq035"],
        ["20bec036", "qqqwqwq036"],
        ["20bec037", "qqqwqwq037"],
        ["20bec038", "qqqwqwq038"],
        ["20bec039", "qqqwqwq039"],
        ["20bec040", "qqqwqwq040"],
        ["20bec041", "qqqwqwq041"],
        ["20bec042", "qqqwqwq042"],
        ["20bec043", "qqqwqwq043"],
        ["20bec044", "qqqwqwq044"],
        ["20bec045", "qqqwqwq045"],
        ["20bec046", "qqqwqwq046"],
        ["20bec047", "qqqwqwq047"],
        ["20bec048", "qqqwqwq048"],
        ["20bec049", "qqqwqwq049"],
        ["20bec050", "qqqwqwq050"],
        ["20bec051", "qqqwqwq051"],
        ["20bec052", "qqqwqwq052"],
        ["20bec053", "qqqwqwq053"],
        ["20bec054", "qqqwqwq054"],
        ["20bec055", "qqqwqwq055"],
        ["20bec056", "qqqwqwq056"],
        ["20bec057", "qqqwqwq057"],
        ["20bec058", "qqqwqwq058"],
        ["20bec059", "qqqwqwq059"],
        ["20bec060", "qqqwqwq060"],
        ["20bec061", "qqqwqwq061"],
        ["20bec062", "qqqwqwq062"],
        ["20bec063", "qqqwqwq063"],
        ["20bec064", "qqqwqwq064"],
        ["20bec065", "qqqwqwq065"],
        ["20bec066", "qqqwqwq066"],
        ["20bec067", "qqqwqwq067"],
        ["20bec068", "qqqwqwq068"],
        ["20bec069", "qqqwqwq069"],
        ["20bec070", "qqqwqwq070"]
    ];


        sheet5.clear();

        for (var i = 0; i < dataececourses.length; i++) {
          sheet5.getRange(i + 2, 1, 1, 2).setValues([dataececourses[i]]);
        }
    }

    var sheet6 = spreadsheet.getSheetByName(sheetName6);

    if(sheet6){
       
       var datadsaicourses = [
          ["Reg no" , "Course Code"],
          ["20bds001", "ssqq001"],
          ["20bds002", "ssqq002"],
          ["20bds003", "ssqq003"],
          ["20bds004", "ssqq004"],
          ["20bds005", "ssqq005"],
          ["20bds006", "ssqq006"],
          ["20bds007", "ssqq007"],
          ["20bds008", "ssqq008"],
          ["20bds009", "ssqq009"],
          ["20bds010", "ssqq010"],
          ["20bds011", "ssqq011"],
          ["20bds012", "ssqq012"],
          ["20bds013", "ssqq013"],
          ["20bds014", "ssqq014"],
          ["20bds015", "ssqq015"],
          ["20bds016", "ssqq016"],
          ["20bds017", "ssqq017"],
          ["20bds018", "ssqq018"],
          ["20bds019", "ssqq019"],
          ["20bds020", "ssqq020"],
          ["20bds021", "ssqq021"],
          ["20bds022", "ssqq022"],
          ["20bds023", "ssqq023"],
          ["20bds024", "ssqq024"],
          ["20bds025", "ssqq025"],
          ["20bds026", "ssqq026"],
          ["20bds027", "ssqq027"],
          ["20bds028", "ssqq028"],
          ["20bds029", "ssqq029"],
          ["20bds030", "ssqq030"],
          ["20bds031", "ssqq031"],
          ["20bds032", "ssqq032"],
          ["20bds033", "ssqq033"],
          ["20bds034", "ssqq034"],
          ["20bds035", "ssqq035"],
          ["20bds036", "ssqq036"],
          ["20bds037", "ssqq037"],
          ["20bds038", "ssqq038"],
          ["20bds039", "ssqq039"],
          ["20bds040", "ssqq040"],
          ["20bds041", "ssqq041"],
          ["20bds042", "ssqq042"],
          ["20bds043", "ssqq043"],
          ["20bds044", "ssqq044"],
          ["20bds045", "ssqq045"],
          ["20bds046", "ssqq046"],
          ["20bds047", "ssqq047"],
          ["20bds048", "ssqq048"],
          ["20bds049", "ssqq049"],
          ["20bds050", "ssqq050"],
          ["20bds051", "ssqq051"],
          ["20bds052", "ssqq052"],
          ["20bds053", "ssqq053"],
          ["20bds054", "ssqq054"],
          ["20bds055", "ssqq055"],
          ["20bds056", "ssqq056"],
          ["20bds057", "ssqq057"],
          ["20bds058", "ssqq058"],
          ["20bds059", "ssqq059"],
          ["20bds060", "ssqq060"],
          ["20bds061", "ssqq061"],
          ["20bds062", "ssqq062"],
          ["20bds063", "ssqq063"],
          ["20bds064", "ssqq064"],
          ["20bds065", "ssqq065"],
          ["20bds066", "ssqq066"],
          ["20bds067", "ssqq067"],
          ["20bds068", "ssqq068"],
          ["20bds069", "ssqq069"],
          ["20bds070", "ssqq070"],
          ["20bds071", "ssqq071"],
          ["20bds072", "ssqq072"],
          ["20bds073", "ssqq073"],
          ["20bds074", "ssqq074"],
          ["20bds075", "ssqq075"],
          ["20bds076", "ssqq076"],
          ["20bds077", "ssqq077"],
          ["20bds078", "ssqq078"],
          ["20bds079", "ssqq079"],
          ["20bds080", "ssqq080"],
          ["20bds081", "ssqq081"],
          ["20bds082", "ssqq082"],
          ["20bds083", "ssqq083"],
          ["20bds084", "ssqq084"],
          ["20bds085", "ssqq085"],
          ["20bds086", "ssqq086"],
          ["20bds087", "ssqq087"],
          ["20bds088", "ssqq088"],
          ["20bds089", "ssqq089"],
          ["20bds090", "ssqq090"],
          ["20bds091", "ssqq091"],
          ["20bds092", "ssqq092"],
          ["20bds093", "ssqq093"],
          ["20bds094", "ssqq094"],
          ["20bds095", "ssqq095"],
          ["20bds096", "ssqq096"],
          ["20bds097", "ssqq097"],
          ["20bds098", "ssqq098"],
          ["20bds099", "ssqq099"],
          ["20bds100", "ssqq100"],
          ["20bds101", "ssqq101"],
          ["20bds102", "ssqq102"],
          ["20bds103", "ssqq103"],
          ["20bds104", "ssqq104"],
          ["20bds105", "ssqq105"],
          ["20bds106", "ssqq106"],
          ["20bds107", "ssqq107"],
          ["20bds108", "ssqq108"],
          ["20bds109", "ssqq109"],
          ["20bds110", "ssqq110"],
          ["20bds111", "ssqq111"],
          ["20bds112", "ssqq112"],
          ["20bds113", "ssqq113"],
          ["20bds114", "ssqq114"],
          ["20bds115", "ssqq115"],
          ["20bds116", "ssqq116"],
          ["20bds117", "ssqq117"],
          ["20bds118", "ssqq118"],
          ["20bds119", "ssqq119"],
          ["20bds120", "ssqq120"],
      ]

        sheet6.clear();

        for (var i = 0; i < datadsaicourses.length; i++) {
          sheet6.getRange(i + 2, 1, 1, 2).setValues([datadsaicourses[i]]);
        }
    }
    
}


