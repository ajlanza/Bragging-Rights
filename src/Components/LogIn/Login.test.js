import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './LogIn';

test('Login renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LogIn />, div);
});