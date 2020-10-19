import React, { Component } from 'react';
import BragContext from '../BragContext';
import Swal from 'sweetalert2';
import Header from '../Header/Header'
import AuthApiService from '../../services/auth-api-service';
import './NewBet.css';

export default class NewBet extends Component{
  static contextType = BragContext;

  handleSubmit = ev => {
    ev.preventDefault()
    const title = ev.target.title.value;
    let start_date;
    let end_date; 
    if(ev.target.startDate.value === ''){
      start_date = new Date();
    }
    else {
      start_date = ev.target.startDate.value;
    }
    if(ev.target.endDate.value === ''){
      end_date = null;
    }
    else {
      end_date = ev.target.endDate.value;
    }
    const wager = ev.target.amount.value;
    const bettor1 = this.context.user.id;
    const bettor2 = ev.target.bettors.value;
    const wager_status = 'pending bettor2'
    const newWager = { title, start_date, end_date, wager, bettor1, bettor2, wager_status };

    if(bettor2 === '0'){
      Swal.fire({
        icon: 'error',
        title: 'Chose who to bet.',
        text: 'Please try again.'
      })
    }
    else {
    // Post the new wager
    AuthApiService.postWager(newWager)
    // Once new wager is posted, set context so it includes new wager
    .then(() => {
      AuthApiService.getWagers(this.context.user.id)
      .then((data) => {
        this.context.setWagers(data);
        this.props.history.push('/profile');
      })
    })
      .catch(this.context.setError);
    } 
  }

  render(){
    const { approvedFriends } = this.context;
    
    return(
      <div>
        <Header />
        <h2>New Bet</h2>
        <form className='newBetForm' onSubmit={this.handleSubmit}>
          
          <label htmlFor='title'>Wager name: </label>
          <input required type='text' name='title' id='title' placeholder='Wager name' /> <br />
          <label htmlFor='amount'>Amount: </label>
          <input type='text' name='amount' id='amount' placeholder='2 cups of coffee'/> <br />
          <label htmlFor='startDate'>Start Date: </label>
          <input type='date' name='startDate' id='startDate' /> <br />
          <label htmlFor='endDate'>End Date: </label>
          <input type='date' name='endDate' id='endDate' /> <br />
          <label htmlFor='bettors'>Friends: </label>
          
          {approvedFriends.length > 0 
          ? 
          <select required name='bettors' id='bettors' >
            <option value='0'>Select friend</option>
          {approvedFriends.map(friend => 
            <option 
              value={friend.friend_id} 
              key={friend.friend_id}
              name={friend.friend_id}
              id={friend.friend_id}
              >
              {friend.username}
              </option>)}
              </select>
              
          : <p className='noValues'>No friends set up yet.</p>}
          
          <button type='submit' >Submit</button>
        </form>
      </div>
    )
  }
}