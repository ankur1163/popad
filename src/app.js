import React from 'react'
import ReactDOM from 'react-dom'

import Home from './components/layout/Home.js'

import Allpins from './components/layout/Allpins';
import Lp from './components/layout/Lp'
import Totalbooks from './components/layout/Totalbooks'
import Mypins from './components/layout/Mypins';
import SB from './components/layout/SB';
import Dashboard from './components/layout/Dashboard'



import Waste from './Login/Waste.js'
import Login from './Login/Login.js'



import Container from './components/containers/Container.js';


import {Route,Router,browserHistory,hashHistory,IndexRoute} from 'react-router'
//import makeMainRoutes from './components/routes'
import AuthService from './utils/AuthService'



const mountNode = document.getElementById('root');
const auth = new AuthService('00yIamv8sN0xx4eg3PtgotR477S7YG57', 'app1163.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}


ReactDOM.render( <Router history={browserHistory}>
    <Route path="/" component={Container} auth={auth}>
    
    <IndexRoute component={Lp}  />
    <Route path="Allpins" component={Allpins} />
    <Route path="Mypins" component={Mypins} onEnter={requireAuth}/>
    <Route path="SB" component={SB} />
    <Route path="dashboard" component={Dashboard} />
   <Route path="login" component={Login} />
     </Route>
    
    
    
  </Router>,mountNode);