import BragContext from '../BragContext';
import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import Swal from 'sweetalert2';

export default class Friends extends Component {
  static contextType = BragContext;
  
  state = {
    hasMatch: false,
  }

  checkHasMatch = ev => {
    ev.preventDefault()
    this.setState({ match: false })
    const username = ev.target.username.value;
    if(this.context.user.username === username){
      Swal.fire({
        icon: 'error',
        title: `Can't add yourself as a friend.`,
        text: 'Please try again.'
      });
    }
    for(let i = 0; i < this.context.friends.length; i++){
      if (username === this.context.friends[i].username){
        Swal.fire({
          icon: 'error',
          title: `${username} is already a friend.`,
          text: 'Please try again.'
        });
        this.setState({ match: true})
        return;
      }
    }
    if(!this.state.match){
      this.addFriendRequest(username)
    }
  }
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

  addFriendRequest(username) {
    let newFriendship = {
      user_id: this.context.user.id,
      friend_name: username
    }
    AuthApiService.addFriend(newFriendship)
      .then(res => {
        // Refresh profile with new friend
        AuthApiService.getFriends(this.context.user.id)
          .then((data) => {
            this.context.setFriends(data);
          })
      })
      .catch(res => {
        this.context.setError(res.error.message)
        Swal.fire({
          icon: 'error',
          title: this.context.error,
          text: 'Please try again.'
        })
      }) 
  }

  render(){
    let {approvedFriends, pendingFriends, awaitingFriends} = this.context;
    let btnLabels = [
      {
        label: 'Approve',
        parameter: 'approved'
      },
      {
        label: 'Deny',
        parameter: 'denied'
      },
    ];
    
    return(
      <>
      <h3>Friends</h3>
        <div className='friendContainer'>
            <form  className='addFriend friend' onSubmit={this.checkHasMatch}>
              <h3>Add a friend</h3>
              <label>Friend Username:</label>
              <input required type='text' name='username' id='username'></input>
              <br/>
              <button type='submit'>Submit</button>
            </form>           
          {approvedFriends.length > 0
          ? approvedFriends.map(friend => 
            <ul className='friend' key={friend.username}>
              <li>{friend.username}</li>
              <li><img className ='friendAvatar' src={friend.avatar} alt='avatar'/></li>
            </ul>)
          : ''      
          }
          </div>

          {pendingFriends.length > 0 || awaitingFriends.length > 0
          ? <><h3>Pending Friends</h3>
            <div className='friendContainer'>
            {pendingFriends.length > 0 
            ? pendingFriends.map(friend => 
              <ul className='friend' key={friend.username}>
                <li>{friend.username}</li>
                <li><img className ='friendAvatar' src={friend.avatar} alt='avatar'/></li>
                <li>{btnLabels.map(btnLabel => 
                  <button onClick={() => this.handleUpdateFriendship(friend.friend_id, btnLabel.parameter)}>{btnLabel.label}</button>)}
                </li>               
              </ul>)
            : ''}
            {awaitingFriends.length > 0
            ? awaitingFriends.map(friend => 
              <ul className='friend' key={friend.username}>
                <li>{friend.username}</li>
                <li><img className ='friendAvatar' src={friend.avatar} alt='avatar'/></li>
                <li>Pending approval</li>
              </ul>)
            : ''}
            </div></>
          : ''      
          }
          </>
    )
    
  }
}