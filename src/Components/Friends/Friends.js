import BragContext from '../BragContext';
import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import Swal from 'sweetalert2';
import './friends.css'
import AwaitingFriends from '../AwaitingFriends/AwaitingFriends';
import PendingFriends from '../PendingFriends/PendingFriends';
import ApprovedFriends from '../ApprovedFriends/ApprovedFriends';

export default class Friends extends Component {
  static contextType = BragContext;
  
  state = {
    hasMatch: false,
  }

  checkHasMatch = ev => {
    ev.preventDefault()
    this.setState({ match: false })
    let username = ev.target.username.value;
    let lowerUsername = username.toLowerCase();
    // check if user is trying to add themselves as a friend
    if(this.context.user.username.toLowerCase() === lowerUsername){
      Swal.fire({
        icon: 'error',
        title: `Can't add yourself as a friend.`,
        text: 'Please try again.'
      });
      this.setState({ match: true })
      ev.target.username.value = '';
      return;
    }
    //check if user has already requested the other user as a friend
    for(let i = 0; i < this.context.friends.length; i++){
      if (lowerUsername === this.context.friends[i].username.toLowerCase()){
        Swal.fire({
          icon: 'error',
          title: `${this.context.friends[i].username} has already been requested.`,
          text: 'Please try again.'
        });
        this.setState({ match: true});
        ev.target.username.value = '';
        return;
      }
    }
    if(!this.state.match){
      this.addFriendRequest(username);
      ev.target.username.value = '';
    }
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
    let { awaitingFriends, pendingFriends } = this.context
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
          <ApprovedFriends />
        </div>
        {awaitingFriends.length > 0 || pendingFriends.length > 0
          ? <h3>Pending Friends</h3>
          : '' }
        <AwaitingFriends />
        <PendingFriends />
      </>
    )
  }
}