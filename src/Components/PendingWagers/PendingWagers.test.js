import React from 'react';
import ReactDOM from 'react-dom';
import PendingWagers from './PendingWagers';

test('PendingWagers renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PendingWagers />, div);
});