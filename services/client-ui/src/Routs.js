import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Playground from './components/playground/Playground';

function Routs() {
  return (
    <Router>
      <Route path='/' component={Playground} exact />
      <Route path='/playground' component={Playground} exact />
    </Router>
  );
}

export default Routs;
