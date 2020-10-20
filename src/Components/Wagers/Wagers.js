import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import BragContext from '../BragContext';
import { Link } from 'react-router-dom';
import Helpers from '../../services/helpers';
import './Wagers.css';

export default class Wagers extends Component{
  static contextType = BragContext;

  selectWager(selectedWager){
    this.context.setSelectedWager({
      ...selectedWager
    })
  }

  hideSelectedWager() {
    this.context.hideSelectedWager();
  }

  getFriendById(bettor1, bettor2) {
    let user = this.context.user.id;
    let needName = null;
    let friendName;
    if(bettor1 !== user){
      needName = bettor1;
    } else if(bettor2 !== user){
      needName = bettor2;
    }
    this.context.friends.map(friend => 
      needName === friend.friend_id 
      ?   friendName = friend.username
      :  ''
    )
    return friendName;
  }

  handleUpdateWager(wager_id, wager_status){
    let wager = {
      wager_id,
      wager_status
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
    let { approvedWagers, needsMyApproval, awaitingOtherBettor, selectedWager } = this.context;
    let btnLabels = [
      {
        label: 'Approve',
        parameter: 'approved'
      },
      {
        label: 'Deny',
        parameter: 'denied'
      },
    ];
    

    return(
      <div>
      {/* Selected Wager Details */}
      
      {selectedWager.length === 0
        // No wager selected
        ? ''
        // Wager selected
        : 
        selectedWager.hidden === false 
          // SelectedWager should be shown
          ?      
          <ul className='selected-bet' onClick={() => this.hideSelectedWager()}>
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
            <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/>{this.getFriendById(selectedWager.bettor1, selectedWager.bettor2)}</li> 
          </ul>
          // SelectedWager should not be shown
          : ''
        }
     
      

      {/* If there are live wagers display them */}
      {approvedWagers.length > 0 
        ? <>
          <h3>Current Wagers</h3>
          <div className='betContainer'>
          {approvedWagers.map(bet =>
            <div key={bet.id} className='wager' onClick={() => this.selectWager(bet)}> 
            <ul>
              <li id='wagerTitle'>{bet.title}</li>
              <li><img src='../date.png' alt='date icon' className='wagerIcon'/> {Helpers.processDate(bet.start_date)}</li>
              <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/> {bet.wager}</li>
              <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/> {this.getFriendById(bet.bettor1, bet.bettor2)}</li>
            </ul>
            </div>
          )}
          </div></>
        : <>
          <h3>No active wagers</h3>
          <Link to='/new'><button>Create Wager</button></Link>
          </> 
      }

      {/* If there are wagers I need to approve, display them */}
      {needsMyApproval.length > 0
        ? <>
          <h3>Pending Wagers</h3>
          <div className='betContainer'>
          {needsMyApproval.map(bet => 
            <div key={bet.id} className='wager'>
              <ul>
                <li id='wagerTitle'>{bet.title}</li>
                <li><img src='../date.png' alt='date icon' className='wagerIcon'/> {Helpers.processDate(bet.start_date)}</li>
                <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/> {bet.wager}</li>
                <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/> {this.getFriendById(bet.bettor1, bet.bettor2)}</li>
                <li className='approveDenyButtons'>{btnLabels.map(btnLabel =>
                  <button key={btnLabel.label}onClick={() => this.handleUpdateWager(bet.id, btnLabel.parameter)}>{btnLabel.label}</button>
                )}</li>
               
              </ul>
            </div>  
          )}
          </div>
          </>
        : ''
      }

      {/* If there are wagers waiting for friend to approve, display them */}
      {awaitingOtherBettor.length > 0
        ? <>
          <h3>Awaiting Friend's Approval</h3>
          <div className='betContainer'>
          {awaitingOtherBettor.map(bet => 
            <div key={bet.id} className='wager'>
              <ul>
                <li id='wagerTitle'>{bet.title}</li>
                <li><img src='../date.png' alt='date icon' className='wagerIcon'/> {Helpers.processDate(bet.start_date)}</li>
                <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/> {bet.wager}</li>
                <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/> {this.getFriendById(bet.bettor1, bet.bettor2)}</li>
              </ul>
            </div>  
          )}
          </div>
          </>
        : ''
      }
      </div>
    )
  }
}