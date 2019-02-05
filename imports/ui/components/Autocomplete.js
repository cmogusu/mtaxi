// @flow
import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { camelCase } from 'lodash';
import withGoogle from '../functions/withGoogle.js';

type GMapsLocations = {
  lat: Function,
  lng: Function,
};

type Props = {
  setPlace?: Function,
  google: {},
  label?: string,
  defaultValue?: {
    name: string,
    location: GMapsLocations,
  },
};

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class AutocompleteInput extends React.Component<Props> {
  static defaultProps = {
    setPlace: val => val,
    label: 'Address',
    defaultValue: {
      name: '',
      location: {},
    },
  };

  element = null;

  componentDidMount() {
    if (!this.autocomplete) {
      this.renderAutocomplete();
    }
  }


  componentDidUpdate() {
    if (!this.autocomplete) {
      this.renderAutocomplete();
    }
  }


  listen() {
    const { setPlace } = this.props;
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();

      if (!place) {
        setPlace(new Error('no place found'));
      }

      setPlace(place);
    });
  }


  renderAutocomplete() {
    const { google } = this.props;

    if (this.autocomplete || !google || !this.element) {
      return;
    }

    this.autocomplete = new google.maps.places.Autocomplete(this.element, {
      componentRestrictions: {
        country: ['uk'],
      },
    });

    this.autocomplete.setFields(['geometry', 'formatted_address']);
    this.listen();
  }


  render() {
    const { label, defaultValue, google } = this.props;
    const { name } = defaultValue || { name: '' };

    if (!this.autocomplete) {
      this.renderAutocomplete();
    }

    return (
      <TextField
        id={`autocomplete-${camelCase(label)}-${Math.floor(Math.random() * 1000)}`}
        inputRef={(element) => { this.element = element; }}
        type="text"
        label={label}
        defaultValue={name}
        fullWidth
      />
    );
  }
}

export default withStyles(styles)(withGoogle(AutocompleteInput));
