import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import NewBet from '../NewBet/NewBet';
import Profile from '../Profile/Profile';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';
import Header from '../Header/Header';
import RequireAuth from '../../HOC/auth';
import './App.css';
import BragContext from '../BragContext';
import AuthApiService from '../../services/auth-api-service';

export default class App extends Component {
  static contextType = BragContext;

  componentDidMount() {
    let user = localStorage.getItem('user');
    let parsedUser = JSON.parse(user);
    if(user)
      this.setAll(parsedUser);
  }

  saveUser() {
    localStorage.setItem('user', JSON.stringify(this.context.user));
  }

  setAll(user) {
    this.context.setUser(user)
    AuthApiService.getFriends(user.id)
      .then((data) => {
        if(data !== 'No friends set up.'){
          this.context.setFriends(data);
        }
      })
      .catch(this.context.setError);
    AuthApiService.getWagers(user.id)
      .then((data) => {
        this.context.setWagers(data);
      })
      .catch(this.context.setError);
  }

  render(){
    
    window.onbeforeunload = (e) => {
      this.saveUser();
   }
  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
      
        <Switch>
          <Route path='/' exact component= { Header }/>
          <Route path='/new' component = { RequireAuth(NewBet) } />
          <Route path='/profile' component = { RequireAuth(Profile) } />
          <Route path='/login' component = { LogIn } />
          <Route path='/signup' component = { SignUp } />
        </Switch>
      </main>
    </div>
  )
  }
}
