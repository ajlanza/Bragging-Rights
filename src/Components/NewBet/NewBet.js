import React, { Component } from 'react';
import BragContext from '../BragContext';
import data from '../../Assets/data';
import './NewBet.css';

export default class NewBet extends Component{
  static contextType = BragContext;

  componentDidMount() {
    let user = data.bettors[0];
    let friends = data.bettors[0].friends;
    let wagers = data.wagers;
    this.context.clearError();
    this.context.setUser(user);
    this.context.setWagers(wagers);
    this.context.setFriends(friends);
  }

  handleSubmit = ev => {
    ev.preventDefault()
    
    const title = ev.target.title.value;
    const startDate = ev.target.startDate.value;
    const endDate = ev.target.endDate.value;
    const amount = ev.target.amount.value;
    alert(`New Wager submitted: ${title} ${amount} ${startDate} ${endDate} `)    
  }

  render(){
    const { friends } = this.context
  
    return(
      <div>
        <h2>New Bet</h2>
        <form className='new-bet-form' onSubmit={this.handleSubmit}>
          
          <label htmlFor='title'>Wager name: </label>
          <input type='text' name='title' id='title' placeholder='Wager name' /> <br />
          <label htmlFor='amount'>Amount: </label>
          <input type='number' name='amount' id='amount' placeholder='2 cups of coffee'/> <br />
          <label htmlFor='startDate'>Start Date: </label>
          <input type='date' name='startDate' id='startDate' /> <br />
          <label htmlFor='endDate'>End Date: </label>
          <input type='date' name='endDate' id='endDate' /> <br />
          <label htmlFor='bettors'>Friends: </label>
          
          {friends.length > 0 
          ? 
          <select name='bettors' id='bettors'>
          {friends.map(friend => 
            <option 
              value={friend} 
              key={friend}
              name={data.bettors[friend].nickname}
              id={data.bettors[friend].nickname}
              >
              {data.bettors[friend].nickname}
              </option>)}
              </select>
          : <p className='noValues'>No friends set up yet.</p>}
          
          <button type='submit' >Submit</button>
        </form>
      </div>
    )
  }
}