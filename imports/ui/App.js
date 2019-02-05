// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Home from './pages/Home.js';
import Vehicles from './pages/Vehicles.js';
import Bookings from './pages/Bookings.js';
import Roles from './pages/Roles.js';
import AccountsUiWrapper from './AccountsUiWrapper.js';

type Props = {
  currentUser: {
    _id: string,
    username: string,
  },
};

class App extends React.Component<Props> {
  state = {
    error: false,
  }


  componentDidThrow() {
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    const { currentUser } = this.props;
    const activeStyle = {
      fontWeight: 'bold',
    };

    if (error) {
      return <div>Sorry an error occuree</div>;
    }

    return (
      <Router>
        <div>
          <div className="mb-3">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <AccountsUiWrapper />
              {currentUser && (
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <NavLink strict className="nav-link" activeStyle={activeStyle} to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" activeStyle={activeStyle} to="/vehicles">Vehicles</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" activeStyle={activeStyle} to="/bookings">Bookings</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" activeStyle={activeStyle} to="/roles">Roles</NavLink>
                  </li>
                </ul>
              )}
            </nav>
          </div>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/vehicles" component={Vehicles} />
            <Route path="/bookings" component={Bookings} />
            <Route path="/roles" component={Roles} />
          </div>
        </div>
      </Router>
    );
  }
}


export default withTracker(() => ({
  currentUser: Meteor.user(),
}))(App);
