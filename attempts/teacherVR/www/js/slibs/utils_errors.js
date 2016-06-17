/* 
 */

'use strict';

var ErrorUtils = function()
{
    //call on new 
    var fConstructor = function ErrorUtils()
    {

    };//var fConstructor = function ErrorUtils()

    
    fConstructor.ConsoleError = function (ex, aName) 
    {
        console.error('Exception ' + aName + '\n' + (ex ? (ex.stack ? ex.stack : (ex.message ? ex.message : ex)) : '' ));
    };
    
    //=============================================
    return fConstructor;
}();

