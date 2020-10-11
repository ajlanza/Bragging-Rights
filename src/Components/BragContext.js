import React, { Component } from 'react';

const BragContext = React.createContext({
  user: {
    id: null,
    username: null,
    avatar: 'club.png'
  },
  friends: [],
  wagers: [{
    id: null,
    title: null,
    start_date: null,
    end_date: null,
  }],
  selectedWager: [],
  error: null,
  authorized: null,

  clearAll: () => {},
  setWagers: () => {},
  setSelectedWager: () => {},
  setFriends: () => {},
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
    wagers: [{
      id: null,
      title: null,
      start_date: null,
      end_date: null,
    }],
    selectedWager: [],
    error: null,
    authorized: false,
  };

  clearAll = () => {
    this.setState ({
      user: {},
      friends: [],
      wagers: [],
      selectedWager: [],
      authorized: false
    })
  }

  setWagers = wagers => {
    this.setState({ wagers })
  }  

  setSelectedWager = selectedWager => {
    this.setState({ selectedWager })
  }

  setFriends = friends => {
    this.setState({ friends })
  }

  setUser = user => {
    this.setState({
       user: {
         id: user.id,
         username: user.username,
         avatar: user.avatar
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
      friends: this.state.friends,
      user: this.state.user,
      selectedWager: this.state.selectedWager,
      authorized: this.state.authorized,
      clearAll: this.clearAll,
      setError: this.setError,
      clearError: this.clearError,
      setWagers: this.setWagers,
      setSelectedWager: this.setSelectedWager,
      setFriends: this.setFriends,
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