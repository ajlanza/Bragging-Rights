import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApprovedWagers from './ApprovedWagers';

test('ApprovedWagers renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><ApprovedWagers /></BrowserRouter>, div);
});