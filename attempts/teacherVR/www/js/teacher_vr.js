/* global device, SystemEx, device*/

'use strict';

var TeacherVR = function()
{
    var fDebug = "false"; //true only with 'true', can set on run
    

    //call on new
    var fConstructor = function TeacherVR()
    {
    };
    //-------------

    
    fConstructor.init = function()
    {
        debug(DebugTypes.ConsoleInfo, '------------- Started _Sima_ -------------------');
        initMainPage();
    };

    var initMainPage = function()
    {
        
        try
        {
            
        }
        catch (ex)
        {
            
        }
        finally
        {
            
        }
    };        
    
    fConstructor.isDebug = function()
    {
        return isDebug_();
    };
    var isDebug_ = function()
    {
        return fDebug === "true";
    };
    
    var DebugTypes = 
            {
                Feedback: 'Feedback',
                ConsoleInfo: 'ConsoleInfo',
                ConsoleError: 'ConsoleError'
            };

    function debug(aType, aMsg)
    {
        if (!isDebug_())
            return;
        
        switch (aType)
        {
            case DebugTypes.Feedback:
                debugFeedback_(aMsg);
                break;

            case DebugTypes.ConsoleInfo:
                console.info(aMsg);
                break;
                
            case DebugTypes.ConsoleError:
                console.error(aMsg);
                break;
        }
    }

    fConstructor.initBeforeReady = function()
    {
        try
        {
            
            //alert('initBeforeReady');
            debug(DebugTypes.ConsoleInfo, '------------- initBeforeReady -------------------');

//            //get and set the SrvShare.Common IP and Port from the local storage
//            //set need also for mobile
//            var zIP = fConstructor.getLocalStorageIP();// SrvShare.Common.getLocalStorageIP(localStorage);
//            var zPort = SrvShare.Common.getLocalStoragePort(localStorage);

        }
        catch (ex)
        {
             alert('ex initBeforeReady: ' + ex);           
        }
    };//fConstructor.initBeforeReady = function()
    

    //never call on the browser and desktop only on device as android
    //breakpoint not work here but can use alert
    fConstructor.onDeviceReady = function()
    {
        
        //alert('onDeviceReady');
        debug(DebugTypes.ConsoleInfo, '-- onDeviceReady --');
        if (typeof device !== "undefined" && device.platform === "Android")
        {//this if work
            //alert('device.platform === "Android"');
            debug(DebugTypes.ConsoleInfo, '-- device.platform === "Android" --');
            //navigator.app.overrideBackbutton(true);Deprecating
        }    
        document.addEventListener("backbutton", onBackClickEvent, false);
        //document.addEventListener("menubutton", onMenuClickEvent, false);
    };

    //never call on the browser and desktop only on device as android
    //breakpoint not work here but can use alert
    function onBackClickEvent(aEvent)
    {
        debug(DebugTypes.ConsoleInfo, '-- onBackClickEvent --');
        //alert("-- onBackClickEvent --");     
        
        //---  ---
        if (false) 
        {
            aEvent.preventDefault();
            aEvent.stopPropagation();

            debug(DebugTypes.ConsoleInfo, '-- onBackClickEvent back to doc--');

            //if (someDialog) 
            //    someDialog.dialog("close");
            //if (isFeedback_())
            //    resetFeedback_();
            
            //showMain();
            
        }
        else
        {
            debug(DebugTypes.ConsoleInfo, '-- onBackClickEvent exit --');
            navigator.app.exitApp();//works
            
            //saveGlobals();
        }

    }                
    
    fConstructor.playVR = function()
    {
        //alert('Play VR');
        SystemEx.requestFromServer('teacher/action/session-play');
    };
    
    fConstructor.toggleServerDebug = function()
    {
        SystemEx.toggleServerDebug('debug_button_id', 'red', '');
        if (SystemEx.isServerDebugOn())
        {
            document.getElementById('debug_button_id').style.background = 'red';
        }
        else
        {
            document.getElementById('debug_button_id').style.background = '';
        }
    };
    
    //=============================================
    return fConstructor;
}();
