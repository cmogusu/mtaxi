import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import VehiclesCollection from '../../api/VehiclesCollection.js';
import Vehicle from '../components/Vehicle.js';


type Props = {
  vehicles: Array<{}>,
  currentUser: {
    _id: string,
    username: string,
  },
};

class Vehicles extends React.Component<Props> {
  addNew = (event) => {
    event.preventDefault();

    const { currentTarget } = event;
    const {
      img,
      name,
      vehicleClass,
      passengers,
      luggage,
      price,
    } = currentTarget;

    const newVehicle = {
      img: img.value,
      name: name.value,
      vehicleClass: vehicleClass.value,
      passengers: passengers.value,
      luggage: luggage.value,
      price: price.value,
    };
    // console.log(newVehicle);

    Meteor.call('vehicles.addNew', newVehicle);
  }


  render() {
    const { vehicles, currentUser } = this.props;

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
          {vehicles.map(vehicle => (
            <Vehicle key={vehicle._id} {...vehicle} isSelected={this.setSelected} />
          ))}
        </div>
      </div>
    );
  }
}


export default withTracker(() => {
  Meteor.subscribe('vehicles');

  return {
    currentUser: Meteor.user(),
    vehicles: VehiclesCollection.find({}, {
      sort: {
        createdAt: -1,
      },
    }).fetch(),
  };
})(Vehicles);
