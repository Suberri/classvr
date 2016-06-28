/* global device, SystemEx, device, ServerVR*/

'use strict';

var TeacherVR = function()
{
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
        debug(SystemEx.DebugTypes.ConsoleInfo, '------------- Started -------------------');
        
        SystemEx.addDebugClientChangedEvent(debugClientChangedEvent);
        
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
    
    fConstructor.isClientDebug = function()
    {
        return isClientDebug_();
    };
    var isClientDebug_ = function()
    {
        return SystemEx.isClientDebugOn();
    };

    var debug = function(aType, aMsg)
    {
        SystemEx.debug(aType, aMsg);
    };
    
    fConstructor.initBeforeReady = function()
    {
        try
        {
            
            //alert('initBeforeReady');
            debug(SystemEx.DebugTypes.ConsoleInfo, '------------- initBeforeReady -------------------');

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
        debug(SystemEx.DebugTypes.ConsoleInfo, '-- onDeviceReady --');
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

            if (isClientDebug_())        
            {
                showDeviceInfo();
            }
        }//if (typeof device !== "undefined")
            
            //navigator.app.overrideBackbutton(true);Deprecating
        document.addEventListener("backbutton", onBackClickEvent, false);
        //document.addEventListener("menubutton", onMenuClickEvent, false);
    };//fConstructor.onDeviceReady = function()

    fConstructor.showDeviceInfo = function()
    {
        showDeviceInfo_();
    };
    
    var showDeviceInfo_ = function()
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
        debug(SystemEx.DebugTypes.ConsoleInfo, '-- onBackClickEvent --');
        //alert("-- onBackClickEvent --");     
        
        //---  ---
        if (false) 
        {
            aEvent.preventDefault();
            aEvent.stopPropagation();

            debug(SystemEx.DebugTypes.ConsoleInfo, '-- onBackClickEvent back to doc--');

            //if (someDialog) 
            //    someDialog.dialog("close");
            //if (isFeedback_())
            //    resetFeedback_();
            
            //showMain();
            
        }
        else
        {
            debug(SystemEx.DebugTypes.ConsoleInfo, '-- onBackClickEvent exit --');
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
        SystemEx.toggleServerDebug('debug_server_button_id', 'red', '');
    };

    fConstructor.toggleClientDebug = function()
    {
        SystemEx.toggleClientDebug('debug_client_button_id', 'red', '');
    };

    var debugClientChangedEvent = function ()
    {
        if (SystemEx.isClientDebugOn())
        {
            document.getElementById('show_device_info_button_id').style.display = 'block';
        }
        else
        {
            document.getElementById('show_device_info_button_id').style.display = 'none';
        }
    };
    
    //=============================================
    return fConstructor;
}();
