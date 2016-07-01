/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global device, SystemEx, device*/

'use strict';

var ServerVR = function()
{
    var fIP;
    var fPort;
    
    //call on new
    var fConstructor = function TeacherVR()
    {
    };
    //-------------
    
    fConstructor.requestClientTypeFromServer = function(aID)
    {
        return 1;
    };

    fConstructor.setIP = function(aIP)
    {
        fIP = aIP;
    };
    fConstructor.setPort = function(aPort)
    {
        fPort = aPort;
    };

    var fXmlHttp;
    var fCallBack;
    fConstructor.initHttpGet = function()
    {
        fXmlHttp = new XMLHttpRequest(); 
        fXmlHttp.onreadystatechange = processRequest;
    };

    fConstructor.requestGetFromServer = function (aRequest, aCallBack)
    {
        requestGetFromServer_(aRequest, aCallBack);
    };

    //moshe_ i need to send my id and to get it back from you
    //var zUrl = 'http://' + fIP + ':' + fPort + '/classvr/    int?{device: {}}';
    var requestGetFromServer_ = function (aRequest, aCallBack)
    {
        fCallBack = aCallBack;
        var zUrl = 'http://' + fIP + ':' + fPort + '/classvr/' + aRequest;
        fXmlHttp.open( "GET", zUrl, true );
        fXmlHttp.send( null );
    };

    var processRequest = function() 
    {
        if (fXmlHttp.readyState !== 4)
            return;
        if ( fXmlHttp.status === 200 ) 
        {
            //if ( fXmlHttp.responseText === "Not found" ) 
            fCallBack(true, fXmlHttp.responseText);
        }
        else
            fCallBack(false, 'Error: ' + fXmlHttp.status);
    };
        
    //=============================================
    return fConstructor;
}();

