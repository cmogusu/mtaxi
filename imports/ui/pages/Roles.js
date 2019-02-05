import React from 'react';
import Users from '../admin/Users.js';


function RolesClass() {
  return <Users />
}

export default RolesClass;

/*
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';

type Props = {
  users: Array,
};

class RolesClass extends React.Component<Props> {
  roles = 'hello roles';

  addUser = () => {
    const random = Math.floor(Math.random() * 1000);
    const newUser = {
      // email: `user${random}@gmail.com`,
      username: `user${random}`,
      password: `password${random}`,
      role: 'manager',
    };

    Meteor.call('users.add', newUser);
  };

  removeUser = (userId) => {
    Meteor.call('users.remove', userId);
  };

  makeClient = (userId, role) => {
    Meteor.call('users.setRole', userId, role);
  };

  render() {
    const { users } = this.props;


    return (
      <div>
        <button type="button" onClick={this.addUser}>add user</button>
        {users.map(user => (
          <div key={user._id}>
            {user._id}
            &nbsp;:&nbsp;
            {user.username}
            &nbsp;:&nbsp;
            {Roles.userIsInRole(user, ['doggy', 'subscriber'], 'default') ? 'subscriber or doggy' : 'nope'}
            &nbsp;:&nbsp;
            {Roles.userIsInRole(user, ['manager'], 'default') ? 'is manager' : 'not manager'}
            <button type="button" className="small" onClick={() => this.makeClient(user._id, 'doggy')}>Make Doggy</button>
            <button type="button" className="small" onClick={() => this.makeClient(user._id, 'subscriber')}>Make subscriber</button>
            <button type="button" className="small" onClick={() => this.removeUser(user._id)}>Remove</button>
          </div>
        ))}
        <hr />
      </div>
    );
  }
}


export default withTracker(() => {
  Meteor.subscribe('masterUserList');

  return {
    users: Meteor.users.find().fetch(),
  };
})(RolesClass);
*/