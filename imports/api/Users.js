import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { isEmpty } from 'lodash';
/*
const users = [{
  name: 'Funny user',
  email: 'funnyuser@example.com',
  roles: [],
}, {
  name: 'unusual user',
  email: 'unusual@example.com',
  roles: ['view-secrets'],
}, {
  name: 'Manager',
  email: 'demanager@example.com',
  roles: ['manage-users'],
}, {
  name: 'Admin user',
  email: 'admin@example.com',
  roles: ['admin'],
}];

users.map((user) => {

});
*/

Accounts.validateNewUser(() => {
  const loggedInUser = Meteor.user();

  if (loggedInUser.username === 'admin'
    || Roles.userIsInRole(loggedInUser, ['manager', 'subscriber'], 'default')
  ) {
    return true;
  }

  return false;
});
/*
Accounts.onCreateUser((options, user) => {
  const { role } = options;
  const { _id } = user;

  Roles.addUsersToRoles(_id, role, 'default');

  return user;
});
*/

Meteor.methods({
  'users.add'(user, role, extraUserData) {
    check(user, Object);
    check(role, String);
    check(extraUserData, Object);

    const userId = Accounts.createUser(user);

    Roles.addUsersToRoles(userId, role, 'default');
    Meteor.users.update(userId, {
      $set: { ...extraUserData },
    });
  },


  'users.remove'(userId) {
    check(userId, String);
    Meteor.users.remove({ _id: userId }, (error, result) => {
      if (error) {
        console.log('user removed');
      } else {
        console.log('unable to remove error', result);
      }
    });
  },


  'users.setRole'(userId, role) {
    check(userId, String);
    check(role, String);

    Roles.setUserRoles(userId, role);
  },


  'users.update'(userId, updateDetails) {
    check(userId, String);
    check(updateDetails, Object);

    const { role } = updateDetails;

    if (role) {
      Roles.setUserRoles(userId, role);
    }

    if (!isEmpty(updateDetails)) {
      Meteor.users.update(userId, {
        $set: { ...updateDetails },
      });
    }
  },
});


Meteor.publish('masterUserList', () => {
  const loggedInUser = Meteor.user();
  if (loggedInUser.username === 'admin'
    || Roles.userIsInRole(loggedInUser, ['manager', 'subscriber'], 'default')
  ) {
    return Meteor.users.find();
  }

  this.stop();
  return;
});
