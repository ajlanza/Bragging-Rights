import React, { Component } from 'react';
import data from '../../Assets/data';
import BragContext from '../BragContext';

export default class LogIn extends Component {
  static contextType = BragContext;

  handleSubmit = ev => {
    ev.preventDefault()
    
    const username = ev.target.username.value;
    const password = ev.target.password.value;
    
    const correctPassword = data.bettors[0].password;
    const correctUsername = data.bettors[0].nickname;

    if(username === correctUsername && password === correctPassword){
      this.context.setAuthorized(true);
      this.props.history.push('/bets');
    }
    
  }
    render() {
    
        return(
          <div className='login'>
            <h3>Log In</h3>
            <h4>For testing purposes you may use Username: "Latte" Password: "password" which are both case sensitive.</h4>
            <form className='login' onSubmit={this.handleSubmit}>
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
        )
      }
}