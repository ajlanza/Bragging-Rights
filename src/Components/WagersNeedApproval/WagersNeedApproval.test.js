import React from 'react';
import ReactDOM from 'react-dom';

import WagersNeedApproval from './WagersNeedApproval';

test('WagersNeedApproval renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WagersNeedApproval />, div);
});