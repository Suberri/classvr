
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

from SimpleHTTPServer import SimpleHTTPRequestHandler
from httpReqHandler     import classvrRequestHandler
        
cfgFile='./conf/config.ini'

class classvrConfig:
   def __init__(self,cfgFile):
        import ConfigParser
        pdb.set_trace()
        Config = ConfigParser.ConfigParser()
        Config.read(cfgFile)
        print Config.sections()
        print Config.options('vrServer')
        try:
            self.Port=Config.get('vrServer', 'Port')
        except:
            self.Port=8181

        
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
    