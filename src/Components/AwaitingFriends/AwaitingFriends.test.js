import React from 'react';
import ReactDOM from 'react-dom';
import AwaitingFriends from './AwaitingFriends';

test('AwaitingFriends renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AwaitingFriends />, div);
});