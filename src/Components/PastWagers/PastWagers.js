import React, { Component } from 'react';
import BragContext from '../BragContext';
import Helpers from '../../services/helpers';
import './pastWagers.css';

export default class PastWagers extends Component {
  static contextType = BragContext;

  render(){
    const { lostWagers, wonWagers, user, friends } = this.context;

    return(
      wonWagers.length > 0 || lostWagers.length > 0
        ? <>
          <h3>Past Wagers</h3>
          <div className='betContainer'>
          {wonWagers.length > 0 
            ? wonWagers.map(bet =>
              <div key={bet.id} className='won' onClick={() => this.context.setSelectedWager(bet)}> 
                <ul>
                  <li id='wagerTitle'>{Helpers.shorten(bet.title)}</li>
                  <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/> {Helpers.shorten(bet.wager)}</li>
                  <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/> {Helpers.getFriendById(user.id, friends, bet.bettor1, bet.bettor2)}</li>
                  <li className='winStatus'>I won.</li>
                </ul>
              </div>
              )
            : ''
          }
          {lostWagers.length > 0 
            ? lostWagers.map(bet =>
              <div key={bet.id} className='lost' onClick={() => this.context.setSelectedWager(bet)}> 
                <ul>
                  <li id='wagerTitle'>{Helpers.shorten(bet.title)}</li>
                  <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/> {Helpers.shorten(bet.wager)}</li>
                  <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/> {Helpers.getFriendById(user.id, friends, bet.bettor1, bet.bettor2)}</li>
                  <li className='winStatus'> I lost.</li>
                </ul>
              </div>
              )
            : ''
          }
          </div>
          </>
        : ''
    )
  }
}