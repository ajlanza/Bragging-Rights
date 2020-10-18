import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Nav';

test('Nav renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Nav /></BrowserRouter>, div);
});