import React, { Component } from 'react';
import BragContext from '../BragContext';

export default class AwaitingFriends extends Component {
  static contextType = BragContext;
  render() {
    let { awaitingFriends } = this.context;
    return(
      awaitingFriends.length > 0
        ? <div className='friendContainer'>
          {awaitingFriends.map(friend => 
          <ul className='friend' key={friend.username}>
            <li>{friend.username}</li>
            <li><img className ='friendAvatar' src={friend.avatar} alt='avatar'/></li>
            <li>Pending approval</li>
          </ul>
          )}
          </div>
        : ''
    )
  }
}
