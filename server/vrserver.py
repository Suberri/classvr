
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
from geofinder import simpleGeoFinder  
from httpReqHandler import geoRequestHandler
        
class config:
   def __init__(fileName):
        import ConfigParser
        Config = ConfigParser.ConfigParser()
        Config.read(fileName)
        print Config.sections()
        print Config.options('vrServer')
        try:
            self.Port=Config.get('vrServer', 'Port')
        except:
            self.Port=8181

        
class vrServer:
    
    def  __init__(self):
        self.ServerStatus="ok"
        HandlerClass = SimpleHTTPRequestHandler
        ServerClass  = BaseHTTPServer.HTTPServer
        Protocol     = "HTTP/1.0"

        port = 8080
        server_address = ('127.0.0.1', port)
        HandlerClass.protocol_version = Protocol
        
        try:
            self.httpd = ServerClass(server_address, geoRequestHandler)
            sa = self.httpd.socket.getsockname()
        except Exception as e: 
            self.ServerStatus="failed"
            print e
            return

        print "Serving HTTP on", sa[0], "port", sa[1], "..."
        print 'request message example: curl  -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/'    
  
  
  
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
    vrServer=vrServer()
    vrServer.run()
    