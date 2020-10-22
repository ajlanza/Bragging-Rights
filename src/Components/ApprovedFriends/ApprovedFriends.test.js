import React from 'react';
import ReactDOM from 'react-dom';
import ApprovedFriends from './ApprovedFriends';

test('ApprovedFriends renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ApprovedFriends />, div);
});