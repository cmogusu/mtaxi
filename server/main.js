import { Meteor } from 'meteor/meteor';
import '../imports/api/VehiclesCollection.js';
import '../imports/api/BookingsCollection.js';


Meteor.startup(() => {
  console.log('server has started up');
});
