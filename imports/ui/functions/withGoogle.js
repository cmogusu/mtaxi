import React from 'react';

function withGoogle(Component) {
  return class extends React.Component {
    state = {
      google: window.google,
    }

    componentDidMount() {
      const { google } = this.state;

      if (google) {
        return;
      }

      if (window.google) {
        this.init();
      } else {
        window.addEventListener('googleReady', this.init);
      }
    }

    componentWillUnmount() {
      window.removeEventListener('googleReady', this.init);
    }

    init = () => {
      setTimeout(() => {
        const { google } = window;

        this.setState({ google });
      }, 100);
    }

    render() {
      const { google } = this.state;
      return <Component google={google} {...this.props} />;
    }
  };
}

export default withGoogle;
