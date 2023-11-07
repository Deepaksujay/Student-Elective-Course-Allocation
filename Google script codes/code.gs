const docs_url = "https://docs.google.com/document/d/1YeZEbdLFnqEBomCUN30JzceJj7IYkI905S562GkN4Fo/edit?usp=sharing";

function onOpen() {
  let ui = SpreadsheetApp.getUi();
  let custom_menu = ui.createMenu('Triggers');

  custom_menu.addItem('Generate Template', 'generate_template');
  custom_menu.addItem('Send Forms', 'send_forms');
  //custom_menu.addItem('Create Config Sheet', 'create_config');
  custom_menu.addItem('Start Allocation', 'start_allocation');
  custom_menu.addItem('Reset', 'reset');
  custom_menu.addItem('Get To Docs', 'get_to_docs');

  custom_menu.addToUi();
}

function get_to_docs(){
  var htmlOutput = HtmlService.createHtmlOutput(`Go to <a href="${docs_url}" target=_blank>Docs</a> for help!`).setWidth(250).setHeight(50);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Docs link');
  //showAlert(`Access docs of the system through here ${docs_url}`);
}

