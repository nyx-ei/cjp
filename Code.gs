//Here we declare constants of the program
const index = 'WebApp'; //This is the name of the HTML Document that will present the result.
const sheet_id = '1OnzXq8RrhnhycjnDH5Y8F3Y6LqBv31gT'; //This is the id of our database.
const first_row_index = 2;
const first_col_index = 1;
const table_person = "Person";
const table_category = "Category";
const table_fighter = "Fighter";
const table_match = "Match";
const table_compet = "Competition";
const limit = 9;

//Here we get the sheet Person, Category and Fighter.

const sheet_person = SpreadsheetApp.openById(sheet_id).getSheetByName(table_person);
const sheet_category = SpreadsheetApp.openById(sheet_id).getSheetByName(table_category);
const sheet_fighter = SpreadsheetApp.openById(sheet_id).getSheetByName(table_fighter);
const sheet_match = SpreadsheetApp.openById(sheet_id).getSheetByName(table_match);
const sheet_compet = SpreadsheetApp.openById(sheet_id).getSheetByName(table_compet);





function doGet() {
  return HtmlService.createTemplateFromFile('participatedContestsApp').evaluate().setTitle()('CompetitionPage');
}

function includeExternalFile(filename){

  return HtmlService.createHtmlOutputFromFile(filename).getContent();

}



function getDataFromSheet(){
  //Get data from Person, Category and Fighter
  var last_row = sheet_person.getLastRow()-1;
  var last_col = sheet_person.getLastColumn();
  var arr_person = sheet_person.getRange(first_row_index, first_col_index, last_row, last_col).getValues();
 
  last_row = sheet_category.getLastRow()-1;
  last_col = sheet_category.getLastColumn();
  var arr_category = sheet_category.getRange(first_row_index, first_col_index, last_row, last_col).getValues();

  last_row = sheet_fighter.getLastRow()-1;
  last_col = sheet_fighter.getLastColumn();
  var arr_fighter = sheet_fighter.getRange(first_row_index, first_col_index, last_row, last_col).getValues();

  last_row = sheet_match.getLastRow()-1;
  last_col = sheet_match.getLastColumn();
  var arr_match = sheet_match.getRange(first_row_index, first_col_index, last_row, last_col).getValues();

  last_row = sheet_compet.getLastRow()-1;
  last_col = sheet_compet.getLastColumn();
  var arr_compet = sheet_compet.getRange(first_row_index, first_col_index, last_row, last_col).getValues();

  const data ={
    arr_person,
    arr_category,
    arr_fighter,
    arr_match,
    arr_compet
  }

  return data;
}

function getLastContests(){
  var data_sheet = getDataFromSheet();
  const ar_person = data_sheet['arr_person'];
  const ar_category = data_sheet['arr_category'];
  const ar_fighter = data_sheet['arr_fighter'];
  const ar_match = data_sheet['arr_match'];
  const ar_compet = data_sheet['arr_compet'];

  var results = [];
  for(let match of ar_match){
    const f1 = ar_fighter.find(id => id[0] == match[1]);
    const f2 = ar_fighter.find(id => id[0] == match[2]);
    
    const compet = ar_compet.find(com => com[0] == match[3]).slice(1,4);

    const fighter1 = ar_person.find(p => p[0] == f1[1]).slice(1);
    fighter1[1] = fighter1[1].getFullYear();

    const fighter2 = ar_person.find(p => p[0] == f2[1]).slice(1);
    fighter2[1] = fighter2[1].getFullYear();
 
    const category = ar_category.find(cat => cat[0] == f1[2]).slice(-1);
    const matchInfo = match.slice(4);

    const r = {
      fighter1,
      fighter2,
      category,
      compet,
      matchInfo
    };
    results.push(r);
  }
  return results;
}

/* PROCESS FORM */
function processForm(formObject){  
  var result = "";
  if(formObject.searchtext){//Execute if form passes search text
      result = search(formObject.searchtext);
  }
  return result;
}

function search(searchtext){
//** var = spreadsheetId   = '1OnzXq8RrhnhycjnDH5Y8F3Y6LqBv31gT'; //** CHANGE !!!
  //**var dataRage        = 'Data!A2:Y';  
  //**var dataRange = getLastContests();                                  //** CHANGE !!!
  //**var data = Sheets.Spreadsheets.Values.get(spreadsheetId, dataRage).values;
  //** var data = Sheets.spreadsheet.values.get(spreadsheetId,dataRange).values;
  var data = getLastContests();
  var ar = [];
   
  data.forEach(function(f) {
    if (~f.toString().toLowerCase().indexOf(searchtext.toString().toLowerCase())) {
      ar.push(f);
    }
  });
  return ar;
}



 