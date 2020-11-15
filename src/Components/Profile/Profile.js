import React, { Component } from 'react';
import BragContext from '../BragContext';
import './Profile.css';
import Wagers from '../Wagers/Wagers';
import Friends from '../Friends/Friends';


export default class Profile extends Component{
  static contextType = BragContext;
  
  render() {
    let {  user } = this.context;
    return(
      <div className='profile'>
        <h2>{user.username}</h2>
          <img className ='logo' src={user.avatar} alt='profile'/>
          <h3>Wins: {user.total_wins} Losses: {user.total_losses}</h3>
          <Wagers history={this.props.history}/>          
          <Friends />
      </div>
    )
  }
}