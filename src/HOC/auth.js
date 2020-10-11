import React, { Component } from 'react';
import Swal from 'sweetalert2';
import TokenService from '../services/token-service';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    

    componentDidMount() {
      if(!TokenService.hasAuthToken()) {
        Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'Please log in and try again.'
          });
        this.props.history.push('/login');        
      }
    }
    // componentDidUpdate() {
    //   if(!TokenService.hasAuthToken()) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Access Denied',
    //         text: 'Please log in and try again.'
    //       });
    //     this.props.history.push('/login');        
    //   }
    // }
    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  return RequireAuth
}