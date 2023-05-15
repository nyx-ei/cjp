const ui = SpreadsheetApp.getUi();

const first_row_index = 2;
const first_col_index = 1;

const table_person = "Person";

var sheets = SpreadsheetApp.getActiveSpreadsheet();
const sheet_pers = sheets.getSheetByName(table_person);

const default_img_link = "https://img.freepik.com/vecteurs-premium/portrait-jeune-homme-barbe-coiffure-avatar-masculin-illustration-vectorielle_266660-423.jpg?w=740";

/**
 * Creates a custom menu in Google Sheets when the spreadsheet opens.
 */
function onOpen() {
  ui.createMenu('Judoka Database Administration')
    .addSubMenu(ui.createMenu('Judoka')
      .addItem('Create Judoka', 'createJudoka'))
    .addToUi();
}

/**
 * Creates a sidebar in Google Sheets. Its content is a html document.
 */
function createJudoka() {
  var html = HtmlService.createHtmlOutputFromFile('creationOfJudoka')
      .setTitle('Creation of a Judoka');
  SpreadsheetApp.getUi()
      .showSidebar(html);
}

/**
 * @return {Array} table Person data.
 */
function getJudoka(){
  const last_row = sheet_pers.getLastRow()-1;
  const last_col = sheet_pers.getLastColumn();
  return sheet_pers.getRange(first_row_index, first_col_index, last_row, last_col).getValues();
}

/**Is to verify if parameter (name) is contained in the table Person
 * @return {Array} row corresponding to the parameter. If (name) is not found return null.
 */
function isNamePresent(name){
  return getJudoka().find(p => p[1].toLowerCase() === name.toLowerCase());
}

/**Adds (input) from the interface
 * Tests if an input is all ready present, if yes it aks if your sure to add it on the table.
 */
function addJudoka(input){
  const last_row = sheet_pers.getLastRow()-1;

  if(isNamePresent(input.nameJudoka) == null){
    if (input.image.length === 0)
      input.image = default_img_link;
    sheet_pers.appendRow([
      `P${last_row+1}`,
      input.nameJudoka,
      input.birthdate,
      input.nationality,
      input.image
    ]);
  }else{
    const response = ui.alert(
    "Ce nom existe déjà",
    "Etes-vous certain de continuer?",
    ui.ButtonSet.YES_NO
  );
    if(response == ui.Button.YES){
      sheet_pers.appendRow([
      `P${last_row+1}`,
      input.nameJudoka,
      input.birthdate,
      input.nationality,
      input.image
    ]);
    }
  }
}