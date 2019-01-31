import React from 'react';
// import BookingForm from './components/BookingForm.js';
import Map from './components/Map.js';
import { loadGoogle } from './functions/functions.js';


class App extends React.Component<{}> {
  state = {
    totalDuration: 287,
    totalDistance: 457,
    waypoints: [
      { lat: 51.476294, lng: -2.613517999999999 },
      { lat: 51.4771065, lng: -2.625989900000036 },
    ],
  }

  constructor(props) {
    super(props);
    loadGoogle();
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState((prevState) => {
        const { waypoints } = this.state;

        return {
          waypoints: waypoints.slice(0, 1),
        };
      });
    }, 5000);
  }


  render() {
    const origin = { lat: 51.4637269, lng: -2.622011000000043 };
    const destination = { lat: 51.48265809999999, lng: -2.6004262000000153 };
    const { totalDuration, totalDistance, waypoints } = this.state;

    return (
      <div>
        <Map
          {...{
            origin,
            destination,
            waypoints,
            totalDuration,
            totalDistance,
          }}

          setDuration={duration => this.setState({ totalDuration: duration })}
          setDistance={distance => this.setState({ totalDistance: distance })}
        />
      </div>
    );
  }
}

export default App;
