import React, { Component } from 'react';
import BookingWidget from './BookingWidget';
import '../../style/Home.css';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="home-body">
                <div className="home-container">
                    <h1>Wynajmij z nami samochód i ciesz się jazdą!</h1>
                    <div className='booking-widget-overlay'>
                        <BookingWidget />
                    </div>
                </div>
            </div>
        );
    }
}
