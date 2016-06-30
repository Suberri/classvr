
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
#from conf.conf import envInit


breakpoint=pdb.set_trace

class envInit:
    def __init__(self):    
        folderList=[] 
        for f in os.walk('.'):
            folder=f[0]
            if os.path.isfile(os.path.join(folder,'__init__.py')):
                folderList.append(folder)
        for pkg in folderList:
            sys.path.insert(0,pkg) 

def startMultiThreadsServer():
    from vrserver import mtServer
    mtServer()

def startClient():
    print ('start classvr client')       
    
if __name__ == "__main__":
    
    # set up the system packages path
    envInit()
      
    breakpoint()
    # start database manager
    from client import clientDbMgr    
    dbMgr=clientDbMgr()
    
    # start the http server
    startMultiThreadsServer() 
    