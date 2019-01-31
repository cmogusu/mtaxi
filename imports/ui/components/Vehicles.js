import React from 'react';
import { camelCase } from 'lodash';
import Vehicle from './Vehicle.js';

class Vehicles extends React.Component {
  state = {
    activeIndex: 0,
  }

  cars = [{
    name: 'Saloon - Sedan',
    img: '/img/car1.png',
    vehicleClass: 'Standard Class',
    passengers: 4,
    luggage: 3,
    price: 9,
  }, {
    name: 'Estate -Wagon',
    img: '/img/car2.png',
    vehicleClass: 'Standard Class',
    passengers: 4,
    luggage: 3,
    price: 9,
  }, {
    name: 'Toyota Prius',
    img: '/img/car3.png',
    vehicleClass: 'Standard Class',
    passengers: 4,
    luggage: 3,
    price: 9,
  }, {
    name: '6 Seater MPV/SUV',
    img: '/img/car4.png',
    vehicleClass: 'Standard Class',
    passengers: 6,
    luggage: 3,
    price: 9,
  }, {
    name: 'VW Transporter',
    img: '/img/car5.png',
    vehicleClass: 'Standard Class',
    passengers: 7,
    luggage: 3,
    price: 9,
  }];

  isSelected = (index) => {
    /*
    this.setState({
      activeIndex: index,
    });
    */

    console.log('activeIndex', index);
  }

  render() {
    return (
      <div>
        {this.cars.map((car, index) => (
          <Vehicle
            key={camelCase(car.name)}
            {...car}
            isSelected={() => this.isSelected(index)}
          />
        ))}
      </div>
    );
  }
}

export default Vehicles;
