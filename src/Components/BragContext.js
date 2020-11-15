import React, { Component } from 'react';

const BragContext = React.createContext({
  user: {
    id: null,
    username: null,
    avatar: 'club.png',
  },
  friends: [{
    friend_id: null,
    username: null,
    avatar: null,
    pending: null,
    approved: null,
  }],
  wagers: [{
    id: null,
    title: null,
    start_date: null,
    end_date: null,
  }],
  wonWagers: [],
  lostWagers: [],
  approvedWagers: [],
  needsMyApproval: [],
  awaitingOtherBettor: [],
  approvedFriends: [],
  pendingFriends: [],
  awaitingFriends: [],
  selectedFriend: [],
  selectedWager: [],
  error: null,
  authorized: null,

  clearAll: () => {},
  setWagers: () => {},
  setSelectedWager: () => {},
  hideSelectedWager: () => {},
  setFriends: () => {},
  setSelectedFriend: () => {},
  hideSelectedFriend: () => {},
  setUser: () => {},
  setAuthorized: () => {},
  setError: () => {},
  clearError: () => {},
})
export default BragContext

export class BragContextProvider extends Component {
  state = {
    user: {
      id: null,
      username: null,
      avatar: 'club.png'
    },
    friends: [],
    wagers: [],
    wonWagers: [],
    lostWagers: [],
    approvedWagers: [],
    needsMyApproval: [],
    awaitingOtherBettor: [],
    approvedFriends: [],
    pendingFriends: [],
    awaitingFriends: [],
    selectedFriend: [],
    selectedWager: [],
    error: null,
    authorized: false,
  };

  clearAll = () => {
    this.setState ({
      user: {},
      friends: [],
      approvedFriends: [],
      pendingFriends: [],
      awaitingFriends: [],
      wagers: [],
      wonWagers: [],
      lostWagers: [],
      approvedWagers: [],
      needsMyApproval: [],
      awaitingOtherBettor: [],
      selectedFriend: [],
      selectedWager: [],
      authorized: false
    })
  }

  setWagers = wagers => {
    let approvedWagers = [];
    let needsMyApproval = [];
    let awaitingOtherBettor = [];
    let wonWagers = [];
    let lostWagers = [];
    if(wagers.length > 0){
      wagers.forEach(bet => {
        if(bet.winner === this.state.user.id){
          bet.type = 'win'
          wonWagers.push(bet);
        }
        if(bet.winner !== 0 && bet.winner !== this.state.user.id){
          bet.type = 'loss'
          lostWagers.push(bet);
        }
        if(bet.wager_status === 'approved'){
          bet.type = 'approved'
          approvedWagers.push(bet);
        }
        if(bet.wager_status === 'pending bettor2' && bet.bettor2 === this.state.user.id){
          bet.type = 'needsMyApproval'
          needsMyApproval.push(bet);
        }
        if(bet.wager_status === 'pending bettor2' && bet.bettor1 === this.state.user.id){
          bet.type = 'awaitingOtherBettor'
          awaitingOtherBettor.push(bet);
        }
      })
      this.setState({
        approvedWagers, needsMyApproval, awaitingOtherBettor, wonWagers, lostWagers, wagers
      })
    }
  }  

  setSelectedWager = selectedWager => {
    let betAgainst = selectedWager.bettor1;
    if(selectedWager.bettor1 === this.state.user.id){
      betAgainst = selectedWager.bettor2
    }
    for( let i = 0; i < this.state.friends.length; i++){
      if(this.state.friends[i].friend_id === betAgainst){
        betAgainst = this.state.friends[i].username
      }
    }
    selectedWager = { ...selectedWager, betAgainst, hidden: false};
    let { selectedFriend } = this.state;
    selectedFriend.hidden = true;
    this.setState({ 
      selectedWager, 
      selectedFriend })
  }

  hideSelectedWager = () =>{
    let { selectedWager } = this.state;
    selectedWager.hidden = true;
    this.setState({
      selectedWager
    })
  }

  setSelectedFriend = selectedFriend => {
    let { selectedWager } = this.state;
    selectedWager.hidden = true;
    selectedFriend.hidden = false;
    this.setState({ 
      selectedFriend,
      selectedWager })
  }

  hideSelectedFriend = () =>{
    let { selectedFriend } = this.state;
    selectedFriend.hidden = true;
    this.setState({
      selectedFriend
    })
  }

  setFriends = friends => {
    let pendingFriends = [];
    let approvedFriends = [];
    let awaitingFriends = [];
  
    if(friends.length >0){
      friends.forEach(friend => {
        if(friend.pending === false && friend.approved === true){
          approvedFriends.push(friend);
        }
        if(friend.pending === true && friend.approved === false){
          pendingFriends.push(friend);
        }
        if(friend.pending === true && friend.approved === true){
          awaitingFriends.push(friend)
        }
      })
      this.setState({
        pendingFriends, approvedFriends, awaitingFriends, friends
      })
    }
  }

  setUser = user => {
    console.log(user);
    this.setState({
       user: {
         id: user.id,
         username: user.username,
         avatar: user.avatar,
         total_wins: user.total_wins,
         total_losses: user.total_losses,
       } 
    })
  }

  setAuthorized = authorized => {
    this.setState({ authorized })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render(){
    const value = {
      error: this.state.error,
      wagers: this.state.wagers,
      wonWagers: this.state.wonWagers,
      lostWagers: this.state.lostWagers,
      approvedWagers: this.state.approvedWagers,
      needsMyApproval: this.state.needsMyApproval,
      awaitingOtherBettor: this.state.awaitingOtherBettor,
      friends: this.state.friends,
      approvedFriends: this.state.approvedFriends,
      pendingFriends: this.state.pendingFriends,
      awaitingFriends: this.state.awaitingFriends,
      user: this.state.user,
      selectedFriend: this.state.selectedFriend,
      selectedWager: this.state.selectedWager,
      authorized: this.state.authorized,
      clearAll: this.clearAll,
      setError: this.setError,
      clearError: this.clearError,
      setWagers: this.setWagers,
      setSelectedWager: this.setSelectedWager,
      hideSelectedWager: this.hideSelectedWager,
      setFriends: this.setFriends,
      setSelectedFriend: this.setSelectedFriend,
      hideSelectedFriend: this.hideSelectedFriend,
      setUser: this.setUser,
      setAuthorized: this.setAuthorized,
    }
    
    return (
      <BragContext.Provider value={value}>
        {this.props.children}
      </BragContext.Provider>
    )
  }
}