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
from geofinder import simpleGeoFinder  


helpMsg=r'request message example: curl  -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/'
geoFinder=simpleGeoFinder("states.json")    

class geoRequestHandler (SimpleHTTPRequestHandler) :
    
    def respone(self,msg):
        self.send_response(200)
        #send headers:
        self.send_header("Content-type:", "text/html")
        # send a blank line to end headers:
        self.wfile.write("\n")
        self.wfile.write(msg)
        
    
    def checkPostRequest(self,post_body):
        strCordinate=post_body.replace("&"," ")
        print strCordinate
        jsonCordinate=dict([x.split('=') for x in strCordinate.split()])
        print jsonCordinate
        
        latitude=longitude=None
        postReqStatus="ok"
        try:  
           latitude=jsonCordinate['latitude']
        except: 
           postReqStatus="ERROR: invalid request - missing 'latitude'\n" + helpMsg
           return  postReqStatus,latitude,longitude
           
        try: 
           longitude=jsonCordinate['longitude']
        except: 
           postReqStatus= "ERROR invalid request - missing 'longitude'\n"  + helpMsg 
           return  postReqStatus,latitude,longitude
        
        try: 
            latitude=float(latitude)
            longitude=float(longitude)
        except:
            postReqStatus= "Invalid coordinates - must be numbers\n" +  helpMsg      
   
        return  postReqStatus,latitude,longitude
   
        
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
            msg=geoFinder.findState(lon,lat)
            if msg !=None:
                msg= "The provided geo point is in: {0}".format(msg)
            else:    
                msg= "No state found for the The provided geo point"
            self.respone(msg)