import React, { Component } from 'react';

import Api from '../../utils/ApiManager.js';


class Recievedrequests extends Component {
    constructor(){
        super()
        this.state={
            rrequest:[]
        }
    }
    componentWillMount(){
        var urlWithId =this.props.location.pathname;
        var username = urlWithId.split('/').pop();
         Api.get('/api/books/r/' + username, null, (err, response) => {
            if (err) { 
                alert("Error: " + err); 
                return;
            }
        
            console.log('This username details from server: ' + JSON.stringify(response.message));
        
            this.setState({
                    rrequest: response.message
                });
        
            
        });
        
    }
    
    render() {
        
        var ty = this.state.rrequest.map(function(i,index){
            return(
                <div key={index} className="rr">
                {i.title}<br />
                <img src={i.thumbnail} alt="Mountain View"  /><br/>
                from:{i.requesterusername}<br />
            
                
                
                
                </div>
                )
        })
        
        return(<div>
                <h2> Requests received </h2>
                {ty}
                </div>);
    }
}

export default Recievedrequests