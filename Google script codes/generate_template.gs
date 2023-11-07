function generate_for_branch(data,col_num) {
    let start = 4;
    var list_string = data[start][col_num+1];
    let list;
    try{
      list = JSON.parse(list_string);
    }
    catch(err){
      throw "Bucket-Courses input should be in proper format. Refer to docs here "+docs_url;
    }
function generate_for_branch(data,col_num) {
    let start = 4;
    var list_string = data[start][col_num+1];
    let list;
    try{
      list = JSON.parse(list_string);
    }
    catch(err){
      throw "Bucket-Courses input should be in proper format. Refer to docs here "+docs_url;
    }

    for (let i = 0; i < list.length; i++) {
      try{
        list[i] = Number(list[i]);
      }
      catch(err){
        throw "List should only contain positive integers"
      }
      if (!Number.isInteger(list[i]) || list[i]<=0){
        throw "List should only contain positive integers"
      }
      start = start+2;
      data[start][col_num] = 'Basket '+ (i+1),toString(); 
      data[start][col_num+1] = 'Courses';
      //data[start][col_num+2] = 'Pre-requisites';
      start = start+1;
      for (let j = start; j < start+list[i]; j++){
        data[j][col_num] = 'Course ' + (j-start+1).toString() + ':';
        //data[j][col_num+2] = '[]'
      }
      start = start+list[i]-1;
    }
    return data;
}

function generate_template(){
    var sheet_name = "sheet1"; // Name of the sheet
    var sheet_check_object = get_sheet_by_data(sheet_name);
    var check_data = sheet_check_object.data;

    Logger.log(check_data);
    
    if (check_data.length!=5 || check_data[0].length!=10){
      throw "Template is corrupted please Reset the sheet. For referece refer docs here "+docs_url;
    }
    var maxRows = 100;
    var maxCol = 20;
    var sheet_object = get_sheet_by_coordinates(sheet_name,1,1,maxRows,maxCol);
    var sheet = sheet_object.sheet;
    var data = sheet_object.data;

    data = generate_for_branch(data,0);
    data = generate_for_branch(data,4);
    data = generate_for_branch(data,8);

    write_data(sheet,data);
}




    for (let i = 0; i < list.length; i++) {
      try{
        list[i] = Number(list[i]);
      }
      catch(err){
        throw "List should only contain positive integers"
      }
      if (!Number.isInteger(list[i]) || list[i]<=0){
        throw "List should only contain positive integers"
      }
      start = start+2;
      data[start][col_num] = 'Basket '+ (i+1),toString(); 
      data[start][col_num+1] = 'Courses';
      //data[start][col_num+2] = 'Pre-requisites';
      start = start+1;
      for (let j = start; j < start+list[i]; j++){
        data[j][col_num] = 'Course ' + (j-start+1).toString() + ':';
        //data[j][col_num+2] = '[]'
      }
      start = start+list[i]-1;
    }
    return data;
}

function generate_template(){
    var sheet_name = "sheet1"; // Name of the sheet
    var sheet_check_object = get_sheet_by_data(sheet_name);
    var check_data = sheet_check_object.data;

    Logger.log(check_data);
    
    if (check_data.length!=5 || check_data[0].length!=10){
      throw "Template is corrupted please Reset the sheet. For referece refer docs here "+docs_url;
    }
    var maxRows = 100;
    var maxCol = 20;
    var sheet_object = get_sheet_by_coordinates(sheet_name,1,1,maxRows,maxCol);
    var sheet = sheet_object.sheet;
    var data = sheet_object.data;

    data = generate_for_branch(data,0);
    data = generate_for_branch(data,4);
    data = generate_for_branch(data,8);

    write_data(sheet,data);
}


