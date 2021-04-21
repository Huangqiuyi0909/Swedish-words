var swedishWordsUrl = "https://docs.google.com/spreadsheets/d/1TglyLEymi81PqC08JwWh9hVwrKvNm0Ee_JmY_WKwqDE/edit#gid=0";
var swedishWordSheet = SpreadsheetApp.openByUrl(swedishWordsUrl);
var dictionarySheet = swedishWordSheet.getSheetByName("Dictionary");
var todaySheet = swedishWordSheet.getSheetByName("WordsForToday");
var todayNumberSheet = swedishWordSheet.getSheetByName("WordsNumberForToday");
var todayNewsSheet = swedishWordSheet.getSheetByName("NewsForToday");
var shuffleNumberSheet = swedishWordSheet.getSheetByName("ShuffleValue");
var shuffleWordsSheet = swedishWordSheet.getSheetByName("ShuffleWordsSheet");
var totalNumber = dictionarySheet.getRange("A1").getDataRegion().getLastRow();
var numberOfEveryDayWords = 10;

function doGet() {
  var tmp = HtmlService.createTemplateFromFile("swedishLearning");
  var shuffleValue = shuffleNumberSheet.getRange("A1").getValue();

  // Get today's words, show in English
  chooseTodayWordsEnglish(shuffleValue);

  // Get today's words list
  if (shuffleValue == 0){
    var todaysWordsList = todaySheet.getRange(1,1,10,5).getValues();
  }
  if (shuffleValue == 1){
    Logger.log("Shuffle called");
    var todaysWordsList = shuffleWordsSheet.getRange(1,1,10,5).getValues();
  }
  tmp.todaysWordsListEnglish = todaysWordsList.map(function(r){return r[0];})

  // Get news value
  var todaysNews = todayNewsSheet.getRange(1,1).getValue();
  tmp.todaysNews = todaysNews;
  return tmp.evaluate();
}

function chooseTodayWordsEnglish(shuffleValue){
  var numberOfColomn = 6
  if (shuffleValue == 0){
    var wordsNumber = todayNumberSheet.getRange(1,1,10,1).getValues();
    todaySheet.clear();
    for (i=0; i < numberOfEveryDayWords; i++){
    line = wordsNumber[i];
    var wordInThisLine = dictionarySheet.getRange(line,1,1,numberOfColomn).getValues();
    todaySheet.appendRow(wordInThisLine[0]);
    }
  }
  if (shuffleValue == 1){
    Logger.log("shuffle clicked");
    shuffleWordsSheet.clear();
    for(var i = 0; i < numberOfEveryDayWords; i++){
     var wordNumber = Math.ceil(Math.random() * totalNumber);
     var wordInThisLine = dictionarySheet.getRange(wordNumber,1,1,numberOfColomn).getValues();
     Logger.log(wordInThisLine);
     shuffleWordsSheet.appendRow(wordInThisLine[0]);
    }
  }
}

function getTodaysWordsListSwedish(){
  var list = todaySheet.getRange(1,2,todaySheet.getRange("A1").getDataRegion().getLastRow(),todaySheet.getRange("A1").getDataRegion().getLastColumn()-1).getValues();
  Logger.log(list[0][0]);
  return list;
  }

function include(fileName){
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}

function isShuffleClicked(value){
   shuffleNumberSheet.getRange("A1").setValue(value);
   Logger.log("value set");
}
