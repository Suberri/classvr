#
# Process generic client requests
#
__author__ = "Moshe Suberri"
__license__ = "GPL"
__version__ = "1.0"
__email__ = "suberri@gmail.com"


import json
import pdb

error_invalid_client_record=1
error_save_db_failed=2

dbClassvr='classvr.json'

class clientDbMgr():
    def __init__(self):
        print 'client db manager: init - load client info'
        try:
           with open(dbClassvr) as data_file:    
             self.classvrDb = json.load(data_file)
        except:
           print 'database {0} not found, creating new db'.format(dbClassvr)
           self.classvrDb = {}
        
    def addClientRecord(self,cRecord):
        print 'client db manager: add client record'
        try:
           clientId=cRecord['uuid']
        except:
           print 'error: client record does not have UUID'
           return invalid_client_record
           
        self.classvrDb[clientId]=cRecord
        return self.saveDb()


    def saveDb(self):
        print 'client db manager: save db'
        try:
           with open(dbClassvr,'wb') as data_file:    
               json.dumps(self.classvrDb,data_file)
               return 0
               
        except:
           print 'Unable to write db to {0} file'.format(dbClassvr)
           return error_save_db_failed
           
           
class client():
    def initReq(self,req,reqHanderInstance):
        try:
            clientInfo=json.loads(reqHanderInstance.parsed_path.query)
        except:
            return 1,'Invalid client info'
        return 0,'ok'
              
            
            

     
