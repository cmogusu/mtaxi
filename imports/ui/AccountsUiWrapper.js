import React from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';


class AccountsUiWrapper extends React.Component {
  view = null;

  element = null;

  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, this.element);
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    return <span ref={(element) => { this.element = element; }} />;
  }
}


export default AccountsUiWrapper;
