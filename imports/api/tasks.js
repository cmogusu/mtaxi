import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
// import SimpleSchema from 'meteor/aldeed:simple-schema';


const Tasks = new Mongo.Collection('tasks');

/*
Tasks.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    max: 200,
  },
  owner: {
    type: String,
    label: 'User id of owner',
  },
  username: {
    type: String,
    label: 'Username of owner',
  },
});
*/

if (Meteor.isServer) {
  Meteor.publish('doggy', () => Tasks.find());
}

Meteor.methods({
  'tasks.insert'(title) {
    check(title, String);

    if (!this.userId) {
      throw new Meteor.Error('no way in looser!');
    }

    Tasks.insert({
      title,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: isChecked } });
  },
});


export default Tasks;
