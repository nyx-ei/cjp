const colFighterA = 'B';
const colFighterB = 'C';
const colCompet = 'D';
const colWinner = 'E';
const colStage = 'F';
const colIpponA = 'G';
const colIpponB = 'H';
const colWazaA = 'I';
const colWazaB = 'J';
const colDuration = 'K';

const ui = SpreadsheetApp.getUi();

const first_row_index = 2;
const first_col_index = 1;

const table_compet = "Competition";
const table_fighter = "Fighter";
const table_match = "Match";
var sheets = SpreadsheetApp.getActiveSpreadsheet();
const sheet_match = sheets.getSheetByName(table_match);
const sheet_compet = sheets.getSheetByName(table_compet);
const sheet_fighter = sheets.getSheetByName(table_fighter);

/**
 * Creates a sidebar in Google Sheets. Its content is a html document.
 */
function modifyFightSidebar() {
  var html = HtmlService.createTemplateFromFile('modifyFightInterface')
      .evaluate()
      .setTitle('Update a Fight');
  SpreadsheetApp.getUi()
      .showSidebar(html);
}
/**
 * @param {void}
 * @return {Array} Returns an array containing the list of matches.
 */
function getMatches() {
  return sheet_match.getRange(first_row_index, first_col_index, sheet_match.getLastRow()-1, sheet_match.getLastColumn()).getValues();
}
/**This help us to check if a string is in an array of arrays
 * @param {string, array}
 * @return {boolean}
 */
function isValueExist(str, arrays){
  return arrays[0] === undefined ? false
        : arrays[0].indexOf(str) !== -1
        ? true
        : isValueExist(str, arrays.slice(1));
}

/**Apply update given by the form 
 * @param {Object}
 * @return {void}
 */
function updateFight(input){
  const arrFighters = sheet_fighter.getRange(first_row_index, first_col_index, sheet_fighter.getLastRow()-1, sheet_fighter.getLastColumn()).getValues();
  const arrCompets = sheet_compet.getRange(first_row_index, first_col_index, sheet_compet.getLastRow()-1, sheet_compet.getLastColumn()).getValues();
  const row = parseInt(input.idMatch) + 1;
  if (input.fighterA != undefined){
    if(isValueExist(input.fighterA, arrFighters)){
        sheet_match.getRange(`${colFighterA}${row}`).setValue(input.fighterA);
        ui.alert("Mise à jour du champs Combattant 1 réussie!");
    }else
      ui.alert(`Le combattant ${input.fighterA} n'existe pas dans la BD!`);
  }
  if(input.fighterB != undefined){
    if(isValueExist(input.fighterB, arrFighters)){
        sheet_match.getRange(`${colFighterB}${row}`).setValue(input.fighterB);
        ui.alert("Mise à jour du champs Combattant 2 réussie!");
    }else
      ui.alert(`Le combattant ${input.fighterB} n'existe pas dans la BD!`);
  }
  if(input.compet != undefined){
    if(isValueExist(input.compet, arrCompets)){
        sheet_match.getRange(`${colCompet}${row}`).setValue(input.compet);
        ui.alert("Mise à jour du champs Compétition réussie!");
    }else
      ui.alert(`La compétition ${input.compet} n'existe pas dans la BD!`);
  }
  if(input.winner != undefined){
    if(input.winner === input.fighterA || input.winner === input.fighterB){
        sheet_match.getRange(`${colWinner}${row}`).setValue(input.winner);
        ui.alert("Mise à jour du champs Vainqueur réussie!");
    }else if(input.fighterA !== undefined && input.fighterB !== undefined)
      ui.alert(`Le vainqueur doit être soit ${input.fighterA} ou ${input.fighterB}!`);
  }
  if(input.stage != undefined){
      sheet_match.getRange(`${colStage}${row}`).setValue(input.stage);
      ui.alert("Mise à jour du champs Tour réussie!");
  }
  if (input.ipponFighterA != undefined){
    sheet_match.getRange(`${colIpponA}${row}`).setValue(input.ipponFighterA);
    ui.alert("Mise à jour du champs Ippon Combattant 1 réussie!");
  }
  if(input.ipponFighterB != undefined){
      sheet_match.getRange(`${colIpponB}${row}`).setValue(input.ipponFighterB);
      ui.alert("Mise à jour du champs Ippon Combattant 2 réussie!");
  }
  if(input.wazaFighterA != undefined){
      sheet_match.getRange(`${colWazaA}${row}`).setValue(input.wazaFighterA);
      ui.alert("Mise à jour du champs Waza Combattant 1 réussie!");
  }
  if(input.wazaFighterB != undefined){
    sheet_match.getRange(`${colWazaB}${row}`).setValue(input.wazaFighterB);
    ui.alert("Mise à jour du champs Waza Combattant 2 réussie!");
  }
  if (input.fighterA === undefined && input.fighterB === undefined && input.compet === undefined && input.winner === undefined && input.stage === undefined && input.ipponFighterA === undefined && input.ipponFighterB === undefined && input.duration === undefined) 
    ui.alert("Cochez les attributs à modifier avant de cliquer sur le bouton \"Mettre à jour\"!");
}
