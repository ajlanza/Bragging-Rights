import React, { Component } from 'react';
import BragContext from '../BragContext';
import ApprovedWagers from '../ApprovedWagers/ApprovedWagers';
import WagersNeedApproval from '../WagersNeedApproval/WagersNeedApproval';
import PendingWagers from '../PendingWagers/PendingWagers';
import PastWagers from '../PastWagers/PastWagers';
import Helpers from '../../services/helpers';
import AuthApiService from '../../services/auth-api-service';
import './Wagers.css';

export default class Wagers extends Component{
  static contextType = BragContext;

  hideSelectedWager() {
    this.context.hideSelectedWager();
  }

  handleUpdateWager(wager_id, parameter, type){
    let wager;
    if(type === 'approval'){
      wager = {
        wager_id,
        wager_status: parameter,
        type
      }
    }
    if(type === 'winner'){
      wager = {
        wager_id,
        winner: parameter,
        type
      }
    }  
    AuthApiService.updateWager(wager)
      .then(() => {
        AuthApiService.getWagers(this.context.user.id)
          .then(data => {
            this.context.setWagers(data);
          })
      })
      .catch(this.context.setError)
  }

  render() {
    let { selectedWager, user } = this.context;    
    let approveDenyBtns = [
      { label: 'approve2', parameter: 'approved' },
      { label: 'deny2', parameter: 'denied' },
    ];
    let winLoseBtns = [
      { label: 'I won!', parameter: user.id },
      { label: 'I lost.', parameter: user.id === selectedWager.bettor1 ? selectedWager.bettor2 : selectedWager.bettor1 }
    ]
    return(
      <>
      {/* Selected Wager Details */}
      {selectedWager.length === 0
        // If no wager is selected, display nothing
        ? ''
        // If a wager is selected
        : 
        selectedWager.hidden === false 
          // SelectedWager should be shown
          ?      
          <ul className={`selected-bet ${selectedWager.type}`} onClick={() => this.hideSelectedWager()}>
            <h2 id='wagerTitle'> {selectedWager.title} </h2>
            <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/> {selectedWager.wager} </li>
            <li><img src='../date.png' alt='start date icon' className='wagerIcon'/> 
            {selectedWager.start_date 
              ? ` ${Helpers.processDate(selectedWager.start_date)}`
              : ` N/A `
            }
            </li>
            <li><img src='../end.png' alt='end date icon' className='wagerIcon'/> 
            {selectedWager.end_date
              ? Helpers.processDate(selectedWager.end_date)
              : 'N/A'}
            </li>
            <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/>{selectedWager.betAgainst}</li> 
            {/* If wager needs user approval, give user approve and deny buttons */}
            {selectedWager.wager_status === 'pending bettor2' && selectedWager.bettor2 === user.id 
            ?
              <li className='approveDenyContainer'>{approveDenyBtns.map(btn =>
                  <img src={`../${btn.label}.png`} 
                    alt={btn.label} 
                    key={btn.label} 
                    onClick={() => this.handleUpdateWager(selectedWager.id, btn.parameter, 'approval')} 
                    className='approveDenyButtons'/>
                )}
              </li>
            : selectedWager.wager_status === 'approved' && selectedWager.winner === 0
              ? 
                <li className='approveDenyContainer'>{winLoseBtns.map(btn =>
                  <input type='button' 
                    key={btn.label} 
                    value={btn.label}
                    onClick={() => this.handleUpdateWager(selectedWager.id, btn.parameter, 'winner')} 
                    className='winLoseButtons'/>
                  )}
                </li>
              : ''
            }

          </ul>
          // SelectedWager should not be shown
          : ''
        }
     
      <ApprovedWagers />
      <WagersNeedApproval />
      <PendingWagers />
      <PastWagers />
      </>
    )
  }
}