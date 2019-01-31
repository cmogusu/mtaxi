import React from 'react';
import SmallBookingForm from './SmallBookingForm.js';

function TestBooking() {
  const setLocation = (name, lat, lng) => {
    return {
      name,
      location: { lat, lng },
    };
  };

  const setBooking = (val) => {
    console.log(val);
  };

  const booking = {
    origin: setLocation('Aberdeen, UK', 57.149717, -2.094278000000031),
    destination: setLocation('Aylesbury, UK', 51.815606, -0.808400000000006),
    waypoints: [
      null,
      null,
      setLocation('Birmingham, UK', 52.48624299999999, -1.8904009999999971),
    ],
    date: new Date(),
    isReturnJourney: true,
    passengers: 5,
  };

  return (
    <div>
      <h1>hello world</h1>
      <SmallBookingForm setBooking={setBooking} {...booking} />
    </div>
  );
}

export default TestBooking;
