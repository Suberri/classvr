#
# The geoRequestHandler class process a POST request to find the state given a geo point
#
__author__ = "Moshe Suberri"
__license__ = "GPL"
__version__ = "1.0"
__email__ = "suberri@gmail.com"


import json
import pdb
from BaseHTTPServer import BaseHTTPRequestHandler
import urlparse
import threading

INVALID_REQUEST=1001

helpMsg=r'help msg'
debugInfo='off'
reqNumber=0
getReqNumber=0
postReqNumber=0


reqSchema      = { 0:'classvr',1:['debug','info','teacher','student'],2:'action'}
teacherActions = ['session-play','session-pause','session-restart','session-close']
studentActions = ['get-next']
         
                  
def  section(req,reqHanderInstance=None):
    print req
    actor=req[0]
    if actor in reqHandlers:
        if debugInfo=='on':
            return reqHanderInstance.getMsgInfo()
        else:    
            return reqHandlers[actor](req[1:],reqHanderInstance)
    elif actor in instanceReqHandlers:
        return instanceReqHandlers[actor](reqHanderInstance,req[1:])

   
def teacher(req,reqHanderInstance=None):
    global reqNumber, getReqNumber
    reqCmd='.'.join(req)
    return '*** Request Number = {0}  ***\n Got a teacher request -- {1}'.format(reqNumber,reqCmd)
   
    
    
def student(req,reqHanderInstance=None):
    global reqNumber, getReqNumber
    reqCmd='.'.join(req)
    return '*** Request Number = {0}  ***\n Got a student request - {1}'.format(reqNumber,reqCmd)

    
reqHandlers = {  'classvr':section,'teacher':teacher,'student':student}            

        
class classvrRequestHandler (BaseHTTPRequestHandler) :     
    
    def checkPostRequest(self,post_body):
        request=post_body.replace("&"," ")
        print request
        reqDict=dict([x.split('=') for x in request.split()])
        print reqDict
        
        
    def checkPath(self):
        self.reqParts=self.path.split(r'/')
        if len(self.reqParts) < 2:
            return 'invalid req'
        del self.reqParts[0]
        for i in range (0,len(reqSchema)-1):
            if self.reqParts[i] not in reqSchema[i]:
                self.errorMsg='invalid req'
                return INVALID_REQUEST
        return 0

        
    def procReq(self,reqParts):
        section=reqParts[0]
        if section in reqHandlers:
            return reqHandlers[section](reqParts[1:],self)
        else:
            return 'invalid URL'
        
    def debugReq(self,req=None):
        if req==None:
            debugInfo='off'
        debugCmd='debug.'+'.'.join(req)    
        if debugCmd in instanceReqHandlers:
            return instanceReqHandlers[debugCmd](self,req[1:])
        else:
            return 'invalid cmd'
            
    def debugInfoOn(self,req=None):
         global debugInfo
         debugInfo='on'
         return 'debugInfo ON'
        
    def debugInfoOff(self,req=None):
         global debugInfo
         debugInfo='off'
         return 'debugInfo OFF'           
        
    def getMsgInfo(self,req=None):
        global reqNumber, getReqNumber
        parsed_path = urlparse.urlparse(self.path)
        message_parts = [
                '*** Request Number = {0}  ***'.format(reqNumber),
                'THREADING VALUES:',
                '   thread Name={0}'.format(threading.currentThread().getName()),
                'CLIENT VALUES:',
                '   client_address=%s (%s)' % (self.client_address,self.address_string()),
                '   command=%s' % self.command,
                '   path=%s' % self.path,
                '   real path=%s' % parsed_path.path,
                '   query=%s' % parsed_path.query,
                '   request_version=%s' % self.request_version,
                '',
                'SERVER VALUES:',
                '   server_version=%s' % self.server_version,
                '   sys_version=%s' % self.sys_version,
                '   protocol_version=%s' % self.protocol_version,
                '',
                'HEADERS RECEIVED:',
                ]
        for name, value in sorted(self.headers.items()):
            message_parts.append('   %s=%s' % (name, value.rstrip()))
        message_parts.append('')
        return '\r\n'.join(message_parts)    
    

    def do_GET(self):
        global reqNumber, getReqNumber
        reqNumber +=1
        getReqNumber +=1
        self.errorMsg=None
        parsed_path = urlparse.urlparse(self.path)
        message = self.getMsgInfo()
        if self.checkPath() == 0:
            message=self.procReq(self.reqParts)
        else: 
           message="*** " + self.errorMsg+"\r\n"+message
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        
        self.end_headers()
        self.wfile.write(message)
        return

        
    def do_POST(self):
        global reqNumber, getReqNumber
        pdb.set_trace()
        reqNumber +=1
        postReqNumber +=1        
        print "process do_post()"
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        print "post_body(%s)" % (post_body)
        postReqStatus,lat,lon=self.checkPostRequest(post_body)
        
        if postReqStatus != "ok":
            self.respone(postReqStatus)
        else:
            msg= "process req"
            self.respone(msg)
            
instanceReqHandlers = {'info':classvrRequestHandler.getMsgInfo,
                                   'debug':classvrRequestHandler.debugReq,
                                   'debug.info.on':classvrRequestHandler.debugInfoOn,
                                   'debug.info.off':classvrRequestHandler.debugInfoOff
                                   }
