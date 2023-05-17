const ui = SpreadsheetApp.getUi();

const first_row_index = 2;
const first_col_index = 1;

const table_compet = "Competition";
const table_fighter = "Fighter";
const table_match = "Match";
const table_person= "Person";
const table_category = "Category";
var sheets = SpreadsheetApp.getActiveSpreadsheet();
const sheet_match = sheets.getSheetByName(table_match);
const sheet_compet = sheets.getSheetByName(table_compet);
const sheet_fighter = sheets.getSheetByName(table_fighter);
const sheet_category = sheets.getSheetByName(table_category);
const sheet_pers = sheets.getSheetByName(table_person);

/**
 * Creates a sidebar in Google Sheets. Its content is a html document.
 */
function createFightSidebar() {
  var html = HtmlService.createTemplateFromFile('createFightInterface')
      .evaluate()
      .setTitle('Creation of a Fight');
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
 * @param {void}
 * @return {Array} Returns an array containing the list of fighter.
 */
function getFighters(){
  return sheet_fighter.getRange(first_row_index, first_col_index, sheet_fighter.getLastRow()-1, sheet_fighter.getLastColumn()).getValues();
}

/**This take two strings (person id, category id) and return his name and his category
 * @param {string, string}
 * @return {Array} Returns an array of object.
 */
function getNameAndCategory(pers_id, cat_id){
  const arr_person = sheet_pers.getRange(first_row_index, first_col_index, sheet_pers.getLastRow()-1, sheet_pers.getLastColumn()).getValues();
  const arr_category = sheet_category.getRange(first_row_index, first_col_index, sheet_category.getLastRow()-1, sheet_category.getLastColumn()).getValues();
  const result = {};
  for(let p of arr_person){
    if(p.indexOf(pers_id) !== -1){
      result.person = p[1];
      break;
    }
  }
  for(let c of arr_category){
    if(c.indexOf(cat_id) !== -1){
      result.category = c[2];
      result.gender = c[1];
    }
  }
  return result;
}

/**This function enable us to avoid duplication on the table Match.
 * @param {string, string, string, string} This take 04 strings (figther id, fighter id, round, competition id) and return true if a there is a row containing these parameters.
 * @return {boolean}
 */
function isthisMatchExist(fighterA_id, fighterB_id, competition_id, round){
  const arr_matches = sheet_match.getRange(first_row_index, first_col_index, sheet_match.getLastRow()-1, sheet_match.getLastColumn()).getValues();
  for (let match of arr_matches){
    if (((match[1] === fighterA_id && match[2] === fighterB_id) || (match[1] === fighterB_id && match[2] === fighterA_id)) && match[3] === competition_id && match[5] === round)
      return true;
  }
  return false;
}

/**This function create a new ligne in the table Match.
 * @param {Object} This take an object form and insert its input in the table Match.
 * @return {void}
 */
function createFight(input){
  const last_row = sheet_match.getLastRow()-1;
  const fighterAid = input.fighterA.split(',')[0];
  const fighterBid = input.fighterB.split(',')[0];
  if(!isthisMatchExist(fighterAid, fighterBid, input.compet, input.stage)){
    sheet_match.appendRow([
      `M${last_row+1}`,
      fighterAid,
      fighterBid,
      input.compet,
      input.winner,
      input.stage,
      parseInt(input.ipponFighterA),
      parseInt(input.ipponFighterB),
      parseInt(input.wazaFighterA),
      parseInt(input.wazaFighterB),
      input.duration
    ]);
  }else{
    showAlertUpdate("Cette Ligne Existe déjà dans la Base de Donnée !");
  }
}