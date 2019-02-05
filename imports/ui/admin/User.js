import React from 'react';
import Button from '@material-ui/core/Button';

type Props = {
  _id: String,
  username: String,
  imgUrl?: String,
  roles?: Array,
  editUser: Function,
  deleteUser: Function,
};

function User(props: Props) {
  const {
    _id,
    username,
    roles,
    imgUrl,
    editUser,
    deleteUser,
  } = props;

  const { default: defaultRoles } = roles;
  const role = defaultRoles ? defaultRoles.join(', ') : '';

  return (
    <div className="row">
      <div className="col-sm-2">{_id}</div>
      <div className="col-sm-2">{username}</div>
      <div className="col-sm-2">{role}</div>
      <div className="col-sm-2">
        <img className="img-fluid" alt={username} src={imgUrl} />
      </div>
      <div className="col-sm-2">
        <Button
          variant="contained"
          color="primary"
          onClick={editUser}
        >
          Edit
        </Button>
      </div>
      <div className="col-sm-2">
        <Button
          variant="contained"
          color="primary"
          onClick={deleteUser}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

User.defaultProps = {
  roles: {
    default: ['client'],
  },
  imgUrl: 'logo.png',
};

export default User;
