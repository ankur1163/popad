var Images = require("../models/Images");
var Yelpcontroller = require("../models/yelp");
var each = require("async/each")
//import each from 'async/each';
var Yelp = require('yelp');
var forEach = require('async-foreach').forEach;
var Books = require("../models/Books.js");


module.exports = {
    
    find: function(id, callback) {
        console.log("image controller find all pins ",id)
        var dataarray = [];
        Images.find(null,function(err,data){
                if(err){
                    console.log("there is err in fetching data for images")
                    callback(err,null)
                }
                else{
                    callback(null,data)
                }
            })
            
    },


    findById: function(id, callback) {
        console.log("nside image controller",id)
        var dataarray = [];
        Images.findOne({
                username:id
            },function(err,data){
                if(err){
                    console.log("there is err in fetching data for images")
                    callback(err,null)
                }
                else{
                    callback(null,data)
                }
            })
            
    },

    modify: function(params, callback) {

        
        
        

    },
    increaseheart:function(params,callback){
        console.log("entered in imagescontroller increaseheart")
        console.log("params.username",params.username);
        console.log("params.img",params.img);
        
        var username = params.username;
        
        var img = params.img;
        
        
        
 
        console.log(">>>increaae heart","img",img,"username",username)
         
         Images.findOneAndUpdate(
            //{ "username": username,"myimages": { $elemMatch: { "img":img } } },
            { "username": username,"myimages": { $elemMatch: { "img":img } }},
            {
                $inc: { 'myimages.$.hearts' : 1 }
                
            },
            {
                new: true,   // return new doc if one is upserted
                upsert: true // insert the document if it does not exist
            },
            function (err, resp) {
                if (err) {
                    console.log("there is err in image controller");
                    callback(err, null);
                } else {
                    console.log("good in image controller",resp);
                    callback(null, resp);
                }
            });
        
    },
    create:function(params,callback){
        console.log("entered in create")
        console.log("req",params.body);
        console.log("params",params)
        var username = params.username;
        var title = params.title;
        var img = params.img;
        var resource = params.resource;
        
        console.log(">>>>entered in images controller create");
 
        console.log(">>>image post router is here",title,"img",img,"resource",resource,"username",username)
         
        Images.findOneAndUpdate(
            { "username": username },
            {
                $push: { "myimages": { "img": img, "hearts": 0, "title": title } }
            },
            {
                new: true,   // return new doc if one is upserted
                upsert: true // insert the document if it does not exist
            },
            function (err, resp) {
                if (err) {
                    console.log("there is err in image controller");
                    callback(err, null);
                } else {
                    console.log("good in image controller");
                    callback(null, resp.myimages);
                }
            });
        
    },
     /*
         
        Images.remove(
            { "username": username,"myimages": { $elemMatch: { "img":img } } },
            
            {
                new: true,   // return new doc if one is upserted
                upsert: true // insert the document if it does not exist
            },
            function (err, resp) {
                if (err) {
                    console.log("there is err in image controller");
                    callback(err, null);
                } else {
                    console.log("good in image controller");
                    callback(null, resp.myimages);
                }
            });
            if(err){
                            console.log("there is error ")
                        }
                        else{
                            console.log("we removed it ")
                            callback(null,{"got removed":true})
                        }
            */
    delete:function(params,callback){
        console.log("entered in delete")
        console.log("params",params);
        var username = params.username;
        var img = params.img;
        
        console.log("img",img,"username",username)
        Images.findOneAndUpdate(
                { "username": username },
                { $pull: { "myimages": { "img": img } } },
                {
                new: true   // return new doc if one is upserted
               
            },
                (err, doc) => {
                    if(err) {
                        return callback(err,null);
                    }
                    console.log("after deleting$$$$",doc)
                    callback(null, doc.myimages);
                }
);
    }
        
}
    