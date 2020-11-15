import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import BragContext from '../BragContext';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import Swal from 'sweetalert2';
import './login.css';

export default class LogIn extends Component {
  static contextType = BragContext;

  handleSubmit = ev => {
    ev.preventDefault()
    this.context.clearError();
    const { username, password } = ev.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
  
        const token = TokenService.getAuthToken();
        const decoded = jwt_decode(token);
        const newUser = {
          id: decoded.user_id,
          username: decoded.sub,
          avatar: decoded.avatar,
          total_wins: decoded.total_wins,
          total_losses: decoded.total_losses,
        };
        this.context.setUser(newUser);
        this.setAll();
        this.props.history.push('/profile');

      })
      
      .catch(res => {
        this.context.setError(res.error)
        username.value = ''
        password.value = ''
        Swal.fire({
          icon: 'error',
          title: res.error,
          text: 'Please try again.'
        })
      })
  }

  setAll() {
    AuthApiService.getFriends(this.context.user.id)
      .then((data) => {
        if(data !== 'No friends set up.'){
          this.context.setFriends(data);
        }
      })
      .catch(this.context.setError);
    AuthApiService.getWagers(this.context.user.id)
      .then((data) => {
        this.context.setWagers(data);
      })
      .catch(this.context.setError);
    
  }
    render() {
        
        return(
          <>
          <div className='login' id='login'>
            <h3>Log In</h3>
            <h4>For testing purposes you may use Username: "Username" Password: "password" which are both case sensitive.</h4>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor='username'>Username:</label>
                <input required type='text' name='username' id='username' placeholder='Username' />
              </div>
              <div>
                <label htmlFor='password'>Password:  </label>
                <input required type='password' name='password' id='password' placeholder='Password'/>
              </div>
              <br/>
              <button type='submit' >Log In</button>
            </form>        
          </div>
          </>
        )
      }
}