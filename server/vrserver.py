
#
# 
#
__author__ = "Moshe Suberri"
__license__ = "GPL"
__version__ = "1.0"
__email__ = "suberri@gmail.com"

import os
import sys
import pdb
import BaseHTTPServer
import Queue

pdb.set_trace()

from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
from SocketServer import ThreadingMixIn
import threading

from SimpleHTTPServer import SimpleHTTPRequestHandler
from httpReqHandler     import classvrRequestHandler
from client import clientDbMgr
from conf import classvrConfig
            
class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""
    
class mtServer():
    def __init__(self):  
        self.ServerStatus="ok"
        self.cfg=classvrConfig().cfg
        host=self.cfg['vrserver']['host']
        port=self.cfg['vrserver']['port']
        server = ThreadedHTTPServer((host, int(port)), classvrRequestHandler)
        print 'Starting server host={0} port={1}, use <Ctrl-C> to stop'.format(host, port)
        server.serve_forever()  
             
        
if __name__ == "__main__":
    mtServer()
    