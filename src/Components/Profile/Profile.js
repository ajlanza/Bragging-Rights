import React, { Component } from 'react';
// import Bets from './Bets';
import data from '../../Assets/data';
import BragContext from '../BragContext';
import './Profile.css';

export default class Profile extends Component{
  static contextType = BragContext;

  componentDidMount() {
    let user = data.bettors[1];
    let friends = data.bettors[1].friends;
    let wagers = data.wagers;
    this.context.clearError();
    this.context.setUser(user);
    this.context.setWagers(wagers);
    this.context.setFriends(friends);
  }

  handleAddFriend = ev => {
    ev.preventDefault()
    let friends = data.bettors[1].friends;
    const username = ev.target.username.value;
    friends.push(username);
    alert(`adding ${username} to friends`);    
  }

  selectWager(selectedWager){
    this.context.setSelectedWager({
      ...selectedWager
    })
    this.props.history.push('/bets')
  }

  render() {
    const { wagers, friends, user } = this.context;
    
    return(
      <div>
        <h2>{user.nickname}</h2>
          <img className ='profilePicture' src={user.avatar} alt='profile'/>
        <h3>Current Wagers</h3>
        <div className='betContainer'>
          {wagers.map(bet =>
          <div key={bet._id} className='wager' onClick={() => this.selectWager(bet)}> 
          <ul>
            <li>{bet.betName}</li>
            <li><img src='../date.png' alt='date icon' className='wagerIcon'/>{bet.startDate}</li>
            <li><img src='../beans.png' alt='coffee beans icon' className='wagerIcon'/>{bet.wager}</li>
          </ul>
          </div>)}
        </div>
        <h3>Past Wagers</h3>
        <h3>Friends</h3>
        <div className='friendContainer'>
          
           
            <form  className='addFriend friend' onSubmit={this.handleAddFriend}>
              <h3>Add a friend</h3>
              <label>Friend Username:</label>
              <input required type='text' name='username' id='username'></input>
              <br/>
              <button type='submit'>submit</button>
            </form>
          
          {friends.length > 0 ?

          friends.map(friend => 
          <ul className='friend' key={friend}>
            <li>{data.bettors[friend].nickname}</li>
            <li><img className ='friendAvatar' src={data.bettors[friend].avatar} alt='avatar'/></li>
          </ul>)

          : <p>Friends not set up yet.</p>}

         
        </div>
      </div>
    )
  }
}