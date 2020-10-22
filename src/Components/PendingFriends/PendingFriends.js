import React, { Component } from 'react'
import BragContext from '../BragContext';
import AuthApiService from '../../services/auth-api-service';

export default class PendingFriends extends Component {
  static contextType = BragContext;

  handleUpdateFriendship(friend, action) {
    let friendship = {
      user_id: this.context.user.id,
      friend_id: friend,
      action
    }
    AuthApiService.updateFriend(friendship)
      .then(() => {
         AuthApiService.getFriends(this.context.user.id)
          .then(data => {
            this.context.setFriends(data);
          })
      })
      .catch(this.context.setError)
  }

  render(){
    let { pendingFriends } = this.context;
    let btnLabels = [
      { label: 'Approve', parameter: 'approved' },
      { label: 'Deny', parameter: 'denied' },
    ];

    return(
      pendingFriends.length > 0 
        ? <div className='friendContainer'>
          {pendingFriends.map(friend => 
          <ul className='friend' key={friend.username}>
            <li>{friend.username}</li>
            <li><img className ='friendAvatar' src={friend.avatar} alt='avatar'/></li>
            <li>{btnLabels.map(btnLabel => 
              <button key={btnLabel.parameter} onClick={() => this.handleUpdateFriendship(friend.friend_id, btnLabel.parameter)}>{btnLabel.label}</button>)}
            </li>               
          </ul>
          )}
          </div>
        : ''
    )
  }
}