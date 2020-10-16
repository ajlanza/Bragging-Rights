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
      <div>
        <h2>{user.username}</h2>
          <img className ='profilePicture' src={user.avatar} alt='profile'/>
          <Wagers history={this.props.history}/>          
          <Friends />
      </div>
    )
  }
}