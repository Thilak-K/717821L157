import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Client from './client';
import Client2 from './client2';

const App = () => {
  return (
    <Router>
     
        <Route path="/" exact component={Client} />
        <Route path="/client2" component={Client2} />
      
    </Router>
  );
}

export default App;
