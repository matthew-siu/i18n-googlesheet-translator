let sheetNameIOS = "i18n-ios"
let sheetNameAOS = "i18n-aos"

function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter
}

// add custom sentences to every column
function addCustom(comment, numOfLang){
  var row = new Array()
  for (var i=0; i<numOfLang; i++){
    row.push(comment)
  }
  return row
}

// add comment to every column
function addComment(comment, numOfLang, os){
  var row = new Array()
  for (var i=0; i<numOfLang; i++){
    var str = ""
    if (os == "ios") str = "// " + comment
    else if (os == "aos") str = "<!--  " + comment + "  -->"
    row.push(str)
  }
  return row
}