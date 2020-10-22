import React from 'react';
import ReactDOM from 'react-dom';
import PendingFriends from './PendingFriends';

test('PendingFriends renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PendingFriends />, div);
});