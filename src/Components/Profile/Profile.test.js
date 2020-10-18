import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Profile from './Profile';

test('Profile renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Profile /></BrowserRouter>, div);
});