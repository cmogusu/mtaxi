import React, { Component } from 'react';
import Tasks from '../api/tasks.js';

type Props = {
  _id: number,
  title: string,
  checked?: boolean,
  username?: string,
};

class Task extends Component<Props> {
  static defaultProps = {
    checked: false,
    username: 'default',
  };

  delete = () => {
    const { _id } = this.props;

    Tasks.remove(_id);
  };

  toggleIsChecked = (event) => {
    const { currentTarget } = event;
    const { checked } = currentTarget;
    const { _id } = this.props;

    Tasks.update(_id, {
      $set: {
        checked,
      },
    });
  }

  render() {
    const {
      title,
      checked,
      username,
    } = this.props;

    return (
      <li>
        <button type="button" onClick={this.delete}>&times;</button>
        &nbsp;
        <input type="checkbox" readOnly onClick={this.toggleIsChecked} checked={checked} />
        &nbsp;
        {username}
        &nbsp;
        {title}
        &nbsp;
      </li>
    );
  }
}

export default Task;
