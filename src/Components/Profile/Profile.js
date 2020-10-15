import React, { Component } from 'react';
import SA from 'sweetalert2';
import AuthApiService from '../../services/auth-api-service';
import BragContext from '../BragContext';
import './Profile.css';
import Wagers from '../Wagers/Wagers';
import Friends from '../Friends/Friends';


export default class Profile extends Component{
  static contextType = BragContext;

  // state = {
  //   hasMatch: false,
  // }
  // componentDidMount() {
  //   this.context.clearError();
  // }

  checkHasMatch = ev => {
    ev.preventDefault()
    this.setState({ match: false })
    const username = ev.target.username.value;
    if(this.context.user.username === username){
      SA.fire({
        icon: 'error',
        title: `Can't add yourself as a friend.`,
        text: 'Please try again.'
      });
    }
    for(let i = 0; i < this.context.friends.length; i++){
      if (username === this.context.friends[i].username){
        SA.fire({
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

  addFriendRequest(username) {
    let newFriendship = {
      user_id: this.context.user.id,
      friend_name: username
    }
    // Add the friend
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
        SA.fire({
          icon: 'error',
          title: this.context.error,
          text: 'Please try again.'
        })
      })
    
      // .catch(this.context.setError); 
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

  render() {
    let {  user } = this.context;
    // console.log('profile render');
    return(
      <div>
        <h2>{user.username}</h2>
          <img className ='profilePicture' src={user.avatar} alt='profile'/>

          <Wagers history={this.props.history}/>          
          <Friends />
        {/* <h3>Friends</h3>
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
                <li>
                  <button onClick={() => this.handleUpdateFriendship(friend.friend_id, 'approve')}>approve</button> 
                  <button onClick={() => this.handleUpdateFriendship(friend.friend_id, 'deny')}>deny</button>
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
          } */}
      </div>
    )
  }
}