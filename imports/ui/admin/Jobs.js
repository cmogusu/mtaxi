import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Modal from '@material-ui/core/Modal';
import BookingsCollection from '../../api/BookingsCollection.js';
import SmallBookingForm from '../components/SmallBookingForm.js';
import Booking from '../components/Booking.js';


type Props = {
  currentUser: {
    _id: string,
    username: string,
  },
  bookings: Array<{}>,
};


class Jobs extends React.Component<Props> {
  state = {
    isAddingNewBooking: false,
  }

  setSelected = (index) => {
    this.selectedIndex = index;
  }

  setBooking = (booking) => {
    Meteor.call('bookings.addNew', booking);
  }

  render() {
    const { currentUser, bookings } = this.props;
    const { isAddingNewBooking } = this.state;

    if (!currentUser) {
      return 'Please log in';
    }

    return (
      <div>
        <Modal
          aria-labelledby="Edit booking"
          aria-describedby="Edit the details of this booking"
          open={isAddingNewBooking}
          onClose={() => this.setState({ isAddingNewBooking: false })}
        >
          <div className="modal-bg">
            <button type="button" onClick={() => this.setState({ isAddingNewBooking: false })}>&times;</button>
            <SmallBookingForm setBooking={this.setBooking} />
          </div>
        </Modal>
        <button type="button" onClick={() => this.setState({ isAddingNewBooking: true })}>
          Add new
        </button>

        <table>
          <thead>
            <tr>
              <td>Origin</td>
              <td>Destination</td>
              <td>Waypoints</td>
              <td>Date</td>
              <td>Return Journey</td>
              <td>Passengers</td>
              <td>Total Distance</td>
              <td>Total Duration</td>
              <td>Edit</td>
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
})(Jobs);
