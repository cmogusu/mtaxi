import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

type Props = {
  classes: {},
};

class Input extends React.Component<Props> {
  state = {
    val: '',
  }

  render() {
    const { val } = this.state;
    const { classes } = this.props;

    return (
      <TextField
        id="standard-name"
        label="name"
        className={classes.textField}
        value={val}
        onChange={event => this.setState({ val: event.currentTarget.value })}
        margin="normal"
      />
    );
  }
}


export default withStyles(styles)(Input);
