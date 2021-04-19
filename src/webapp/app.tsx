import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import { Alert, GlintsContainer } from 'glints-aries';

import { getUser } from '@/Redux/Reducers/user';
import { dismissAlert } from '@/Redux/Reducers/alert';
import store, { RootStore } from '@/Redux';
import Home from './Home';
import SideBar from './SideBar';
import Collection from './Collection';
import { Colors } from './Constants/styles';

const AlertComponent = () => {
  const alertState = useSelector((state: RootStore) => state.alert);
  const dispatch = useDispatch();
  return (
    <Alert
      message={alertState.title}
      onClose={() => dispatch(dismissAlert(''))}
      type={alertState.type}
      isOpen={alertState.isOpen}
    />
  );
};
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
          <AlertComponent />
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
