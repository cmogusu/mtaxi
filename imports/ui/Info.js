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
    event.preventDefault();

    const { currentTarget } = event;
    const { newTaskInput } = currentTarget;
    const { value: title } = newTaskInput;

    Meteor.call('tasks.insert', title);

    newTaskInput.value = '';
  };


  render() {
    const {
      tasks,
      incompleteCount,
      currentUser,
    } = this.props;

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

export default withTracker(() => {
  Meteor.subscribe('doggy');

  return {
    tasks: Tasks.find({}, {
      sort: {
        createdAt: -1,
      },
    }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
