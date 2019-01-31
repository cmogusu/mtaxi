import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import BookingsCollection from '../../api/BookingsCollection.js';
import Booking from '../components/Booking.js';

type Props = {
  currentUser: {
    _id: string,
    username: string,
  },
  bookings: Array<{}>,
};

class Bookings extends React.Component<Props> {
  state = {
    isAddingNewBooking: false,
  }

  setSelected = (index) => {
    this.selectedIndex = index;
  }

  render() {
    const { currentUser, bookings } = this.props;
    const { isAddingNewBooking } = this.state;

    if (!currentUser) {
      return 'Please log in';
    }

    return (
      <div>
        {isAddingNewBooking ? (
          <form onSubmit={this.addNew}>
            <td>{origin.name}</td>
            <td>{destination.name}</td>
            <td>{waypoints.map(waypoint => <div>{waypoint.name}</div>)}</td>
            <td>{date}</td>
            <td>{isReturnJourney ? 'yes' : 'no'}</td>
            <td>{passengers}</td>
            <td>{totalDistance}</td>
            <td>{totalDuration}</td>
            <button type="submit">
              Add new
            </button>
          </form>
        ) : (
          <button type="button" onClick={() => this.setState({ isAddingNewBooking: true })}>
            Add new
          </button>
        )}

        <table>
          <thead>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <Booking key={booking._id} {...booking} isSelected={this.setSelected} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('bookings');

  return {
    currentUser: Meteor.user(),
    bookings: BookingsCollection.find({}, {
      sort: {
        createdAt: -1,
      },
    }).fetch(),
  };
})(Bookings);
