import React, { Component } from 'react';
import './NewBet.css';

export default class NewBet extends Component{
  render(){
    return(
      <div>
        <h2>New Bet</h2>
        <form className='new-bet-form'>
          
          <label htmlFor='name'>Wager name: </label>
          <input type='text' name='name' id='name' placeholder='Wager name' /> <br />
          <label htmlFor='amount'>Amount: </label>
          <input type='number' name='amount' id='amount' placeholder='2 cups of coffee'/> <br />
          <label htmlFor='startDate'>Start Date: </label>
          <input type='date' name='startDate' id='startDate' /> <br />
          <label htmlFor='endDate'>End Date: </label>
          <input type='date' name='endDate' id='endDate' /> <br />
          <label htmlFor='bettors'>Friends: </label>
          <select name='bettors' id='bettors'>
            <option value='1' name='bettorName1' id='bettorName1'>Friend 1</option>
            <option value='2' name='bettorName2' id='bettorName2'>Friend 2</option>
          </select>
        </form>
      </div>
    )
  }
}