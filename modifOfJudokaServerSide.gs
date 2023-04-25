const ui = SpreadsheetApp.getUi();
const first_row_index = 2;
const first_col_index = 1;
const table_person = "Person";
const sheets = SpreadsheetApp.getActiveSpreadsheet();
const sheet_pers = sheets.getSheetByName(table_person);
const last_row = sheet_pers.getLastRow()-1;
const last_col = sheet_pers.getLastColumn();

const colName = 'B';
const colBirthDate = 'C';
const colNat = 'D';
const colImage = 'E';

function onOpen() {
  ui.createMenu('Judoka Database Administration')
    .addSubMenu(ui.createMenu('Judoka')
      .addItem('Modify Judoka', 'modifyJudoka'))
    .addToUi();
}

function modifyJudoka() {
  var html = HtmlService.createTemplateFromFile('modifOfJudoka')
      .evaluate()
      .setTitle('Modifcation of a Judoka');
  SpreadsheetApp.getUi()
      .showSidebar(html);
}
/**
 * @return {Array} table Person data.
 */
function getJudoka(){
  return sheet_pers.getRange(first_row_index, first_col_index, last_row, last_col).getValues();
}

/**
 * Receives input and apply updates for a judoka.
 */
function updateJudoka(input){
  const row = parseInt(input.idJudoka) + 1;
  if (input.nameJudoka != undefined)
    sheet_pers.getRange(`${colName}${row}`).setValue(input.nameJudoka);

  if (input.birthdate != undefined)
    sheet_pers.getRange(`${colBirthDate}${row}`).setValue(input.birthdate);

  if (input.nationality != undefined)
    sheet_pers.getRange(`${colNat}${row}`).setValue(input.nationality);
  
  if (input.image != undefined)
    sheet_pers.getRange(`${colImage}${row}`).setValue(input.image);

  if (input.nameJudoka != undefined || input.birthdate != undefined || input.nationality != undefined || input.image != undefined)
    showAlert("Mise à jour réussie!");
  else
    showAlert("Cochez les attributs avant de cliquer sur le bouton \"Mettre à jour\"!");
}

/**
 * To show an alert.
 */
function showAlert(message){
  return ui.alert(message);
}