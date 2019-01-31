// @flow
import React from 'react';

type Props = {
  img: string,
  name: string,
  vehicleClass: string,
  passengers: number,
  luggage: number,
  price: number,
  isSelected: Function,
};

function Vehicle(props: Props) {
  const {
    img,
    name,
    vehicleClass,
    passengers,
    luggage,
    price,
    isSelected,
  } = props;

  return (
    <div className="row">
      <div className="col-sm-4">
        <img className="img-fluid" src={img} alt={name} />
      </div>
      <div className="col-sm-4">
        <h5>{name}</h5>
        <p>{vehicleClass}</p>
        <p>
          <span>
            passengers:&nbsp;
            {passengers}
          </span>
          <br />
          <span>
            luggage:&nbsp;
            {luggage}
          </span>
        </p>
      </div>
      <div className="col-sm-4">
        <h4>{price}</h4>
        <button type="submit" onClick={isSelected}>Select Vehicle</button>
      </div>
    </div>
  );
}

export default Vehicle;
