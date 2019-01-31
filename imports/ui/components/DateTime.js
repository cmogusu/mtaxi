import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';


type Props = {
  onChange: Function,
  label: string,
  minDate: {},
  date: {},
};


function DateTime(props: Props) {
  const {
    onChange,
    date,
    label,
    minDate
  } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        margin="normal"
        label={label}
        value={date}
        onChange={onChange}
        minDate={minDate}
        fullWidth
        disablePast
        clearable
      />
    </MuiPickersUtilsProvider>
  );
}


export default DateTime;
