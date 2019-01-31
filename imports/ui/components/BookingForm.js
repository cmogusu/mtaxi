// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';
import Map from './Map.js';
import SmallBookingForm from './SmallBookingForm.js';
import { metersToMiles, distanceToPrice, secondsToMinutes } from '../functions/functions.js';

type Props = {};

class Home extends React.Component<Props> {
  state = {
    booking: {},
    totalDuration: 0,
    totalDistance: 0,
  };


  setBooking = (booking) => {
    this.setState({ booking });
  };

  sendToServer = () => {
    const { booking, totalDuration, totalDistance } = this.state;
    const finalBooking = { ...booking, totalDuration, totalDistance };
    

    // Meteor.call('booking.addNew', finalBooking);
    console.log('sending to server now ', finalBooking);
    alert('you have made a booking');
  }

  render() {
    const {
      booking,
      totalDuration,
      totalDistance,
    } = this.state;

    const defaultBooking = {
      origin: null,
      destination: null,
      waypoints: null,
    };

    const {
      origin,
      destination,
      waypoints,
    } = booking || defaultBooking;


    return (
      <div className="row">
        <div className="col-sm-6">
          <header>
            <h1>Book in under a minute</h1>
            <p>Airport transfers, taxis and executive cars</p>
          </header>

          <div className="p-3">
            <SmallBookingForm
              setBooking={this.setBooking}
              {...booking}
            />
          </div>
        </div>

        <div className="col-sm-6">
          {origin && destination && waypoints && (
            <div>
              <div className="mb-3">
                <Map
                  {...{
                    origin,
                    destination,
                    waypoints,
                  }}
                  setDistanceAndDuration={
                    durationAndDurationObj => this.setState(durationAndDurationObj)
                  }
                />
              </div>

              <div className="border border-success p-3 rounded mb-3">
                <div>
                  <span className="text-muted small">Distance:&nbsp;</span>
                  {metersToMiles(totalDistance)}
                  &nbsp;miles
                </div>
                <div>
                  <span className="text-muted small">Duration:&nbsp;</span>
                  {secondsToMinutes(totalDuration)}
                </div>
                <div>
                  <span className="text-muted small">cost:</span>
                  &nbsp;$
                  {distanceToPrice(totalDuration, 2.5)}
                </div>
              </div>
              <div className="mb-3">
                <button type="button" onClick={this.sendToServer}>Book</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
