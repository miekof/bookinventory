var ui = SpreadsheetApp.getUi();
var breakTag = '<br>';
var sheet = SpreadsheetApp.getActiveSheet();

//Add menu items on Google Sheets
function onOpen() {
  ui.createMenu('Book Inventory')
      .addItem('Add Books', 'menuItem1')
      .addToUi();
}

//Action when the Book Inveontory -> Book Inventory menu item is selected.
function menuItem1() {
  var html = HtmlService.createHtmlOutputFromFile('AddBooks');
  SpreadsheetApp.getUi() 
     .showModalDialog(html, 'Add Books');
}

function processForm(formObject) {
  var isbn = formObject.isbn;
  
  var response = JSON.parse(getBookInfoWithIsbn(isbn));
  
  if (response.totalItems == 0){
    ui.alert("Book is not found.");
  }

  var output = HtmlService.createHtmlOutput('<b>Search Result:<br>');
  output.append(breakTag);
  output.append('<b>Book Title:</b>' + response.items[0].volumeInfo.title);
  output.append(breakTag);
  output.append('<b>Book Cover:</b> <img src="' + response.items[0].volumeInfo.imageLinks.thumbnail + '"/>');
  output.append(breakTag);
  Logger.log(output.getContent());
  addDataToSheet(response);
  
  return output.getContent();
}

function addDataToSheet(response){
  //This is just to show it's actually possible to insert data into Google Sheets.
  sheet.appendRow(['ISBN', response.items[0].volumeInfo.title]);
}

function getBookInfoWithIsbn(isbn){
  var uri = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
  var response = UrlFetchApp.fetch(uri, {'muteHttpExceptions': true});
  Logger.log(response);
  return response;
}
