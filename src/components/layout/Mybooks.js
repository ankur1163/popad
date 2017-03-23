import React, { Component } from 'react';
import Api from '../../utils/ApiManager.js';



class Mybooks extends Component {
    constructor(){
        super()
        this.state={
            username:"",
            mybooks:[]
            
        }
    }
    componentWillMount(){
        var username = this.state.username;
         var urlWithId =this.props.location.pathname;
        var username = urlWithId.split('/').pop();
        console.log("this.state.username",username);
        this.setState({username:username});
          Api.get('/api/books/' + username, null, (err, response) => {
            if (err) { 
                alert("Error: " + err); 
                return;
            }
        
            console.log("mybooks",response.message["0"].mybooks)
            
            this.setState({
                    mybooks: response.message["0"].mybooks
                });
                console.log("this.state.isbn",this.state.mybooks)
        
            
        });
        
    }
    handleinput(e){
       this.setState({username:e.target.value}) 
       console.log("this.state.username",this.state.username)
    }
    handleclick(e){
        console.log("button clicked")
    }
    
    componentDidMount(){
        console.log("component did mount");
        
       
        
    }
    
    render() {
        
        console.log("state",this.state.mybooks);
        var results = this.state.mybooks.map(function(i,index){
            return(
                 <div key={index} className="row resultstyle">
            <div className="col-md-1">
            </div>
            <div className="col-md-3 ">
            <img src={i.thumbnail} alt="Mountain View"  />
            </div>
            <div className="col-md-7">
            <h2>{i.title}</h2><br />
            <p>{i.description}</p><br /><br />
            <p>ISBN:{i.isbn}</p>
            </div>
            <div className="col-md-1">
           
            </div>
            
            </div>
                
                )
        })
        
        
        return(<div>
                <h2> List of books </h2>
                <input type="text" onChange={this.handleinput.bind(this)} value={this.state.username}/><button onClick={this.handleclick.bind(this)}>My books</button><br />
                {results}
                </div>);
    }
}

export default Mybooks