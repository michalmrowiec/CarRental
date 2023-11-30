import React, { Component } from 'react';
import rentalBackground from '../images/rental_background.jpeg';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Wynajmij z nami samochód i ciesz się jazdą!</h1>
        <div className='w-100 h-50'>
          <img src={rentalBackground} alt="Rental Background" className="img-fluid rounded"/>
        </div>
      </div>
    );
  }
}

