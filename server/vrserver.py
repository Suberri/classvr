
#
# TLaunch a simple http server and use geoRequestHandler to process the thhp requests
#
__author__ = "Moshe Suberri"
__license__ = "GPL"
__version__ = "1.0"
__email__ = "suberri@gmail.com"

import os
import sys
import pdb
import BaseHTTPServer

from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
from SocketServer import ThreadingMixIn
import threading


from SimpleHTTPServer import SimpleHTTPRequestHandler
from httpReqHandler     import classvrRequestHandler
        
cfgFile='./conf/config.ini'


    
class classvrConfig:
   def __init__(self,cfgFile):
        import ConfigParser
        self.cfg={}
        self.cfg['vrserver']={'port':'8080','host':'localhost'}
        config = ConfigParser.ConfigParser()
        config.read(cfgFile)
        for section in config.sections():
           if not section in self.cfg:  # make sure not to overite the default values
                self.cfg[section]={}
           for option in config.items(section):
              oName=option[0]
              oValue=option[1]
              self.cfg[section][oName]=oValue
            
            
class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""
    
 
class mtServer():
    def __init__(self):  
        self.ServerStatus="ok"
        self.cfg=classvrConfig(cfgFile).cfg
        host=self.cfg['vrserver']['host']
        port=self.cfg['vrserver']['port']
        server = ThreadedHTTPServer((host, int(port)), classvrRequestHandler)
        print 'Starting server host={0} port={1}, use <Ctrl-C> to stop'.format(host, port)
        server.serve_forever()  
        
class classvrServer:
    def  __init__(self):
        self.ServerStatus="ok"
        cfg=classvrConfig(cfgFile)
        HandlerClass = SimpleHTTPRequestHandler
        ServerClass  = BaseHTTPServer.HTTPServer
        Protocol     = "HTTP/1.0"

        port = 8080
        server_address = ('127.0.0.1', port)
        HandlerClass.protocol_version = Protocol
        
        try:
            self.httpd = ServerClass(server_address, classvrRequestHandler)
            sa = self.httpd.socket.getsockname()
        except Exception as e: 
            self.ServerStatus="failed"
            print e
            return

        print "Serving HTTP on", sa[0], "port", sa[1], "..."
  
  
    def  run(self):
        if self.ServerStatus=="ok":
            try:
                self.httpd.serve_forever()    
            except KeyboardInterrupt:
                print "exit - keyboard interrupt received"
                self.httpd.server_close()
            except Exception as e: 
                print e
        
        
if __name__ == "__main__":
    pdb.set_trace()
    vrServer=classvrServer()
    vrServer.run()
    