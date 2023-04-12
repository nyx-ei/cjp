//Here we declare constants of the program
const index = 'WebApp'; //This is the name of the HTML Document that will present the result.
const sheet_id = '1gsXPJBHhESyjfGv_PwfgeRJd7UlA3XxtTjXLXwTqVc4'; //This is the id of our database.
const first_row_index = 2;
const first_col_index = 1;
const table_person = "Person";
const table_category = "Category";
const table_fighter = "Fighter";
const table_match = "Match";
const table_compet = "Competition";
const limit = 8;

/* Schema of the database it may help to understand all these codes
  *Table Person*   |person_id  |	name  |	birhdate  |	nationality |	image |
  *Table Category*   |category_id  |	gender  |	name  |
  *Table Fighter*   |fighter_id  |	person_id  |	category_id  |
  *Table Level*   |level_id  |	name_level  |	value_max  |
  *Table Competition*   |compet_id  |	name_compet  |	town  |	year |	level_id |
  *Table Match*   |match_id  |	fighter1_id  |	fighter2_id  |	compet_id |	winner |stage |ippon_fighter1 |ippon_fighter2 |waza_fighter1 |waza_fighter2 |duration |
*/
/**
 * Special function that handles HTTP GET requests to the published web app.
 * @return {HtmlOutput} The HTML page to be served.
 */
function doGet(e){
  return HtmlService
  .createTemplateFromFile('contestWepApp')
  .evaluate().setTitle('Page Combats');
}

/**
 * Returns all data of tables Person, Category, Fighter, Match and Compet.
 * @return {Object} All tables listed below in form of object.
 */
function getDataFromSheet(){
  //Here we get the sheet Person, Category and Fighter.

  var sheet_person = SpreadsheetApp.openById(sheet_id).getSheetByName(table_person);
  var sheet_category = SpreadsheetApp.openById(sheet_id).getSheetByName(table_category);
  var sheet_fighter = SpreadsheetApp.openById(sheet_id).getSheetByName(table_fighter);
  var sheet_match = SpreadsheetApp.openById(sheet_id).getSheetByName(table_match);
  var sheet_compet = SpreadsheetApp.openById(sheet_id).getSheetByName(table_compet);
  
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

/**
 * Returns fighters(1 and 2) name, year of birth, nationality, image profile, category name, winner name, stage Ippon and Waza(1 and 2), duration
 * competition name, town, year.
 * @return {Array<Object>} last limit contests.
 */
function getLastContests(){
  var data_sheet = getDataFromSheet();
  const ar_person = data_sheet['arr_person'];
  const ar_category = data_sheet['arr_category'];
  const ar_fighter = data_sheet['arr_fighter'];
  const ar_match = data_sheet['arr_match'];
  const ar_compet = data_sheet['arr_compet'];

  var results = [];
  var count = 0;

  for(let match of ar_match){
    if(count >= limit) break;
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
    count++;
  }
  return results;
}
/**
 * Returns array of id of fighter, name, year of birth, nationality, image profile, category name,.
 * @return {Array<Array>} last {limit} contests.
 */
function searchJudokaByName(name){
  const data = getDataFromSheet();
  let person = [];
  if(name.split(' ').join('').length == 0) return person;
  else{
    for(let p of data['arr_person']){
      if(p[1].toLowerCase().includes(name.toLowerCase())){
        person = p;
        person[2] = person[2].getFullYear();
        break;
      }
    }
  }
  if(person.length != 0){
    const fighter = data['arr_fighter'].filter(f => f[1] == person[0]);
    let judoka = [];
    for(let f of fighter){
      const category = data['arr_category'].find(c => c[0] == f[2]);
      // Push just fighter_id, all person's information except his id and the weight(what we called category name).
      judoka.push(f.slice(0,1).concat(person.slice(1), category.slice(-1)));
    }
    return judoka;
  }else{
    return person;
  }
}
/**
 * Parameter is id of a fighter(string).
 * @return {Array} row of the fighter.
 */
function getFighterNameById(id){
  const data = getDataFromSheet();
  const fighter = data['arr_fighter'].find(f => f[0] == id);
  const person = data['arr_person'].find(p => p[0] == fighter[1]);
  person[2] = person[2].getFullYear();
  return person.slice(1);
}
/**
 * Parameter is id of a competition(string).
 * @return {Array} row of the competition.
 */
function getCompetitionById(id){
  const data = getDataFromSheet();
  return data['arr_compet'].find(c => c[0] == id).slice(1,4);
}
/**
 * Parameter (string)
 * Returns fighters(1 and 2) name, year of birth, nationality, image profile, category name, winner name, stage Ippon and Waza(1 and 2), duration
 * competition name, town, year.
 * @return {Array<Array>} contests of a given fighter.
 */
function getContests(name){
  var judoka = searchJudokaByName(name);
  let matches = [];
  if(judoka.length == 0) return matches;

  const data = getDataFromSheet();
  for(let j of judoka){
     matches = data['arr_match'].filter(m =>
    /*j[0] ---> id of fighter table. m[1] and m[2] ---> fighter1_id and fighter2_id
      Here we get all the matches played by judoka*/
    m[1] == j[0] || m[2] == j[0]
    );
    matches.forEach(item =>{
      item[1] = getFighterNameById(item[1]);
      item[2] = getFighterNameById(item[2]);
      item[3] = getCompetitionById(item[3]);
    });
  }
  matches.push(judoka);
  return matches;
}

function includeExternalFile(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}