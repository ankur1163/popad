var Images = require("../models/Images");
var Yelpcontroller = require("../models/yelp");
var each = require("async/each")
//import each from 'async/each';
var Yelp = require('yelp');
var forEach = require('async-foreach').forEach;
var Books = require("../models/Books.js");


module.exports = {


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
    create:function(params,callback){
        console.log("entered in create")
        console.log("req",params.body);
        var username = params.username;
        var title = params.title;
        var img = params.myimages;
        var resource = params.resource;
        
        console.log(">>>>entered in images controller create");
 
        console.log(">>>image post router is here",title,"img",img,"resource",resource,"username",username)
         Books.find({"username":"ankur"}, function(err, comment){
            if (err) {
                console.log("error in disguise")
                callback(err, null); 
                return;
            }else{
                console.log("got response from mongodb",comment)
                callback(null, comment);
                
            }
            
        });
        Images.findOneAndUpdate(
            { "username": "ankur" },
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
                    callback(null, resp);
                }
            });
        
    }



};