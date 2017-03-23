import React, { Component } from 'react';
import {Link} from 'react-router'; 
var Masonry = require('react-masonry-component');
var FontAwesome = require('react-fontawesome');
import Api from '../../utils/ApiManager.js';
import $ from 'jquery';
var shortid = require('shortid');
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

var masonryOptions = {
    transitionDuration: 0
};

class Allpins extends Component {
    constructor(){
      super()
      
        this.state={
            myimages:[{img:"https://dri2.img.digitalrivercontent.net/Storefront/Site/msusa/images/promo/PC/en-MSUSA-PC-Mod-G-FY17-Holiday-16-Theme-PC-Pages-V2-tablet.png",hearts:3,title:"pc",thosewhovoted:[]},
                     {img:"https://cdn1.pcadvisor.co.uk/cmsdata/reviews/3621086/Asus_X555LA-XX290H_budget_laptop_800_thumb800.jpg",hearts:5,title:"laptop",thosewhovoted:[]},
                     {img:"http://www.metrotomountain.com/assets/images/mountains/eagleCliff_447.jpg",hearts:12,title:"new pc",thosewhovoted:[]},
            ],
            isOpen: false,
            inputurl:"",
            title:"",
            img:"",
            username:""
            
                    
         }
   
                                
      
     }
     
     handleimg(e){
         this.setState({img:e.target.value})
         
     }
     
     handletitle(e){
         
         this.setState({title:e.target.value})
     }
     
     openmodal(){
         this.setState({isOpen:true})
     }
     handledelete(e){
        console.log("handle delete")
         var obj = localStorage.getItem("profile")
        var img = e.target.id;
        var parobj = JSON.parse(obj);
        var username = parobj.email;
        
         
         this.setState({username:username})
         
           var gobj ={"img":img}
         
             Api.del(`/api/Images/${username}`, gobj, (err, response) => {
                if (err) { 
                    
                    return;
                }
            
             else{
               console.log("here is response after deleting",response)
               var obj = this.state.myimages;
               var index ;
               for(var i =0;i<obj.length;i++){
                 if(obj[i].img===img){
                   index =i;
                 }
               }
               
               var newobj =obj.splice(index,1);
              this.setState({myimages:obj})
             }
              
            
                
            });
       
     }
    
     addDefaultSrc(e){
         e.target.src = 'http://www.bleachchemgroup.com/Admin/Gallery_img/image-not-available.jpg'
     }
     handleheart(e){
         console.log("handle heart")
         var obj = localStorage.getItem("profile")
        var img = e.target.id;
        var parobj = JSON.parse(obj);
        var username = parobj.email;
        
         
         this.setState({username:username})
         
           var gobj ={"img":img}
         
             Api.post(`/api/Images/increasecount/${username}`, gobj, (err, response) => {
                if (err) { 
                    
                    return;
                }
            
             
              
              this.setState({myimages:response.message.myimages})
            
                
            });
     }
     
                 openModal = () => {
              this.setState({
                isOpen: true
              });
            };
             
            hideModal = () => {
              this.setState({
                isOpen: false
              });
              
              
              
            };
            saveModal = () => {
              this.setState({
                isOpen: false
              });
                var obj = localStorage.getItem("profile")
        
              var parobj = JSON.parse(obj);
              var username = parobj.email;
        
         
         this.setState({username:username})
              
              
              var img = this.state.img;
              var title =this.state.title;
              var obj = {myimages:img,title:title,thosewhovoted:""};
              
              
                  Api.post(`/api/Images/${username}`, obj, (err, response) => {
                if (err) { 
                    
                    return;
                }
            
             
              
              this.setState({myimages:response.message})
            
                
            });
              
              
            };
            
            
            
            
      
      componentWillMount(){
        console.log("this.props.auth",this.props.auth)
        if(localStorage.getItem("profile")!==null){
          console.log("we have something in profile")
          
        var obj = localStorage.getItem("profile")
        
        var parobj = JSON.parse(obj);
        var username = parobj.email;
        
         
         this.setState({username:username})
          
        }
        else{
          
        }
        
        
          
          
            Api.get('/api/Images/all/' + username, null, (err, response) => {
            if (err) { 
                console.log("there is error in fetching images")
                return;
            }
        
            if(response.message){
                var farr = [];
                
                for(var i =0;i<response.message.length;i++){
                    farr.push(response.message[i].myimages)
                }
                console.log("farr",farr)
                //[[{1}],[{1},{2},{3},{4}]]
                var tarr = [];
                for(var i =0;i<farr.length;i++){
                    console.log("farr.length",farr.length)
                    for(var j=0;j<farr[i].length;j++){
                        console.log("farr[i].length",farr[i].length)
                        console.log("farr[i][j]",farr[i][j])
                        tarr.push(farr[i][j])
                    }
                    
                }
               console.log("tarr",tarr)
            this.setState({
                    myimages: tarr
                });
                
                //jquery starts 
                  
                
                //jquery ends
              
            }
            else{
              
            }
            
                
        
            
        });
        
     

          
      }
 
    render() {
      console.log("this.state",this.state)
        var handleheart = this.handleheart.bind(this);
        var handledelete = this.handledelete.bind(this);
        var addDefaultSrc = this.addDefaultSrc.bind(this);
     
     /*
      var URL1 = "https://dri2.img.digitalrivercontent.net/Storefront/Site/msusa/images/promo/PC/en-MSUSA-PC-Mod-G-FY17-Holiday-16-Theme-PC-Pages-V2-tablet.png";
      var URL2 = "https://cdn1.pcadvisor.co.uk/cmsdata/reviews/3621086/Asus_X555LA-XX290H_budget_laptop_800_thumb800.jpg";
      var URL3 ="http://www.metrotomountain.com/assets/images/mountains/eagleCliff_447.jpg";
      var URL4 ="http://www.metrotomountain.com/assets/images/mountains/eagleCliff_447.jpg";
      var URL5 ="http://www.metrotomountain.com/assets/images/mountains/eagleCliff_447.jpg";
      var URL6 ="http://www.metrotomountain.com/assets/images/mountains/eagleCliff_447.jpg";
      
      //image-element-class
      const elements = [{src: URL1,title:"first",hearts:3}, {src: URL2,title:"second",hearts:5}, {src: URL3,title:"third",hearts:7},{src: URL4,title:"second",hearts:5}, {src: URL5,hearts:9}, {src: URL6,hearts:3}];
        
          <button onClick={this.openmodal.bind(this)}> Add new Pins</button>
                               <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                  <ModalHeader>
                    <ModalClose onClick={this.hideModal}/>
                    <ModalTitle>Add new pin</ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                    <p>Image url</p> <input type="text" onChange={this.handleimg.bind(this)} value={this.state.img} /><br />
                    <p>Title</p> <input type="text" onChange={this.handletitle.bind(this)} value={this.state.title} />
                  </ModalBody>
                  <ModalFooter>
                    <button className='btn btn-default' onClick={this.hideModal}>
                      Close
                    </button>
                    <button className='btn btn-primary' onClick={this.saveModal.bind(this)}>
                      Save changes
                    </button>
                  </ModalFooter>
                </Modal>
        
        */
        var childElements = this.state.myimages.map(function(element,i){
           return (
               <div key={shortid.generate()}>
               
                
                <li  id={element.img} className="thumbnail article">
                    <img onError={addDefaultSrc} src={element.img} /><br/>
                    <h4>{element.title}</h4><i id={element.img}  className="fa fa-heart" aria-hidden="true"></i>{element.hearts} &emsp;&emsp;
                   
                    
                    
                </li>
                </div>
                
            );
        });
       
        
        return(<div>
        
                <Link to= "/">Home</Link>
                <h2> My pins are here, go </h2>
                <h2> To give hearts to images , Please login</h2>
                
                
              
                <Masonry
                className={'my-gallery-class'} // default '' 
                elementType={'ul'} // default 'div' 
                options={masonryOptions} // default {} 
                disableImagesLoaded={false} // default false 
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
                >
                    {childElements}
                </Masonry>
            </div>);
    }
}

export default Allpins