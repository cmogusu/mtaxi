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
  selectedIndex = 0;

  setSelected = (index) => {
    this.selectedIndex = index;
  }

  render() {
    const { currentUser, bookings } = this.props;

    if (!currentUser) {
      return 'Please log in';
    }

    return (
      <div>
        <form onSubmit={this.addNew}>
          <TextField type="text" name="img" defaultValue="http://localhost/i/car1.png" placeholder="Image" label="Image" />
          <TextField type="text" name="name" defaultValue="car 1" placeholder="name" label="Name" />
          <TextField type="text" name="vehicleClass" defaultValue="standard" placeholder="class" label="Class" />
          <TextField type="text" name="passengers" defaultValue="2" placeholder="passengers" label="Passengers" />
          <TextField type="text" name="luggage" defaultValue="3" placeholder="luggage" label="luggage" />
          <TextField type="text" name="price" defaultValue="9" placeholder="price" label="price" />
          <button type="submit">
            Add new
          </button>
        </form>

        <div>
          {bookings.map(booking => (
            <Booking key={booking._id} {...booking} isSelected={this.setSelected} />
          ))}
        </div>
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
