import React from 'react';
import { map } from 'lodash';

type Props = {
  origin?: Location,
  destination?: Location,
  waypoints?: Array<Location>,
  hasSubmited?: boolean,
  date?: {},
  isReturnJourney?: boolean,
  passengers?: number,
  totalDistance?: number,
  totalDuration?: number,
};

class Booking extends React.Component<Props> {
  static defaultProps = {
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

  edit = () => {

  };

  delete = () => {

  };

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

    return isEditing ? (
      <tr>
        <td>{origin.name}</td>
        <td>{destination.name}</td>
        <td>{waypoints.map(waypoint => <div>{waypoint.name}</div>)}</td>
        <td>{date}</td>
        <td>{isReturnJourney ? 'yes' : 'no'}</td>
        <td>{passengers}</td>
        <td>{totalDistance}</td>
        <td>{totalDuration}</td>
      </tr>
    ) : (
      <tr>
        <td>{origin.name}</td>
        <td>{destination.name}</td>
        <td>{waypoints.map(waypoint => <div>{waypoint.name}</div>)}</td>
        <td>{date}</td>
        <td>{isReturnJourney ? 'yes' : 'no'}</td>
        <td>{passengers}</td>
        <td>{totalDistance}</td>
        <td>{totalDuration}</td>
        <td>
          <button type="button" onClick={this.edit}>edit</button>
          <button type="button" onClick={this.remove}>delete</button>
        </td>
      </tr>
    );
  }
}

export default Booking;
