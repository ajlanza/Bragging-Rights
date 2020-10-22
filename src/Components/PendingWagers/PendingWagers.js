import React, { Component } from 'react';
import BragContext from '../BragContext';
import Helpers from '../../services/helpers';

export default class PendingWagers extends Component {
  static contextType = BragContext;

  render() {
    let { awaitingOtherBettor, user, approvedFriends } = this.context;
  
    return (
      awaitingOtherBettor.length > 0
        ? <div className='betContainer'>
          {awaitingOtherBettor.map(bet => 
            <div key={bet.id} className='wager'>
              <ul>
                <li id='wagerTitle'>{Helpers.shorten(bet.title)}</li>
                <li><img src='../date.png' alt='date icon' className='wagerIcon'/> {Helpers.processDate(bet.start_date)}</li>
                <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/> {Helpers.shorten(bet.wager)}</li>
                <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/> {Helpers.getFriendById(user.id, approvedFriends, bet.bettor1, bet.bettor2)}</li>
              </ul>
            </div>  
          )}
          </div>
        : ''
      
    )
  }
}