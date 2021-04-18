import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import { GlintsContainer } from 'glints-aries';

import Home from './Home';
import SideBar from './SideBar';
import Collection from './Collection';
import { Colors } from './Constants/styles';
import { getUser } from '@/Redux/Reducers/user';
import store from '@/Redux';

class App extends Component {
  componentDidMount() {
    store.dispatch(getUser());
  }

  render() {
    return (
      <Router>
        <GlintsContainer
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: Colors.compliment,
          }}
        >
          <SideBar />
          <div style={{ flex: 1 }}>
            <Switch>
              <Route path="/collection">
                <Collection />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </GlintsContainer>
      </Router>
    );
  }
}
export default App;
