import React, { Component } from 'react';
import BragContext from '../BragContext';
import './SignUp.css';
import AuthApiService from '../../services/auth-api-service';
import SA from 'sweetalert2'


export default class SignUp extends Component {
  static contextType = BragContext;

  state = {
    password: '',
    confirm: '',
    match: false
  }

  handleSubmit = e => {
    e.preventDefault()
    e.persist()
    const username = e.target.username;
    const password = e.target.password;
    const user = {
      username: username.value,
      password: password.value,
    }
  
    AuthApiService.postUser(user)
      .then(user => {
        username.value = ''
        password.value = ''
        SA.fire(
          'Success',
          'New account created',
          'success'
        )
        this.props.history.push({ pathname: '/login', })
      })
      .catch(res => {
        this.context.setError(res.error)
        SA.fire({
          icon: 'error',
          title: this.context.error,
          text: 'Please try again.'
          
        })
      })          
  }

  confirmPassword = e => {
    // get the value of the field that was changed
    const value = e.target.value;
    // set the state of the changed field to the new value
    this.setState({
      [e.target.name]: value
    }, () => { 
      // after state is set, check if passwords match and change state accordingly
      if(this.state.password === this.state.confirm && this.state.password.length > 7){
        this.setState({
          match: true
        })
      } else {
        this.setState({
          match: false
        })
        }
    }) 
  }

  render() {
    return (
      <div>
        <h3>Please fill out the form to register an account.</h3>
        <p>Usernames must be unique and passwords must be at least 8 characters long.</p>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input required type="text" name='username' id='username' placeholder='Username' />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            {/* apply class to input field depending on whether or not password match is confirmed */}
            <input required type="password" name='password' id='password' className={this.state.match ? 'confirmed' : 'unconfirmed'} onChange={this.confirmPassword}/>
          </div>
          <div>
            <label htmlFor="password-confirmation" >Confirm Password:</label>
            {/* apply class to input field depending on whether or not password match is confirmed */}
            <input required type="password" name='confirm' id='confirm' className={this.state.match ? 'confirmed' : 'unconfirmed'} onChange={this.confirmPassword}/>
          </div>
          {/* if passwords don't match disable the submit button */}
          <button type='submit' disabled={!this.state.match}>Sign Up</button>
        </form>
      </div>
    )
  }
}