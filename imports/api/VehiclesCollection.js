import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { forEach } from 'lodash';
// import SimpleSchema from 'meteor/aldeed:simple-schema';


const VehiclesCollection = new Mongo.Collection('vehicles');

/*
Vehicles.schema = new SimpleSchema({
  img: {
    type: String,
    label: 'User id of owner',
  },
  name: {
    type: String,
    label: 'User id of owner',
  },
  vehicleClass: {
    type: String,
    label: 'User id of owner',
  },
  passengers: {
    type: String,
    label: 'User id of owner',
  },
  luggage: {
    type: String,
    label: 'User id of owner',
  },
  price: {
    type: String,
    label: 'User id of owner',
  },
  createdAt: {
    type: Object,
    label: 'User id of owner',
  },
  owner: {
    type: String,
    label: 'Username of owner',
  },
  username: {
    type: String,
    label: 'User id of owner',
  },
});
*/

if (Meteor.isServer) {
  Meteor.publish('vehicles', () => VehiclesCollection.find());
}

Meteor.methods({
  'vehicles.addNew'(vehicle) {
    check(vehicle, Object);
    forEach(vehicle, vehicleProp => check(vehicleProp, String));

    if (!this.userId) {
      throw new Meteor.Error('no way in looser!');
    }

    const obj = {
      ...vehicle,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    };

    // console.log(obj);
    VehiclesCollection.insert(obj);
  },

  'vehicles.remove'(taskId) {
    check(taskId, String);

    VehiclesCollection.remove(taskId);
  },

  'vehicles.setChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    VehiclesCollection.update(taskId, { $set: { checked: isChecked } });
  },
});


export default VehiclesCollection;
