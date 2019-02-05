import { Meteor } from 'meteor/meteor';
import '../imports/api/VehiclesCollection.js';
import '../imports/api/BookingsCollection.js';
import '../imports/api/ImagesCollection.js';
import '../imports/api/Users.js';


Meteor.startup(() => {
  console.log('server has started up');
});
