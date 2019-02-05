import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import VehiclesCollection from '../../api/VehiclesCollection.js';
import ImagesCollection from '../../api/ImagesCollection.js';
import Vehicle from '../components/Vehicle.js';
import VehicleForm from '../components/VehicleForm.js';


type Props = {
  vehicles: Array<{}>,
  currentUser: {
    _id: string,
    username: string,
  },
};

class Vehicles extends React.Component<Props> {
  state = {
    isAddingNewVehicle: false,
    activeVehicleIndex: -1,
  }

  setVehicle = (vehicle) => {
    console.log(vehicle);
    this.setState({
      isAddingNewVehicle: false,
      activeVehicleIndex: -1,
    });
  };

  editVehicle = (index) => {
    this.setState({
      isAddingNewVehicle: true,
      activeVehicleIndex: index,
    });
  };


  render() {
    const { vehicles, currentUser } = this.props;
    const { isAddingNewVehicle, activeVehicleIndex } = this.state;

    if (!currentUser) {
      return 'Please log in';
    }
console.log({...vehicles[activeVehicleIndex]});
    return (
      <div>
        <Modal
          aria-labelledby="Edit booking"
          aria-describedby="Edit the details of this booking"
          open={isAddingNewVehicle}
          onClose={() => this.setState({ isAddingNewVehicle: false })}
        >
          <div className="modal-bg">
            <button type="button" onClick={() => this.setState({ isAddingNewVehicle: false })}>&times;</button>
            {activeVehicleIndex > -1 ? (
              <VehicleForm {...vehicles[activeVehicleIndex]} setVehicle={this.setVehicle} />
            ) : (
              <VehicleForm setVehicle={this.setVehicle} />
            )}
          </div>
        </Modal>
        <Button
          onClick={() => this.setState({ isAddingNewVehicle: true })}
        >
          Add New Vehicle
        </Button>

        <div>
          {vehicles.map((vehicle, index) => (
            <Vehicle
              key={vehicle._id}
              {...vehicle}
              editVehicle={() => this.editVehicle(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}


export default withTracker(() => {
  Meteor.subscribe('vehicles');
  Meteor.subscribe('files.images.all');

  return {
    currentUser: Meteor.user(),
    vehicles: VehiclesCollection.find({}, {
      sort: {
        createdAt: -1,
      },
    }).fetch(),
    images: ImagesCollection.find().fetch(),
  };
})(Vehicles);
