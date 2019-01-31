import React from 'react';
import Slider from '@material-ui/lab/Slider';


type Props = {
  value: number,
  onChange: Function,
};


function MySlider(props: Props) {
  const { value, onChange } = props;

  return (
    <Slider
      value={value}
      min={0}
      max={10}
      step={1}
      onChange={onChange}
    />
  );
}


export default MySlider;
