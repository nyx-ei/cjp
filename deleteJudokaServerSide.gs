function onOpen(){
  ui.createMenu('Judoka Database Administration')
    .addSubMenu(ui.createMenu('Judoka')
      .addItem('Delete Judoka', 'deleteJudokaSideBar'))
    .addToUi();
}

/**
 * Creates a sidebar in Google Sheets. Its content is a html document.
 */
function deleteJudokaSideBar(){
  var html = HtmlService.createTemplateFromFile('deleteJudokaInterface')
      .evaluate()
      .setTitle('Delete Judoka');
  SpreadsheetApp.getUi()
      .showSidebar(html);
}

function getFighters(idPerson){
  const arrFighter = sheet_fighter.getRange(first_row_index, first_col_index, last_row_fighter, last_col_fighter).getValues();
  return arrFighter.filter(f => f[1] == idPerson);
}

function deleteJudoka(input){
  if (typeof(input.checkbox) === "string"){
    //Here we delete all its occurences from table Fighter.
    const arrFighters = getFighters(input.checkbox);
    for (let f of arrFighters)
      sheet_fighter.deleteRow(parseInt(f[0].slice(1)) + 1);

    //Here we delete from table Person.
    console.log(parseInt(input.checkbox.slice(1)));
    sheet_pers.deleteRow(parseInt(input.checkbox.slice(1)) + 1);
  }else{
    for (let box of input.checkbox){
      //Here we delete all its occurences from table Fighter.
      const arrFighters = getFighters(box);
      for (let f of arrFighters)
        sheet_fighter.deleteRow(parseInt(f[0].slice(1)) + 1);

      //Here we delete from table Person.
      sheet_pers.deleteRow(parseInt(box.slice(1)) + 1);
    }
  }
}