#
# The geoRequestHandler class process a POST request to find the state given a geo point
#
__author__ = "Moshe Suberri"
__license__ = "GPL"
__version__ = "1.0"
__email__ = "suberri@gmail.com"


import json
import pdb
from SimpleHTTPServer import SimpleHTTPRequestHandler


helpMsg=r'help msg'

class classvrRequestHandler (SimpleHTTPRequestHandler) :
    
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
        
        
    def do_GET(self) :
        print "path="+self.path+"\n"
        #send response code:
        self.send_response(200)
        #send headers:
        self.send_header("Content-type:", "text/html")
        # send a blank line to end headers:
        self.wfile.write("\n")

        
    def do_POST(self):
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        print "post_body(%s)" % (post_body)
        postReqStatus,lat,lon=self.checkPostRequest(post_body)
        
        if postReqStatus != "ok":
            self.respone(postReqStatus)
        else:
            msg= "process req"
            self.respone(msg)