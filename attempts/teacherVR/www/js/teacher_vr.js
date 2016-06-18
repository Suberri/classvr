/* global device, SystemEx, device*/

'use strict';

var TeacherVR = function()
{
    var fDebug = "true"; //true only with 'true', can set on run
    
    var fDeviceInfoMap;
    

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
        if (typeof device !== "undefined")// && device.platform === "Android")
        {
            var zUuid = device.uuid;
            alert('huid =' + zUuid);
        }
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
    //http://docs.phonegap.com/en/3.0.0/cordova_device_device.model.md.html#device.model
    fConstructor.onDeviceReady = function()
    {
        
        //alert('onDeviceReady');
        debug(DebugTypes.ConsoleInfo, '-- onDeviceReady --');
        //need cordova-plugin-device and prevent update-plugins see build.xml in nbproject folder
        //this prevent not working every second send to android, after you set the plugin with
        //command in platform/android folder: cordova plugin add cordova-plugin-device
        if (typeof device !== "undefined")
        {
            //alert('device is defined');
            
            fDeviceInfoMap = {};
            fDeviceInfoMap['name'] = device.name;
            fDeviceInfoMap['cordova'] = device.cordova;
            fDeviceInfoMap['platform'] = device.platform;
            fDeviceInfoMap['uuid'] = device.uuid;
            fDeviceInfoMap['version'] = device.version;
            fDeviceInfoMap['model'] = device.model;

            if (isDebug_())        
            {
                showDeviceInfo();
            }
        }//if (typeof device !== "undefined")
            
            //navigator.app.overrideBackbutton(true);Deprecating
        document.addEventListener("backbutton", onBackClickEvent, false);
        //document.addEventListener("menubutton", onMenuClickEvent, false);
    };

    var showDeviceInfo = function()
    {
        //if (typeof device === "undefined")
        if (!fDeviceInfoMap)
            return;
        var zDeviceInfo = //JSON.stringify(fDeviceInfoMap);
                    'Device Name: '     + fDeviceInfoMap['name'] + '\n' + //'<br />'
                    'Device Cordova: '  + fDeviceInfoMap['cordova'] + '\n' +
                    'Device Platform: ' + fDeviceInfoMap['platform'] + '\n' +
                    'Device UUID: '     + fDeviceInfoMap['uuid'] + '\n' +
                    'Device Version: '  + fDeviceInfoMap['version'] + '\n' +
                    'Device Model: '    + fDeviceInfoMap['model'];
        alert(zDeviceInfo);
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
