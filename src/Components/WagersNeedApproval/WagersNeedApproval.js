import React, { Component } from 'react';
import BragContext from '../BragContext';
import Helpers from '../../services/helpers';
import AuthApiService from '../../services/auth-api-service';

export default class WagersNeedApproval extends Component {
  static contextType = BragContext;

  handleUpdateApproval(wager_id, wager_status){
    let wager = {
      wager_id,
      wager_status
    }
    AuthApiService.updateWagerApproval(wager)
      .then(() => {
        AuthApiService.getWagers(this.context.user.id)
          .then(data => {
            this.context.setWagers(data);
          })
      })
      .catch(this.context.setError)
  }

  selectWager(selectedWager){
    this.context.setSelectedWager({
      ...selectedWager
    })
  }

  render() {
    let { needsMyApproval, user, approvedFriends } = this.context;
    let btnLabels = [
        { label: 'approve2', parameter: 'approved' },
        { label: 'deny2', parameter: 'denied' },
      ];
    return (
      needsMyApproval.length > 0
        ? <div className='betContainer'>
          {needsMyApproval.map(bet => 
            <div key={bet.id} className='wager approved' onClick={() => this.selectWager(bet)}>
              <ul>
                <li id='wagerTitle'>{Helpers.shorten(bet.title)}</li>
                <li><img src='../date.png' alt='date icon' className='wagerIcon'/> {Helpers.processDate(bet.start_date)}</li>
                <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/> {Helpers.shorten(bet.wager)}</li>
                <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/> {Helpers.getFriendById(user.id, approvedFriends, bet.bettor1, bet.bettor2)}</li>
                <li className='approveDenyContainer'>{btnLabels.map(btnLabel =>
                  <img src={`../${btnLabel.label}.png`} 
                    alt={btnLabel.label} 
                    key={btnLabel.label} 
                    onClick={() => this.handleUpdateApproval(bet.id, btnLabel.parameter)} 
                    className='approveDenyButtons'/>
                )}</li>
              </ul>
            </div>  
          )}
          </div>
        : ''
    )
  }
}