// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Home from './pages/Home.js';
import Vehicles from './pages/Vehicles.js';
import Bookings from './pages/Bookings.js';
import AccountsUiWrapper from './AccountsUiWrapper.js';
import TestBooking from './components/TestBooking.js';

type Props = {
  currentUser: {
    _id: string,
    username: string,
  },
};

function App(props: Props) {
  const { currentUser } = props;
  // const { username } = currentUser;

  return (
    <Router>
      <div>
        <div>
          <AccountsUiWrapper />
          {currentUser && (
            <div>
              <ul className="nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <NavLink to="/vehicles">Vehicles</NavLink>
                </li>
                <li>
                  <NavLink to="/bookings">Bookings</NavLink>
                </li>
                <li>
                  <NavLink to="/small">Small</NavLink>
                </li>
              </ul>

              <hr />
            </div>
          )}
        </div>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/vehicles" component={Vehicles} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/small" component={TestBooking} />
        </div>
      </div>
    </Router>
  );
}


export default withTracker(() => ({
  currentUser: Meteor.user,
}))(App);
