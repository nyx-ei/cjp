function onOpen() {
  ui.createMenu('Judoka Database Administration')
    .addSubMenu(ui.createMenu('Judoka')
      .addItem('Modify Judoka', 'modifyJudoka'))
    .addToUi();
}

function modifyJudoka() {
  var html = HtmlService.createTemplateFromFile('modificationOfJudoka')
      .evaluate()
      .setTitle('Modifcation of a Judoka');
  SpreadsheetApp.getUi()
      .showSidebar(html);
}
