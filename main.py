
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

packages=['server','api','conf']


def startServer():
    from vrserver import classvrServer
    from vrserver import classvrConfig
    print ('start classvr server')
    vrServer=classvrServer()
    vrServer.run()



def startClient():
    print ('start classvr client')
   
if __name__ == "__main__":  
    for pkg in packages:
        sys.path.insert(0,pkg)  
    startServer() 
    