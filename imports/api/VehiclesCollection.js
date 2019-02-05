import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { forEach } from 'lodash';

/*
import SimpleSchema from 'simpl-schema';





const vehicleSchema = new SimpleSchema({
  imgUrl: {
    type: String,
    label: 'Url of vehicle image',
  },
  name: {
    type: String,
    label: 'Vehicle name',
  },
  vehicleClass: {
    type: String,
    label: 'Class of vehicle',
  },
  passengers: {
    type: SimpleSchema.Number,
    label: 'Number of passenges',
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

VehiclesCollection.attachSchema(vehicleSchema);

*/

const VehiclesCollection = new Mongo.Collection('vehicles');

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

  'vehicles.update'(_id, booking) {
    check(_id, String);
    check(booking, Object);

    if (!this.userId) {
      throw new Meteor.Error('no way in looser!');
    }

    const obj = {
      ...booking,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    };

    console.log('vehicling now', obj);

    VehiclesCollection.update(_id, { $set: { ...booking } });
  },

  'vehicles.remove'(_id) {
    check(_id, String);

    if (!this.userId) {
      throw new Meteor.Error('no way in looser!');
    }

    VehiclesCollection.remove(_id);
  },
});


export default VehiclesCollection;
