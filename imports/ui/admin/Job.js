import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from '@material-ui/core/Modal';
import SmallBookingForm from './SmallBookingForm.js';


type GMapsLocations = {
  lat: Function,
  lng: Function,
};

type Location = {
  name: string,
  location: GMapsLocations,
};


type Props = {
  _id?: string,
  origin?: Location,
  destination?: Location,
  waypoints?: Array<Location>,
  date?: {},
  isReturnJourney?: boolean,
  passengers?: number,
  totalDistance?: number,
  totalDuration?: number,
};

class Job extends React.Component<Props> {
  static defaultProps = {
    _id: null,
    origin: {
      name: '',
    },
    destination: {
      name: '',
    },
    waypoints: [],
    date: new Date(),
    isReturnJourney: false,
    passengers: 1,
    totalDistance: 0,
    totalDuration: 0,
  };

  state = {
    isEditing: false,
  };

  setBooking = (booking) => {
    const { _id } = this.props;

    if (!_id) {
      return;
    }

    Meteor.call('bookings.update', _id, booking);
    this.setState({ isEditing: false });
  }

  removeBooking = () => {
    const { _id } = this.props;

    if (!_id) {
      return;
    }

    Meteor.call('bookings.remove', _id);
  }

  render() {
    const {
      origin,
      destination,
      waypoints,
      date,
      isReturnJourney,
      passengers,
      totalDistance,
      totalDuration,
    } = this.props;

    const { isEditing } = this.state;

    return (
      <tr>
        <td>{origin ? origin.name : ''}</td>
        <td>{destination ? destination.name : ''}</td>
        <td>
          {waypoints.map((waypoint, index) => (
            <div key={index}>{waypoint ? waypoint.name : ''}</div>
          ))}
        </td>
        <td>{date.toDateString()}</td>
        <td>{isReturnJourney ? 'yes' : 'no'}</td>
        <td>{passengers}</td>
        <td>{totalDistance}</td>
        <td>{totalDuration}</td>
        <td>
          <button type="button" onClick={() => this.setState({ isEditing: true })}>edit</button>
          <button type="button" onClick={this.removeBooking}>delete</button>
          <Modal
            aria-labelledby="Edit booking"
            aria-describedby="Edit the details of this booking"
            open={isEditing}
            onClose={() => this.setState({ isEditing: false })}
          >
            <div className="modal-bg">
              <button type="button" onClick={() => this.setState({ isEditing: false })}>&times;</button>
              <SmallBookingForm {...this.props} setBooking={this.setBooking} />
            </div>
          </Modal>
        </td>
      </tr>
    );
  }
}

export default Job;
