import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helpers from '../../services/helpers';
import BragContext from '../BragContext';

export default class ApprovedWagers extends Component {
  static contextType = BragContext;

  render() {
    let { approvedWagers, user, friends } = this.context;

    return (
      approvedWagers.length > 0 
        ? <>
          <h3>Current Wagers</h3>
          <div className='betContainer'>
          {approvedWagers.map(bet =>
            <div key={bet.id} className='wager selectable' onClick={() => this.context.setSelectedWager(bet)}> 
            <ul>
              <li id='wagerTitle'>{Helpers.shorten(bet.title)}</li>
              <li><img src='../date.png' alt='date icon' className='wagerIcon'/> {Helpers.processDate(bet.start_date)}</li>
              <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/> {Helpers.shorten(bet.wager)}</li>
              <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/> {Helpers.getFriendById(user.id, friends, bet.bettor1, bet.bettor2)}</li>
            </ul>
            </div>
          )}
          </div>
          </>
        : <>
          <h3>No active wagers</h3>
          <Link to='/new'><button>Create Wager</button></Link>
          </> 
    )
  }
}