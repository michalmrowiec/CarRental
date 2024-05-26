import React, { Component } from 'react';
import BookingWidget from './BookingWidget'; // Upewnij się, że ścieżka do komponentu jest poprawna
import rentalBackground from '../../images/rental_background.jpeg';
import '../../style/Home.css'; // Załóżmy, że style są zapisane w pliku Home.css

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className="home-container">
        <h1>Wynajmij z nami samochód i ciesz się jazdą!</h1>
        <div className='background-image-container'>
          <img src={rentalBackground} alt="Rental Background" className="img-fluid rounded"/>
          <div className='booking-widget-overlay'>
            <BookingWidget />
          </div>
        </div>
      </div>
    );
  }
}
