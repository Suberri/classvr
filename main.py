
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

breakpoint=pdb.set_trace

class envInit:                              # add all local folder packages to the sys.path
    def __init__(self):    
        for f in os.walk('.'):
            folder=f[0]
            if os.path.isfile(os.path.join(f[0],'__init__.py')):
                sys.path.insert(0,f[0]) 
            
            
if __name__ == "__main__":
    
    # set up the system packages path
    envInit()
      
    # start database manager
    from client import clientDbMgr    
    dbMgr=clientDbMgr()
    
    # start multi thread http server
    from vrserver import mtServer
    mtServer()    
    