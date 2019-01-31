import React from 'react';
import { isError } from 'lodash';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Slider from '@material-ui/lab/Slider';
import { addMinutes, isBefore } from 'date-fns';

import { loadGoogle } from '../functions/functions.js';
import Autocomplete from './Autocomplete.js';
import DateTime from './DateTime.js';
import Checkbox from './Checkbox.js';

type GMapsLocations = {
  lat: Function,
  lng: Function,
};

type Location = {
  name: string,
  location: GMapsLocations,
};

type Props = {
  setBooking: Function,
  origin?: Location,
  destination?: Location,
  waypoints?: Array<Location>,
  date?: {},
  isReturnJourney?: boolean,
  passengers?: number,
};

class SmallBookingForm extends React.Component<Props> {
  static defaultProps = {
    origin: null,
    destination: null,
    waypoints: [],
    date: null,
    isReturnJourney: false,
    passengers: 1,
  };

  state = {
    dateError: '',
  };

  timeDelayInMinutes = 30;

  constructor(props) {
    super(props);

    this.state = { ...this.state, ...props };
    if (!window.google) {
      loadGoogle();
    }
  }


  setPlace = (placeData, place, waypointIndex) => {
    if (!placeData || isError(placeData) || !placeData.geometry) {
      return;
    }

    const { waypoints } = this.state;
    const { geometry, formatted_address: name } = placeData;
    const { location } = geometry;
    let newPlaceData = {
      name,
      location: {
        lat: location.lat(),
        lng: location.lng(),
      },
    };

    console.log(name, { lat: location.lat(), lng: location.lng() });

    if (place === 'waypoints') {
      const newWaypoints = waypoints.slice();

      newWaypoints[waypointIndex] = newPlaceData;
      newPlaceData = newWaypoints;
    }

    this.setState({
      [place]: newPlaceData,
    });
  };


  setDateTime = (date) => {
    const futureDate = addMinutes(new Date(), this.timeDelayInMinutes);
    let dateError = '';

    if (isBefore(date, futureDate)) {
      const isTooClose = isBefore(date, new Date());
      const errorText1 = isTooClose ? 'has already passed' : 'is way too soon';
      const errorText2 = isTooClose ? 'is in the future' : `atleast ${this.timeDelayInMinutes} minutes from now`;

      dateError = `This time ${errorText1}. Please set a time that ${errorText2}`;
    }

    this.setState({ date, dateError });
  };


  addWaypoint = () => {
    this.setState((prevState) => {
      const { waypoints } = prevState;
      const newWaypoints = waypoints.slice();

      newWaypoints.push(null);

      return {
        waypoints: newWaypoints,
      };
    });
  };

  getViaInputs = () => {
    const { addViaInputs } = this.state;
    const inputs = [];
    let i = 0;

    while (i < addViaInputs) {
      i += 1;

      inputs.push(
        <Autocomplete key={i} label={`Via ${i}`} setPlace={places => this.setPlace('via', places)} />,
      );
    }

    return inputs;
  }

  clear = () => {
    this.setState({
      origin: null,
      destination: null,
      waypoints: [],
      hasSubmited: false,
      date: addMinutes(new Date(), this.timeDelayInMinutes),
    });
  }


  makeBooking = () => {
    const booking = this.state;
    const { setBooking } = this.props;

    delete booking.dateError;

    setBooking(booking);
  }


  render() {
    const {
      origin,
      destination,
      waypoints,
      date,
      dateError,
      isReturnJourney,
      passengers,
    } = this.state;

    const canShowSubmitButton = origin && destination && date && !dateError;

    return (
      <div className="text-center">
        <div className="mb-3">
          <Autocomplete
            label="Pick up"
            setPlace={places => this.setPlace(places, 'origin')}
            defaultValue={origin}
          />
          <Autocomplete
            label="Destination"
            setPlace={places => this.setPlace(places, 'destination')}
            defaultValue={destination}
          />
        </div>

        <div className="mb-3">
          <Fab
            size="small"
            color="primary"
            variant="extended"
            aria-label="add via location"
            onClick={this.addWaypoint}
          >
            Add Via
          </Fab>
          <br />

          {waypoints.map((waypoint, index) => (
            <Autocomplete
              key={index}
              label={`Via ${index + 1}`}
              setPlace={places => this.setPlace(places, 'waypoints', index)}
              defaultValue={waypoint}
            />
          ))}
        </div>

        <div className="mb-3">
          <DateTime
            date={date}
            label="Departure time"
            onChange={this.setDateTime}
            minDate={addMinutes(new Date(), this.timeDelayInMinutes)}
          />
          {dateError && (
            <div className="alert alert-warning d-inline-block small" role="alert">
              {dateError}
            </div>
          )}
        </div>

        <div className="mb-3">
          <Checkbox
            label="Return Journey"
            isChecked={isReturnJourney}
            onChange={event => this.setState({ isReturnJourney: event.currentTarget.checked })}
          />
        </div>

        <div className="mb-4">
          <span>
            Passengers:&nbsp;
            {passengers}
          </span>
          <Slider
            value={passengers}
            min={0}
            max={10}
            step={1}
            onChange={(event, value) => this.setState({ passengers: value })}
          />
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.makeBooking}
            disabled={!canShowSubmitButton}
          >
            Get Quotes
          </Button>
          <Button
            onClick={() => this.clear}
            disabled={!canShowSubmitButton}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default SmallBookingForm;
