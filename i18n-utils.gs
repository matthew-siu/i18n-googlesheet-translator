var IOS_obj = new function(){
  this.id = "ios"
  this.sheetName = "i18n-ios";
  this.commentHeader = "/*******************************";
  this.commentFooter = "*******************************/";

  this.oneLineComment = function(comment){
    return "// " + comment;
  }

  this.keyPairCode = function(key, value){
    if (value.includes(AOS_obj.variableStr)){
      let final_val = value.replaceAll(AOS_obj.variableStr, this.variableStr)
      return '"' + key + '" = "' + final_val + '";';
    }
    return '"' + key + '" = "' + value + '";';
  }

  this.variableStr = "%@";
}

var AOS_obj = new function(){
  this.id = "aos"
  this.sheetName = "i18n-aos"
  this.commentHeader = "<!--"
  this.commentFooter = "-->"

  this.oneLineComment = function(comment){
    return "<!-- " + comment + " -->"
  }

  this.keyPairCode = function(key, value){
    if (value.includes(IOS_obj.variableStr)){
      let final_val = value.replaceAll(IOS_obj.variableStr, this.variableStr)
      return '<string name="' + key + '">' + final_val + '</string>'
    }
    return '<string name="' + key + '">' + value + '</string>'
  }

  this.variableStr = "%s";
}

// ----------------------

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
