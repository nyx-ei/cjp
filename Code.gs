//Here we declare constants of the program
const index = 'WebApp'; //This is the name of the HTML Document that will present the result.
const sheet_id = '1gsXPJBHhESyjfGv_PwfgeRJd7UlA3XxtTjXLXwTqVc4'; //This is the id of our database.
const range_ref = 'A2:C';
const table_person = "Person";
const table_category = "Category";
const table_fighter = "Fighter";

function doGet(e) {
  return HtmlService
  .createTemplateFromFile(index)
  .evaluate();
}

function getDataFromSheet(){
  //Here we get the sheet Person, Category and Fighter.

  var sheet_person = SpreadsheetApp.openById(sheet_id).getSheetByName(table_person);
  var sheet_category = SpreadsheetApp.openById(sheet_id).getSheetByName(table_category);
  var sheet_fighter = SpreadsheetApp.openById(sheet_id).getSheetByName(table_fighter);
  
  //Get data from Person, Category and Fighter
  var last_row = sheet_person.getLastRow();
  var arr_person = sheet_person.getRange(`${range_ref}${last_row}`).getValues();

  last_row = sheet_category.getLastRow();
  var arr_category = sheet_category.getRange(`${range_ref}${last_row}`).getValues();

  last_row = sheet_fighter.getLastRow();
  var arr_fighter = sheet_fighter.getRange(`${range_ref}${last_row}`).getValues();

  const data ={
    arr_person,
    arr_category,
    arr_fighter
  }

  return data;
}

//The following function permit us to search if a name input is present in the database
function getResultsSQL(name){
  //Let's get the data
  const data_sheet = getDataFromSheet();
  // Here we check if the name corresponds to an athlete in the database 
  var results_person = [];
  if(name == '')
    return results_person;
    
  for(let i = 0; i< data_sheet['arr_person'].length; i++){
    if(data_sheet['arr_person'][i][1].split(' ').toString().toLowerCase().includes(name.toLowerCase()))
      results_person.push(data_sheet['arr_person'][i]);
  }
  var results = [];
  for(let p of results_person){
    p[2] = p[2].getFullYear();
    for(let f of data_sheet['arr_fighter']){
      if(p[0] == f[1]){
        const category = data_sheet['arr_category'].find(cat => cat[0] == f[2]);
        results.push([p, category]);
        break;
      }
    }
  }
  return results;
}

function includeExternalFile(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
