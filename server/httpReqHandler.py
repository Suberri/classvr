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


helpMsg=r'help msg'


reqSchema      = { 0:'classvr',1:['teacher','student'],2:'action'}
teacherActions = ['session-play','session-pause','session-restart','session-close']
studentActions = ['get-next']


         
                  
class section():
    def __init__(self,req):
        print req
        actor=req[0]
        return reqProc[actor](req[1:])
   

class teacher():
    def __init__(self,req):
        print req
       

reqProc= {  'classvr': section,'teacher': teacher}
      
        
class classvrRequestHandler (BaseHTTPRequestHandler) :
    
    def respone(self,msg):
        self.send_response(200)
        #send headers:
        self.send_header("Content-type:", "text/html")
        # send a blank line to end headers:
        self.wfile.write("\n")
        self.wfile.write(msg)
        
    
    def checkPostRequest(self,post_body):
        request=post_body.replace("&"," ")
        print request
        reqDict=dict([x.split('=') for x in request.split()])
        print reqDict
        
        
    def checkPath(self):
        self.reqParts=self.path.split(r'/')
        if len(self.reqParts) == 0:
            return 'invalid req'
        del a[0]
        print self.reqParts
        for i in range (0,len(reqSchema)):
            if self.reqParts[i] not in reqSchema[i]:
                return 'invalid req'
        return 'ok'
            
    def do_GET(self):
        parsed_path = urlparse.urlparse(self.path)
        message_parts = [
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
        message = '\r\n'.join(message_parts)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(message)
        return

        
    def do_POST(self):
        pdb.set_trace()
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