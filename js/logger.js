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
    console.log("Log saved");
  })
}

function getLogs(){
  console.log("getlogs not implemented yet");
}
//Daggi's first line of javascript code