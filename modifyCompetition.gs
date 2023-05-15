const colNameCompet = 'B';
const colTown = 'C';
const colYear = 'D';
const colLevel = 'E';
/**
 * Creates a custom menu in Google Sheets when the spreadsheet opens.
 */
function onOpen() {
  ui.createMenu('Judoka Database Administration')
    .addSubMenu(ui.createMenu('Competition')
      .addItem('Modify Competition', 'modifyCompetitionSidebar'))
    .addToUi();
}

/**
 * Creates a sidebar in Google Sheets. Its content is a html document.
 */
function modifyCompetitionSidebar() {
  var html = HtmlService.createTemplateFromFile('modifyCompetitionInterface')
      .evaluate()
      .setTitle('Modification of a Competition');
  SpreadsheetApp.getUi()
      .showSidebar(html);
}

/**
 * @param {string} it takes a level id and check if it exists in the table Level
 * @return {boolean} true if exists, false else.
 */
function isThisLevelExist(str){
  const arr_level = getLevels()
  for(let row of arr_level){
    if(row.indexOf(str) !== -1)
      return true;
  }
  return false;
}

/**Apply update given by the form 
 * @param {Object}
 * @return {void}
 */
function updateJudoka(input){
  const row = parseInt(input.idCompet) + 1;
  if(isThisLevelExist(input.level)){
    if (input.nameCompetition != undefined)
      sheet_compet.getRange(`${colNameCompet}${row}`).setValue(input.nameCompetition);

    if (input.town != undefined)
      sheet_compet.getRange(`${colTown}${row}`).setValue(input.town);

    if (input.year != undefined)
      sheet_compet.getRange(`${colYear}${row}`).setValue(input.year);
    
    if (input.level != undefined)
      sheet_compet.getRange(`${colLevel}${row}`).setValue(input.level);

    if (input.nameCompetition != undefined || input.town != undefined || input.year != undefined || input.level != undefined)
      showAlertUpdate("Mise à jour réussie!");
    else
      showAlertUpdate("Cochez les attributs avant de cliquer sur le bouton \"Mettre à jour\"!");
  }else
    showAlertUpdate("L'identifiant level: " + input.level +" N'existe pas!\n Veuillez entrer un identifiant correcte.");

}