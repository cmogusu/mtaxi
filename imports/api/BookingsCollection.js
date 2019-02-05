import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { forEach } from 'lodash';
// import SimpleSchema from 'meteor/aldeed:simple-schema';


const BookingsCollection = new Mongo.Collection('bookings');

/*
BookingsCollection.schema = new SimpleSchema({
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
  origin?: Location,
  destination?: Location,
  waypoints?: Array<Location>,
  hasSubmited?: boolean,
  date?: {},
  isReturnJourney?: boolean,
  passengers?: number,
  totalDistance?: number,
  totalDuration?: number,
});
*/

if (Meteor.isServer) {
  Meteor.publish('bookings', () => BookingsCollection.find());
}

Meteor.methods({
  'bookings.addNew'(booking) {
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

    console.log('booking now', obj);

    BookingsCollection.insert(obj);
  },
  'bookings.update'(_id, booking) {
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

    console.log('booking now', obj);

    BookingsCollection.update(_id, { $set: { ...booking } });
  },
  'bookings.remove'(_id) {
    check(_id, String);

    if (!this.userId) {
      throw new Meteor.Error('no way in looser!');
    }

    BookingsCollection.remove(_id);
  },

});


export default BookingsCollection;
