import React from 'react';
import ReactDOM from 'react-dom';
import PastWagers from './PastWagers';

test('PastWagers renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PastWagers />, div);
});