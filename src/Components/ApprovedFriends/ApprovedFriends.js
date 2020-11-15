import React, { Component } from 'react';
import BragContext from '../BragContext';

export default class ApprovedFriends extends Component {
  static contextType = BragContext;

  render() {
    let { approvedFriends } = this.context;
    return (
      approvedFriends.length > 0
        ? approvedFriends.map(friend => 
          <ul className='friend' key={friend.username} onClick={() => this.context.setSelectedFriend(friend)}>
            <li>{friend.username}</li>
            <li><img className ='friendAvatar' src={friend.avatar} alt='avatar'/></li>
          </ul>)
        : ''      
    )
  }
}