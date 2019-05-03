//USEUNIT GlobalVariables
var psPath = ProjectSuite.Path;
var timeStamp;

//Count = 2
(function createTimeStamp(){
  var dt = new Date();
  timeStamp = dt.toLocaleString().replace(/:/g,"_").replace(/,/g,"").replace(/\//g,"_").replace(/ /g,"_");
  timeStamp = timeStamp.substr(0, timeStamp.indexOf("GMT")-1);
  //Log.Message("timeStamp", timeStamp);
})();

//this function waits until the element is loaded and returns the element found otherwise posts error to the log.
function waitForElement(prpName,prpValue,loopCounter=100,delay=500) {
  //Delay(100);
  var element;
  for(var i=0;i<loopCounter;i++) {
    element = Sys.Find(prpName,prpValue,1000,true);
    if(element.Exists && element.Enabled /*&& element.VisibleOnScreen*/) {
      return element;
    }
    Delay(delay);
  }
  if(!(element.Exists && element.Enabled /*&& element.VisibleOnScreen*/)) {
    Log.Error("Element with property ' "+ prpName +" : "+ prpValue + " ' not found.");
    //logFail("Find Element","Element with property ' "+ prpName +" : "+ prpValue + " ' not found.");
  }
  return element;
}


//this function waits until the child element of the specified parent element is loaded and returns the element found otherwise posts error to the result log.
function waitForChildElement(parentObj, prpName, prpValue, loopCounter=100, delay=500) {
  Delay(500);
  var element;
  for(var i=0;i<loopCounter;i++) {
    element = parentObj.Find(prpName,prpValue,1000,true);
    if(element.Exists && element.Enabled /*&& element.VisibleOnScreen*/) {
      return element;
    }
    Delay(delay);
  }
  if(!(element.Exists && element.Enabled /*&& element.VisibleOnScreen*/)) {
    Log.Error("Element with property ' "+ prpName +" : "+ prpValue + " ' not found.");
    //logFail("Find Element","Element with property ' "+ prpName +" : "+ prpValue + " ' not found.");
  }
  return element;
}

//function to verify element exists
function verifyChildElement(parentObj, prpName, prpValue, loopCounter=120, delay=500) {
  var element;
  for(var i = 0; i<loopCounter ; i++) {
    element = parentObj.Find(prpName, prpValue, 1000, true);
    if(element.Exists && element.Enabled /*&& element.VisibleOnScreen*/) {
      return element;
    }
    Delay(delay);
  }
  return element;
}


//Function to verify the element
//count = 4
function verifyElement(prpName, prpValue, loopCounter=120, delay=500){
  var element;
    for(var i=0;i<loopCounter;i++) {
      element = Sys.Find(prpName,prpValue,1000,true);
      if(element.Exists && element.Enabled /*&& element.VisibleOnScreen*/) {
        return element;
      }
      Delay(delay);
    }
    return element; 
}
//this function sends input required and send keystroke tab for the object
function send_Keys(input){
  //var wscript = getActiveXObject("WScript.Shell");
  if(equal(input, undefined)){
    //wscript.SendKeys("{Tab}");
    WshShell.SendKeys("{Tab}");
  }else{
    //wscript.SendKeys(input);
    WshShell.SendKeys(input);
  }
}

//this function returns the current date and time.
function Date_and_Time(){
  var date = new Date(),
    year = date.getFullYear(),
    month = (date.getMonth() + 1).toString(),
    formatedMonth = (month.length === 1) ? ("0" + month) : month,
    day = date.getDate().toString(),
    formatedDay = (day.length === 1) ? ("0" + day) : day,
    hour = date.getHours().toString(),
    formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
    minute = date.getMinutes().toString(),
    formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
    second = date.getSeconds().toString(),
    formatedSecond = (second.length === 1) ? ("0" + second) : second;
    var finalDate = formatedDay + "-" + formatedMonth + "-" + year + " " + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
    //var finalDate = formatedHour + ':' + formatedMinute + ':' + formatedSecond;
    //var finalDate = [formatedDay, formatedMonth, year, formatedHour,formatedMinute,formatedSecond];
    //Log.Message(finalDate);
    finalDate = VarToStr(finalDate);
    return finalDate;
}

var resFolderPath;
var dataSetPath ;
// this function will create the result folder
function CreateResultFolder() {
  var fso = getActiveXObject("Scripting.FileSystemObject");
  resFolderPath = psPath+"ExecutionResults\\Result_" + timeStamp;
  //Log.Message(resFolderPath);
  //resFolderPath = resFolderPath.substr(0,resFolderPath.indexOf("GMT")-1);
  resFolderPath = resFolderPath.replace(/\\/g,"\\\\");
  
  //Log.Message(resFolderPath);
  if (! fso.FolderExists(resFolderPath)){
    fso.CreateFolder(resFolderPath);
  }
  Log.Message("Result Folder Path.",resFolderPath)
};


function CreateDataSetFolder() {
  var fso = getActiveXObject("Scripting.FileSystemObject");
  dataSetPath = psPath+"DataSet\\SQLData_" + timeStamp;
  //Log.Message(resFolderPath);
  //resFolderPath = resFolderPath.substr(0,resFolderPath.indexOf("GMT")-1);
  dataSetPath = dataSetPath.replace(/\\/g,"\\\\");
  
  //Log.Message(resFolderPath);
  if (! fso.FolderExists(dataSetPath)){
    fso.CreateFolder(dataSetPath);
  }
  Log.Message("Result Folder Path.",dataSetPath)
};


function creatingCSVFile(fileName)
  {
    GlobalVariables.dataSetPath= psPath+"DataSet\\"+fileName+".csv";
    Log.Message(GlobalVariables.dataSetPath)
    if (aqFile.Create(GlobalVariables.dataSetPath) == 0)
    {
    Log.Message("The file "+fileName+".csv is created successfully.");
    }
    else 
    {
     Log.Error("The file was not created.");
    }
  }

function getTableRowNum(){
  GlobalVariables.simApp  = waitForElement("Name",'Process("javaw")');
  var tableRowCount = waitForChildElement(GlobalVariables.simApp,"Name",'SwingObject("SimTable", "", 0)').getRowCount();
  //Log.Message(tableRowCount);
  return tableRowCount;
}
 
  
  
