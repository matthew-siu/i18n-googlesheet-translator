// avoid naming the sheet with "i18n-", "i18n-{OS}" is the exported scripts for the corresponding OS.
// the program will take the number of language from first spreadsheet as the reference. 

// iOS
function exportToIOS() {
  var spreadsheet = SpreadsheetApp.getActive()
  var total = spreadsheet.getSheets().length
  var sheetName = sheetNameIOS // exported sheet name

  // get number of language.
  var numOfLang = 0
  for (var i=0; i<total; i++){
    if (!spreadsheet.getSheets()[i].getSheetName().includes("i18n-")){
      numOfLang = spreadsheet.getSheets()[i].getLastColumn() - 1
      break
    }
  }
  if (numOfLang < 1){
    Logger.log("[ERROR] cannot determine number of language: The 1st spreadsheet contains only " + numOfLang + " row.")
    return
  }else{
    Logger.log("# of language = " + numOfLang)
  }
  var langData = new Array()
  

  for (var a=0; a<total; a++)
  {
    var sheet = spreadsheet.getSheets()[a]
    if (sheet.getSheetName().includes("i18n-")) continue

    langData[langData.length] = new Array(numOfLang)

    var idRange = 'A2:' + columnToLetter(sheet.getLastColumn()) + sheet.getLastRow().toString()

    Logger.log("[" + sheet.getSheetName() + "]->[" + idRange + "]")

    langData.push(addCustom("/*******************************", numOfLang))
    langData.push(addCustom("* " + sheet.getSheetName(), numOfLang))
    langData.push(addCustom("*******************************/", numOfLang))
    langData.push(addCustom("", numOfLang))

    sheet.getRange(idRange)
      .getValues()
      .forEach(function(col, i) {
        var rowData = new Array()
        for (var j=1; j<=numOfLang; j++){
          if (col[0] == ""){ // column 0 is empty
            rowData.push("")
          }else if (col[j] == ""){ // column 0 has value, but column 1 is empty
            rowData.push("// " + col[0])
          }else{ // at least has 1 key-pair
            rowData.push('"' + col[0] + '" = ' + '"' + col[j] + '";')
          }
        }
        langData.push(rowData)

      })


    // print to spreadsheet
    var i18nSheet = spreadsheet.getSheetByName(sheetName)
    if (i18nSheet == null){
      spreadsheet.insertSheet(sheetName)
      i18nSheet = spreadsheet.getSheetByName(sheetName)
    }else
      i18nSheet.clearContents()
    for (var i=0; i<langData.length; i++) {
      i18nSheet.getRange(1,1,langData.length, langData[i].length)
        .setValues(langData)
    }

  }
}

//Android
function exportToAOS() {
  var spreadsheet = SpreadsheetApp.getActive()
  var total = spreadsheet.getSheets().length
  var sheetName = sheetNameAOS // exported sheet name

  // get number of language.
  var numOfLang = 0
  for (var i=0; i<total; i++){
    if (!spreadsheet.getSheets()[i].getSheetName().includes("i18n-")){
      numOfLang = spreadsheet.getSheets()[i].getLastColumn() - 1
      break
    }
  }
  if (numOfLang < 1){
    Logger.log("[ERROR] cannot determine number of language: The 1st spreadsheet contains only " + numOfLang + " row.")
    return
  }else{
    Logger.log("# of language = " + numOfLang)
  }
  var langData = new Array()
  

  for (var a=0; a<total; a++)
  {
    var sheet = spreadsheet.getSheets()[a]
    if (sheet.getSheetName().includes("i18n-")) continue

    langData[langData.length] = new Array(numOfLang)

    var idRange = 'A2:' + columnToLetter(sheet.getLastColumn()) + sheet.getLastRow().toString()

    Logger.log("[" + sheet.getSheetName() + "]->[" + idRange + "]")

    langData.push(addCustom("<!-- ", numOfLang))
    langData.push(addCustom("* " + sheet.getSheetName(), numOfLang))
    langData.push(addCustom("-->", numOfLang))
    langData.push(addCustom("", numOfLang))

    sheet.getRange(idRange)
      .getValues()
      .forEach(function(col, i) {
        var rowData = new Array()
        for (var j=1; j<=numOfLang; j++){
          if (col[0] == ""){ // column 0 is empty
            rowData.push("")
          }else if (col[j] == ""){ // column 0 has value, but column 1 is empty
            rowData.push("<!-- " + col[0] + " -->")
          }else{ // at least has 1 key-pair
            rowData.push('<string name="' + col[0] + '">' + col[j] + '</string>')
          }
        }
        langData.push(rowData)

      })


    // print to spreadsheet
    var i18nSheet = spreadsheet.getSheetByName(sheetName)
    if (i18nSheet == null){
      spreadsheet.insertSheet(sheetName)
      i18nSheet = spreadsheet.getSheetByName(sheetName)
    }else
      i18nSheet.clearContents()
    for (var i=0; i<langData.length; i++) {
      i18nSheet.getRange(1,1,langData.length, langData[i].length)
        .setValues(langData)
    }

  }
}

