//USEUNIT GlobalVariables
//USEUNIT Generic
////this function enters "Username" text field.
function enter_UserName(uName) {
 var username = waitForElement("Name", 'Textbox("edt_username")');
 username.Keys("^a[BS]");
 username.Keys(uName)
}

//this function enters "Username" text field.
function enter_Password(pwd) {
  waitForElement( "Name",'PasswordBox("edt_pwd")').Keys(pwd);
}

function clickOnOkBtn()
{
   var ele = waitForElement( "Name",'Button("imgLoginBtn")');
   Log.Message(ele.GetText());
   ele.Click();
}

function clickOnLoginBtn()
{
   var ele = waitForElement( "contentText",'Login');
  // Log.Message(ele.GetText());
   ele.Click();
}

function clickOnUniversalSceGradeBtn()
{
  // var ele = waitForElement( "contentText",'Expended Universal Science Grade 8');
   var ele = Sys.Browser("iexplore").Page("http://10.10.14.81:2048/gelato-old/index.html#/library").Panel(0).Panel(0).Panel(2).Panel(0).Panel(0).Panel(0).Panel(0);
  // Log.Message(ele.GetText());
   ele.Click();
}


function enterEmailId(emailId)
{
    waitForElement( "Name",'EmailInput("userEmail")').Keys(emailId);
}
function launchAndLogin(){
  Browsers.Item(btIExplorer).Run();
  Browsers.Item(btIExplorer).Navigate(GlobalVariables.url);
  enterEmailId(GlobalVariables.emailId)
  clickOnLoginBtn();
//  enter_UserName(GlobalVariables.userName);
//  enter_Password(GlobalVariables.password);
//  clickOnOkBtn();
}

function TestDemo()
{
  launchAndLogin();
}


function FlashConfig()
{
  // Add FlashInjector folder to the list of trusted locations and post the list to the test log
  Options.FlashSettings.AddTrustedLocation(aqEnvironment.GetEnvironmentVariable("ProgramFiles") + "\\SmartBear\\TestComplete 14\\Open Apps\\Flex");
  Log.Message(Options.FlashSettings.FlashTrustedLocations);

}
