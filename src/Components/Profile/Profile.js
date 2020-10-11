import React, { Component } from 'react';
import SA from 'sweetalert2';
import AuthApiService from '../../services/auth-api-service';
import BragContext from '../BragContext';
import './Profile.css';


export default class Profile extends Component{
  static contextType = BragContext;

  state = {
    hasMatch: false
  }
  componentDidMount() {
    this.context.clearError();
  }

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
      this.handleAddFriend(username)
    }
  }

  handleAddFriend(username) {
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
    
      .catch(this.context.setError); 
  }

  selectWager(selectedWager){
    this.context.setSelectedWager({
      ...selectedWager
    })
    this.props.history.push('/bets')
  }

  render() {
    let { wagers, friends, user } = this.context;

    return(
      <div>
        <h2>{user.username}</h2>
          <img className ='profilePicture' src={user.avatar} alt='profile'/>
        <h3>Current Wagers</h3>
        <div className='betContainer'>
          
          
          {wagers.length > 0 
          ? wagers.map(bet =>
          <div key={bet.id} className='wager' onClick={() => this.selectWager(bet)}> 
          <ul>
            <li>{bet.title}</li>
            <li><img src='../date.png' alt='date icon' className='wagerIcon'/>{bet.start_date}</li>
            <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/>{bet.wager}</li>
          </ul>
          </div>)
          : <p>No wagers set up yet</p>}
        </div>



        {/* <h3>Past Wagers</h3> */}

        <h3>Friends</h3>
        <div className='friendContainer'>
          
            <form  className='addFriend friend' onSubmit={this.checkHasMatch}>
              <h3>Add a friend</h3>
              <label>Friend Username:</label>
              <input required type='text' name='username' id='username'></input>
              <br/>
              <button type='submit'>submit</button>
            </form>
          
          {friends.length > 0 
          ? friends.map(friend => 
          <ul className='friend' key={friend.username}>
            <li>{friend.username}</li>
            <li><img className ='friendAvatar' src={friend.avatar} alt='avatar'/></li>
          </ul>)
          : <p>Friends not set up yet.</p>}

         
        </div>
      </div>
    )
  }
}