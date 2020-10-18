import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Bets from './Bets';

test('Bets renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Bets /></BrowserRouter>, div);
});