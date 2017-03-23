import React, { Component } from 'react';
import d3 from 'd3';
import Api from '../../utils/ApiManager.js';




/*
username:{string},
task:[{id:number,title:string,startdate:date,enddate:date,
description:string,files:string,whocanseethisproject:[string],
priority:string,notifications:string,repeat:string,tags:[],
reminders[{time,username}]






*/

/* Example Group Channel
{
  "name": "Chat with Lizzy",
  "cover_url": "https://sendbird.com/main/img/cover/cover_08.jpg",
  "custom_type": "personal",
  "data": "",
  "user_ids": ["terry5", "elizabeth2"],
  "is_distinct": true
}
*/

class SB extends Component {
    constructor(){
        super()
        this.state={
            createroom:"",
            username:""
        }
    }
    
    
    componentWillMount(){
        var username = localStorage.getItem("profile");
        console.log("local storage profile",username)
        
       

    }
    createroom(e){
        this.setState({createroom:e.target.value})
    }
    createnewroom(){
         var username = this.state.username;
         var channelname= this.state.createroom;
         console.log("room name",channelname)
             Api.post(`api/sb/ankur/${channelname}`, (err, response) => {
                if (err) { 
                    alert("Error: " + err); 
                    return;
                }
            console.log("response from server",response);
             
              
              this.setState({myimages:response.message})
            
                
            });
        
        /*
        
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
          console.log("there is error")
      }
      else{
          console.log("connection worked",root)
      }
      
    // Your code here.
  })
  
  */
    }
    
    render() {
        
        //const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return(<div>
                <h2> sendbird page is here </h2>
                <div className="container">
                <div className="row">
                    <div className="col-md-4 usersl">
                    Users
                    </div>
                    <div className="col-md-8">
                    Chat
                    </div>
                
                
                </div>
                <input type="text" value ={this.state.createroom} onChange={this.createroom.bind(this)} />
                <button onClick={this.createnewroom.bind(this)}>Create new room</button>
                
                
                </div>
                </div>);
    }
}

export default SB