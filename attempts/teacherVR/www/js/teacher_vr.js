/* global device, SystemEx, device, ServerVR*/

'use strict';

var TeacherVR = function()
{
    var fDebug = "false"; //true only with 'true', can set on run
    var fDeviceInfoMap;
    
    var ClientType = {
          Student: 'Student',
          Teacher: 'Teacher',
          Browser: 'Browser'
    };
    
    var fClientType;// ClientType.Student;

    //---- Elements ------
    var fJsH2ClientInfoTitleElement = $('#h2_client_info_title_id');
    

    //call on new
    var fConstructor = function TeacherVR()
    {
    };
    //-------------

    
    fConstructor.init = function()
    {
        debug(DebugTypes.ConsoleInfo, '------------- Started -------------------');
        
        setTimeout(function()
        {
            setClientType();
            initMainPage();
        }, 300); //give time to the onDeviceReady()
            
    };

    var initMainPage = function()
    {
        try
        {
            //fH2ClientInfoTitleElement = document.getElementById('h2_client_info_title_id'); 
//            alert('initMainPage: DeviceInfoMap = ' + fDeviceInfoMap);
//            if (fDeviceInfoMap)// && device.platform === "Android")
//            {
//                var zUuid = fDeviceInfoMap['uuid'];
//                alert('huid =' + zUuid);
//            }
            
            setClientTypeInfo();
            
            
        }
        catch (ex)
        {
            alert("Init problem: " + ex);
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
             alert('Exception initBeforeReady: ' + ex);           
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
        {
            alert('No info for this device.');
            return;
        }
        
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
    
    var setClientType = function()
    {
        if (fDeviceInfoMap)
        {
            var zUuid = fDeviceInfoMap['uuid'];
            var zType = ServerVR.requestClientTypeFromServer(zUuid); 
            if (zType === 1)
                fClientType = ClientType.Teacher;
            else
                fClientType = ClientType.Student;
        }
        else
            fClientType = ClientType.Browser;
    };
    
    var setClientTypeInfo = function()
    { 
        if (!fClientType)
            return;
        if (fClientType === ClientType.Teacher)
        {
            fJsH2ClientInfoTitleElement[0].innerHTML = ClientType.Teacher;
        }
        else
        if (fClientType === ClientType.Student)
        {
            fJsH2ClientInfoTitleElement[0].innerHTML = ClientType.Student;
        }
        else
            fJsH2ClientInfoTitleElement[0].innerHTML = ClientType.Browser;
    };
        
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
