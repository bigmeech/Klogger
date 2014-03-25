var toggleSwitch = $("#toggleSwitch");
var optionsButton = $("#btnOptions");
var pageTitle = $('.log-title');
var capturedText = $('.captured');
optionsButton.attr("href","chrome-extension://"+chrome.runtime.id+"/pages/options.html");

chrome.runtime.onMessage.addListener(
    function(req,sender,res){
      //checks the request type and acts accordingly
      switch(req.type){
        case "addLog":
          addLog(req.data);
          res(req.data);
          break;
        case "getLogs":
          getLogs();
          break;
      }
})

function addLog(log){
  chrome.storage.sync.set(log,function(){
    pageTitle.text(log.pageTitle);
    capturedText.text(log.data)
  })
}

function getLogs(){
  console.log("getlogs not implemented yet");
}
//Daggi's first line of javascript code

toggleSwitch.on('click',function(){
  if(toggleSwitch.hasClass('active')){
    toggleSwitch.text("Capture Off");
    toggleSwitch.addClass("btn-danger");
    toggleSwitch.removeClass("btn-success");
  }
  else
  {
    toggleSwitch.text("Capturing...");
    toggleSwitch.addClass("btn-success");
    toggleSwitch.removeClass("btn-danger")
  }
})

$("#goToOptions").on('click',function(){

})