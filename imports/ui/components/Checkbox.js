import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

type Props = {
  label: string,
  onChange: Function,
  isChecked: false,
};


function Checkbox(props: Props) {
  const { isChecked, onChange, label } = props;

  return (
    <FormControlLabel
      control={<Switch color="primary" checked={isChecked} onChange={onChange} value={label} />}
      label={label}
    />
  );
}

export default Checkbox;
