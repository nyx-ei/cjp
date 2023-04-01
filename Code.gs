function doGet(e) {
  return HtmlService
  .createTemplateFromFile('WebApp')
  .evaluate();
}
//The following function permit us to search if a name input is present in the database
function getResultsSQL(name){
  //Here we get the sheet Person, Category and Fighter.
  var sheet_person = SpreadsheetApp.openById('1gsXPJBHhESyjfGv_PwfgeRJd7UlA3XxtTjXLXwTqVc4').getSheetByName("Person");
  var sheet_category = SpreadsheetApp.openById('1gsXPJBHhESyjfGv_PwfgeRJd7UlA3XxtTjXLXwTqVc4').getSheetByName("Category");
  var sheet_fighter = SpreadsheetApp.openById('1gsXPJBHhESyjfGv_PwfgeRJd7UlA3XxtTjXLXwTqVc4').getSheetByName("Fighter");
  
  //Get data from Person, Category and Fighter
  var last_row1 = sheet_person.getLastRow();
  var arr_person = sheet_person.getRange(`A2:C${last_row1}`).getValues();

  last_row1 = sheet_category.getLastRow();
  var arr_category = sheet_category.getRange(`A2:C${last_row1}`).getValues();

  last_row1 = sheet_fighter.getLastRow();
  var arr_fighter = sheet_fighter.getRange(`A2:C${last_row1}`).getValues();

 // Here we check if the name corresponds to an athlete in the database 
  var results_person = [];
  if(name == '')
    return results_person;
    
  for(let i = 0; i< arr_person.length; i++){
    if(arr_person[i][1].split(' ').toString().toLowerCase().includes(name.toLowerCase()))
      results_person.push(arr_person[i]);
  }
  var results = [];
  for(let p of results_person){
    p[2] = p[2].getFullYear();
    for(let f of arr_fighter){
      if(p[0] == f[1]){
        const category = arr_category.find(cat => cat[0] == f[2]);
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
