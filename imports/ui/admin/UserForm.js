import React from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ImageUploader from '../components/ImageUploader.js';

type Props = {
  username?: string,
  password?: string,
  imgUrl?: string,
  roles?: {},
  buttonLabel?: string,
  setUser: Function,
};


class UserForm extends React.Component<Props> {
  static defaultProps = {
    username: `user${Math.floor(Math.random() * 1000)}`,
    password: `password${Math.floor(Math.random() * 1000)}`,
    imgUrl: '',
    roles: {
      default: [],
    },
    buttonLabel: 'Add New',
  };

  state = {
    role: '',
    imgUrl: '',
  };

  roles = [{
    label: 'Master',
    value: 'master',
  }, {
    label: 'Subscriber',
    value: 'subscriber',
  }, {
    label: 'Operator',
    value: 'operator',
  }, {
    label: 'Client',
    value: 'client',
  }, {
    label: 'Driver',
    value: 'driver',
  }];

  constructor(props) {
    super(props);

    const { roles, imgUrl } = props;
    const { default: defaultRoles } = roles;
    const role = defaultRoles ? defaultRoles.join(', ') : '';

    this.state.role = role;
    this.state.imgUrl = imgUrl;
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const { imgUrl } = this.state;
    const { setUser } = this.props;
    const { currentTarget } = event;
    const {
      username,
      password,
      role,
    } = currentTarget;

    const newVehicle = {
      imgUrl,
      username: username.value,
      password: password.value,
      role: role.value,
    };

    setUser(newVehicle);
  };


  render() {
    const {
      role,
      imgUrl,
    } = this.state;

    const {
      username,
      password,
      buttonLabel,
    } = this.props;


    return (
      <div>
        <form onSubmit={this.handleSubmit} className="row">
          <div className="col-sm-4">
            <ImageUploader
              imgUrl={imgUrl}
              setImgUrl={newImageUrl => this.setState({ imgUrl: newImageUrl })}
            />
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-6 mb-3">
                <TextField
                  type="text"
                  name="username"
                  defaultValue={username}
                  placeholder="Username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-sm-6 mb-3">
                <TextField
                  type="password"
                  name="password"
                  defaultValue={password}
                  placeholder="Password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-sm-12 mb-3">
                <Select
                  inputProps={{
                    name: 'role',
                    placeholder: 'Roles',
                  }}
                  value={role}
                  onChange={event => this.setState({ role: event.currentTarget.dataset.value })}
                  label="Class"
                  fullWidth
                >
                  {this.roles.map(theRole => (
                    <MenuItem key={theRole.value} value={theRole.value}>
                      {theRole.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className="col-sm-12 mb-3">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {buttonLabel}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserForm;
