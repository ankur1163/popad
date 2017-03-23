var express = require('express');
var router = express.Router();
var PollsCtlr = require('../controllers/PollsController');
var  SendBird =require('sendbird');
var d3 = require('d3');
var sb = new SendBird({
    appId: '59BEEA34-BDC7-461B-B10B-63705C8B57C2'
});

var controllers = require("../controllers");

//start 
///api/books/r/s/' + username

router.get("/sb/:username/:channelname",function(req,res,next){
    var username = req.params.username;
    var channelname=req.params.channelname;
    console.log("reached in sb create channel")
    d3.json()
    
    
    
})

router.get("/:resource/:id/:s/:username", function(req, res, next){
    var resource = req.params.resource;

    
    var username = req.params.username;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    console.log("requestrecieved inside api.js")
    controller.findsent(username, function(err, result){
        
        if (err) {
           // 3 This DID fire :D
           
           return res.json({ confirmation: 'fail',
                message: 'Not found anything'
            });
        }
        
        // This ran as well, but later
        
        
        // So this was never sent, as the request had already been completed
        res.json({ confirmation: 'success',
            message: result
        }); 
    });
    
});


//end

//starts

//start 
//get allpins 
router.get("/:resource/all/:username", function(req, res, next){
    console.log("got in inside correct api.js")
    var resourceFrom = req.params.resource;
    var controller = controllers[resourceFrom];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.find(null, function(err, results){
        if (err){
                res.json({ confirmation: 'fail',
                    message: err
                });
                return;
            }
            res.json({ confirmation: 'success',
                    message: results
        });
    });

  
});




//end allpins


//end


router.get("/:resource/:id/:username", function(req, res, next){
    var resource = req.params.resource;

    
    var username = req.params.username;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    console.log("requestrecieved inside api.js")
    controller.findrequest(username, function(err, result){
        
        if (err) {
           // 3 This DID fire :D
           
           return res.json({ confirmation: 'fail',
                message: 'Not found anything'
            });
        }
        
        // This ran as well, but later
        
        
        // So this was never sent, as the request had already been completed
        res.json({ confirmation: 'success',
            message: result
        }); 
    });
    
});

//ends


router.get("/:resource/:id", function(req, res, next){
    console.log("fetching username mages in api.js get ")
    var resource = req.params.resource;
   
    var id = req.params.id;
    var controller = controllers[resource];
    console.log("controller is ",controller,"id is",id,"resource is ",resource)
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
   controller.findById(id, function(err, result){
        
        if (err) {
           // 3 This DID fire :D
           
           return res.json({ confirmation: 'fail',
                message: 'Not found anything'
            });
        }
        
        // This ran as well, but later
        
        
        // So this was never sent, as the request had already been completed
        res.json({ confirmation: 'success',
            message: result
        }); 
    });
    
});




router.get("/:resource", function(req, res, next){
    
    var resourceFrom = req.params.resource;
    var controller = controllers[resourceFrom];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.find(null, function(err, results){
        if (err){
                res.json({ confirmation: 'fail',
                    message: err
                });
                return;
            }
            res.json({ confirmation: 'success',
                    message: results
        });
    });

  
});
//goingfunc route 
//increase heart count

router.post("/:resource/increasecount/:username", function(req, res, next){
    console.log("increase heart enetered correctly",req.params)
    console.log("req.body.email",req.body.email,"req.body.",req.body)
    var resource = req.params.resource;
   
    var controller = controllers[resource];
    var img = req.body.img;
    
    var gobj ={"username":req.params.username,"img":req.body.img}
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    console.log(req.body);
    controller.increaseheart(gobj, function(err, result) {
        
         if (err){
             console.log(err);
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        console.log(result);
        res.json({ confirmation: 'success',
                message: result
            });
        
    });

});




//increase heart count end

router.post("/:resource/:username/:type", function(req, res, next){
    sb.connect("ank@gmail.com", function(user, error) {});
    console.log("post request type")
    var type = req.params.type;
   var username = req.params.username;
   var resource = req.params.resource;
   
   console.log("request username",username,"resource",resource,"type",type)
   console.log(">>>>>>>>>>>>>")
   
   
    d3.json("https://api.sendbird.com/v3/POST /group_channels/")
  .header("Content-Type: application/json, charset=utf8",
"Api-Token: {14e8f22a27aa1d979bc61ef5393488365436e947}").body({ "name": "Chat with Lizzy",
  "cover_url": "https://sendbird.com/main/img/cover/cover_08.jpg",
  "custom_type": "personal",
  "data": "",
  "user_ids": ["ankur", "johnny"],
  "is_distinct": true})
  .get(function(error, root) {
      
      if(error){
          console.log("there is error insb")
      }
      else{
          console.log("connection worked",root)
      }
      
    // Your code here.
  })
    
    
    
    /*
  
         if (err){
             console.log("modify request error",err);
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        console.log("modify request result",result);
        res.json({ confirmation: 'success',
                message: result
            });
        
    });
    
        
   */
    

});

//goungfunc route end

router.post("/:resource", function(req, res, next){
    var resource = req.params.resource;
   
    var controller = controllers[resource];
    
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    console.log(req.body);
    controller.create(req.body, function(err, result) {
        
         if (err){
             console.log(err);
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        console.log(result);
        res.json({ confirmation: 'success',
                message: result
            });
        
    });

});


//start 

router.post("/:resource/:username", function(req, res, next){
    console.log("req",req.body)
    console.log("params",req.params)
    var username = req.params.username;
    var title = req.body.title;
    var img = req.body.myimages;
    var resource = req.params.resource;
   console.log("entered in api.js")
    var controller = controllers[resource];
    console.log("resource",resource)
    console.log("controllers",controllers[resource]);
    console.log("image post router",title,"img",img,"resource",resource,"username",username,"controller",controller)
    var obj = {"title":title,"img":img,"resource":resource,"username":username,thosewhovoted:0}
   if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    console.log(req.body);
    controller.create(obj, function(err, result) {
        
         if (err){
             console.log(err);
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        console.log(result);
        res.json({ confirmation: 'success',
                message: result
            });
        
    });

});



//end
router.post("*", function(req, res, next){
    var url = req.url;
    console.log("here's the url",url)

});

router.put("/:resource/:id", function(req, res, next){
    
     
    var resource = req.params.resource;
    var editpoll = req.editpoll;
    
    var id = req.params.id;
    var controller = controllers[resource]; // select a controller specified in the URL
    console.log('inside API js - controller route' + controllers[resource]);
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    
    controller.update(id, req.body, function(err, result) { // call update function of specified ctlr
       console.log("this is editpoll value...",req.editpoll)
         if (err){
            res.json({ confirmation: 'fail',
                message: 'This is the fail from api.js: ' + err
            });
            return;
        }
        
        res.json({ confirmation: 'success',
                message: 'This is the ****SUCCESS**** from api.js' + JSON.stringify(result)
            });
        
    },editpoll);

});

router.delete("/:resource/:id", function(req, res, next){
    var resource = req.params.resource;

    var id = req.params.id;
    var bd = req.body;
    console.log("in api.js filen delete",resource,id)
    var controller = controllers[resource];
    var gobj = {"username":id,"img":req.body.img}
    console.log("delete gobj",gobj)
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.delete(gobj, function(err, result){
           if (err){
                res.json({ confirmation: 'fail',
                    message: 'Not found'
                });
                return;
            }
            console.log("delete api",result)
            res.json({ confirmation: 'success',
                    message: result
                });
            
    });
    
});

//"/api/books/"+rusername+"/"+susername+"/"+isbn
router.delete("/:resource/:rusername/:susername/:isbn", function(req, res, next){
    
    var resource = req.params.resource;

    var rusername = req.params.rusername;
    var susername = req.params.susername;
    var isbn = req.params.isbn;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    var obj = {"rusername":rusername,"susername":susername,"isbn":isbn}
    // call the correct controller specified by the http request
    controller.delsrequest(obj, function(err, result){
           if (err){
                res.json({ confirmation: 'fail',
                    message: 'Not found'
                });
                return;
            }
            
            res.json({ confirmation: 'success',
                    message: result
                });
            
    });
    
});

module.exports = router;