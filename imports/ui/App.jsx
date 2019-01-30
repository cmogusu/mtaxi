// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Tasks from '../api/tasks.js';
import Task from './Task.jsx';
import AccountsUiWrapper from './AccountsUiWrapper.js';

type Props = {
  tasks: Array,
  incompleteCount: number,
  currentUser: {
    _id: string,
    username: string,
  },
};

class App extends React.Component<Props> {
  addTask = (event) => {
    const { currentTarget } = event;
    const { newTaskInput } = currentTarget;
    const { value: title } = newTaskInput;
    const { currentUser } = this.props;
    const { username, _id: owner } = currentUser;

    Tasks.insert({
      title,
      owner,
      username,
      createdAt: new Date(),
    });

    newTaskInput.value = '';
    event.preventDefault();
  };


  render() {
    const {
      tasks,
      incompleteCount,
      currentUser,
    } = this.props;
console.log(currentUser);
    return (
      <div>
        <header>
          <h1>Welcome to Meteor!</h1>
          <span>
            Total incomplete:&nbsp;
            {incompleteCount}
          </span>
        </header>

        <AccountsUiWrapper />

        {currentUser && (
          <form onSubmit={this.addTask}>
            <input
              name="newTaskInput"
              type="text"
              placeholder="Add a new task"
              defaultValue=""
            />
          </form>
        )}
        <ul>
          {tasks.map(task => (
            <Task key={task._id} {...task} />
          ))}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => ({
  tasks: Tasks.find({}, {
    sort: {
      createdAt: -1,
    },
  }).fetch(),
  incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  currentUser: Meteor.user(),
}))(App);
