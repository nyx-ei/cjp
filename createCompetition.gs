const ui = SpreadsheetApp.getUi();

const first_row_index = 2;
const first_col_index = 1;

const table_compet = "Competition";
const table_level = "Level";
const sheet_compet = sheets.getSheetByName(table_compet);
const sheet_level = sheets.getSheetByName(table_level);

/**
 * Creates a custom menu in Google Sheets when the spreadsheet opens.
 */
function onOpen() {
  ui.createMenu('Judoka Database Administration')
    .addSubMenu(ui.createMenu('Competition')
      .addItem('Create Competition', 'createCompetitionSidebar'))
    .addToUi();
}

/**
 * Creates a sidebar in Google Sheets. Its content is a html document.
 */
function createCompetitionSidebar() {
  var html = HtmlService.createTemplateFromFile('createCompetitionInterface')
      .evaluate()
      .setTitle('Creation of a Competition');
  SpreadsheetApp.getUi()
      .showSidebar(html);
}

/**
 * @return {Array} table Competition data.
 */
function getCompetition(){
  return sheet_compet.getRange(first_row_index, first_col_index, sheet_compet.getLastRow()-1, sheet_compet.getLastColumn()).getValues();
}
/**
 * @return {Array} table Level data.
 */
function getLevels(){
  return sheet_level.getRange(first_row_index, first_col_index, sheet_level.getLastRow()-1, sheet_level.getLastColumn()).getValues();
}

/**Determines whether combination of nameCompet, town, year and level_id is present in Competion table to avoid duplication.
 * 
 * @param {String,Number,String} nameCompet, year and level_id The combination to look for.
 * @return {Array} row corresponding to the parameter. If (name) is not found return null.
 */
function isCompetPresent(nameCompet, year, level_id){
  return getCompetition().some(c => c[1].toLowerCase() === nameCompet.toLowerCase() && c[3] === year && c[4] === level_id);
}

/**Adds (input) from the interface
 * @param {Object} input is an object that contains values from the form.
 * Makes sure that it is impossible to add row where the competition name, year and the level is not equivalent to any other row in the table
 * befor adding.
 */
function addCompet(input){

  if(isCompetPresent(input.nameCompet, Number(input.year), input.level) === false){
    sheet_compet.appendRow([
      `C${sheet_compet.getLastRow()}`,
      input.nameCompet,
      input.town,
      parseInt(input.year),
      input.level
    ]);
  }else{
    ui.alert("Attention!!\nCette entrée existe déjà, Veuillez entrer des valeurs différentes.");
  }
}