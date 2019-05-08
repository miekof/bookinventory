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
<<<<<<< HEAD
  var html = HtmlService.createHtmlOutputFromFile('AddBooks');
=======
  var html = HtmlService.createHtmlOutputFromFile('AddBooks')
  .setWidth(600)
  .setHeight(800);
  
>>>>>>> Add additional info to display on the form
  SpreadsheetApp.getUi() 
     .showModalDialog(html, 'Add Books');
}

function processForm(formObject) {
  var isbn = formObject.isbn;
  
  var response = JSON.parse(getBookInfoWithIsbn(isbn));
  
  if (response.totalItems == 0){
    ui.alert("Book is not found.");
  }

<<<<<<< HEAD
  var output = HtmlService.createHtmlOutput('<b>Search Result:<br>');
  output.append(breakTag);
  output.append('<b>Book Title:</b>' + response.items[0].volumeInfo.title);
  output.append(breakTag);
  output.append('<b>Book Cover:</b> <img src="' + response.items[0].volumeInfo.imageLinks.thumbnail + '"/>');
  output.append(breakTag);
  Logger.log(output.getContent());
=======
  var book = response.items[0].volumeInfo;
  var output = HtmlService.createHtmlOutput('<b>Search Result:</b>');
  output.append(breakTag);
  output.append(breakTag);
  output.append('<b>ISBN: </b>' + isbn);
  output.append('<b>Book Title:</b> ' + book.title);
  output.append(breakTag);
  output.append('<b>Subtitle:</b> ' + book.subtitle);
  output.append(breakTag);
  output.append('<b>Authors</b> ')
  for (var i = 0; i < book.authors.length; i++){
    output.append(book.authors[i]);
    if (i != book.authors.length -1){
      output.append(', ');
    }
  }
  output.append(breakTag);
  output.append('<b>Book Cover:</b>')
  output.append(breakTag);
  output.append('<img src="' + book.imageLinks.thumbnail + '"/>');
  output.append(breakTag);
  output.append('<b>Publish Date:</b> ' + book.publishedDate);
  output.append(breakTag);
  output.append('<b>Categories: </b> ');
 Logger.log(book.categories);
  for (var i = 0 ; i < book.categories.length; i++){
    output.append(book.categories[i]); 
    if (i != book.categories.length -1){
      output.append(', ');
    }
  }
  output.append(breakTag);
  output.append('<b>Text Snippet: </b>' + book.searchInfo.textSnippet);
  output.append(breakTag);
  output.append('<b>Description: </b>' + book.description);
  output.append(breakTag);
>>>>>>> Add additional info to display on the form
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
<<<<<<< HEAD
  Logger.log(response);
=======
>>>>>>> Add additional info to display on the form
  return response;
}
