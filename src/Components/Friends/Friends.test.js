import React from 'react';
import ReactDOM from 'react-dom';
import Friends from './Friends';

test('Friends renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Friends />, div);
});