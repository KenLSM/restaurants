import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import { GlintsContainer } from 'glints-aries';

import Home from './Home';
import { Colors } from './Constants/styles';

class App extends Component {
  render() {
    return (
      <Router>
        <GlintsContainer
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: Colors.compliment,
          }}
        >
          <Switch>
            {/* <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route> */}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </GlintsContainer>
      </Router>
    );
  }
}
export default App;
