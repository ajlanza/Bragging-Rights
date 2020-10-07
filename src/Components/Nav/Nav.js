import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BragContext from '../BragContext';
import './Nav.css';

export default class Nav extends Component {
  static contextType = BragContext;

  container = React.createRef();

  state = {
    open: false,
    loggedIn: false
  };

  handleMenuClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  
  handleCloseMenu = e => {
    if (this.container.current && !this.container.current.contains(e.target)) {
      this.setState({
        open: false,
      });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleCloseMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown",this.handleCloseMenu);
  }

  logOut = () => {
    this.context.setAuthorized(false);
    this.setState({
      open: false
    })
  }

  render(){
    
    return(
      // MOBILE CONTAINER
      <div>
        <div className="hideThis">
          <div className="navContainer" ref={this.container}>
            <button type="button" className="button" onClick={this.handleMenuClick}>☰</button>
            {this.state.open && (
              <div className="dropdown">
                <ul>
                  <li>
                    <Link to='/' className='mobileNavLink'  onClick={this.handleMenuClick}>
                      Home{"  "}
                    </Link>
                  </li>

                  {this.context.authorized 
                  ?
                  <>
                  <li>
                    <Link to='/' onClick={this.logOut}>
                      Logout
                    </Link>
                  </li>
                  <li>
                    <Link to='/new' className='mobileNavLink' onClick={this.handleMenuClick}>
                      New Bet
                    </Link>
                  </li>
                  <li>
                    <Link to='/profile' className='mobileNavLink' onClick={this.handleMenuClick}>
                      Profile
                    </Link>
                  </li>
                  </>

                  :
                  <li>
                    <Link to='/login' className='mobileNavLink>' onClick={this.handleMenuClick}>
                      Log In/Sign Up
                    </Link>
                    </li>
                  }

                </ul>
              </div>
            )}
          </div>
        </div>
        {/* FULL SITE CONTAINER */}
        <div className='bigScreenContainer' >
          <div className='homeLink'>
          <Link to='/' className='navLink' >
            Home{"  "}
          </Link>
          </div>
          <div className='otherLinks'>
          {this.context.authorized 
          ?
          <>
          <Link to='/' onClick={() => this.logOut()}>
            Logout
          </Link>
          
          <Link to='/new' className='navLink'>
            New Bet
          </Link>
          <Link to='/profile' className='navLink'>
            Profile
          </Link>
          </>
          :
          <Link to='/login' className='navLink>'>
            Log In/Sign Up
          </Link>
          }  
          </div>
        </div>
      </div>
    )
            }
        }