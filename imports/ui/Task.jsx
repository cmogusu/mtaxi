import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';


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

    Meteor.call('tasks.remove', _id);
  };

  toggleIsChecked = (event) => {
    const { currentTarget } = event;
    const { checked } = currentTarget;
    const { _id } = this.props;

    Meteor.call('tasks.setChecked', _id, checked);
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
        <span style={{ color: '#aaa' }}>{username}</span>
        &nbsp;
        {title}
        &nbsp;
      </li>
    );
  }
}

export default Task;
