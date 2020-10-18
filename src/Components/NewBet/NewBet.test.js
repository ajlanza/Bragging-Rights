import React from 'react';
import ReactDOM from 'react-dom';
import NewBet from './NewBet';

test('NewBet renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewBet />, div);
});