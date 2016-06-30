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
cfgFileName='./conf/config.ini'
    
class classvrConfig:
   def __init__(self,cfgFile=cfgFileName):
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

                    
              
            