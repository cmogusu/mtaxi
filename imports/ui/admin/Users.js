import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import User from './User.js';
import UserForm from './UserForm.js';


type Props = {
  users: Array<{}>,
  currentUser: {
    _id: string,
    username: string,
  },
};

class Users extends React.Component<Props> {
  state = {
    isAddingNewUser: false,
    activeUserIndex: -1,
  };

  createUser = (newUser) => {
    console.log(newUser);
    this.setState({
      isAddingNewUser: false,
      activeUserIndex: -1,
    });

    const {
      username,
      password,
      role,
      imgUrl,
    } = newUser;

    const user = { username, password };
    const extraUserData = { imgUrl };
    
    console.log(user, role, extraUserData);
    // Meteor.call(newUser);
  };


  updateUser = (updatedUser) => {
    console.log(updatedUser);
    // Meteor.call('users.update', updatedUser);
  };


  editUser = (index) => {
    this.setState({
      isAddingNewUser: true,
      activeUserIndex: index,
    });
  };

  deleteUser = (userId) => {
    console.log('user id', userId);
    Meteor.call('users.remove', userId);
  };


  render() {
    const { users, currentUser } = this.props;
    const { isAddingNewUser, activeUserIndex } = this.state;

    if (!currentUser) {
      return 'Please log in';
    }

    return (
      <div>
        <Modal
          aria-labelledby="Edit booking"
          aria-describedby="Edit the details of this booking"
          open={isAddingNewUser}
          onClose={() => this.setState({ isAddingNewUser: false })}
        >
          <div className="modal-bg">
            <button type="button" onClick={() => this.setState({ isAddingNewUser: false })}>&times;</button>
            {activeUserIndex > -1 ? (
              <UserForm {...users[activeUserIndex]} setUser={this.updateUser} buttonLabel="Update User" />
            ) : (
              <UserForm setUser={this.createUser} buttonLabel="Add User" />
            )}
          </div>
        </Modal>
        <Button
          onClick={() => this.setState({ isAddingNewUser: true })}
        >
          Create new user
        </Button>

        <div>
          {users.map((user, index) => (
            <User
              key={user._id}
              {...user}
              editUser={() => this.editUser(index)}
              deleteUser={() => this.deleteUser(user._id)}
            />
          ))}
        </div>
      </div>
    );
  }
}


export default withTracker(() => {
  Meteor.subscribe('masterUserList');

  return {
    currentUser: Meteor.user(),
    users: Meteor.users.find().fetch(),
  };
})(Users);
