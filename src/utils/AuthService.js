// src/utils/AuthService.js
import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

export default class AuthService  {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'https://fcc-pinterest-app-1163.herokuapp.com/login',
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    console.log("this in authservice",this)
    this.setToken(authResult.idToken)
    console.log("going to call profile from auth0")
    console.log("this in authservice.js",this)
    console.log("this.lock.getprofile",this.lock.getProfile)
    // navigate to the home route
    browserHistory.replace('/Mypins')
      this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        console.log("authenticated success")
        this.setProfile(profile)
      }
    })
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }
  
  
  
   setProfile(profile) {
    // Saves profile data to local storage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    console.log("iside set profile function")
    this.emit('profile_updated', profile)
  }

  getProfile() {
    // Retrieves the profile data from local storage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  }
}