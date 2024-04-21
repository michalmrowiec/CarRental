import React, { Component } from 'react';
import VehicleCard from './VehicleCard';

export class VehiclesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [
                { name: 'Szkoda że Octavia', image: './images/big_car.jpeg', description: 'des sdfsdf sd fsdf', price: '100zł' },
                { name: 'Szkoda że Fabia', image: './images/medium_car.jpeg', description: 'des sdfsddff', price: '50zł' }
                // Tutaj umieść swoją statyczną listę pojazdów
                // Na przykład:
                // { name: 'Pojazd 1', image: 'url do obrazka', description: 'opis', price: 'cena' },
                // { name: 'Pojazd 2', image: 'url do obrazka', description: 'opis', price: 'cena' },
                // itd.
            ]
        };
    }

    componentDidMount() {
        this.giveVehicles();
    }

    render() {
        const { vehicles } = this.state;
        return (
            <div>
                {vehicles.map((vehicle, index) => (
                    <VehicleCard key={index} vehicle={vehicle} />
                ))}
            </div>
        );
    }

    async giveVehicles() {
        const response = await fetch('https://localhost:44403/api/v1/Vehicle/get-filtered', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filters: '',
                sorts: '',
                page: 1,
                pageSize: 10
            })
        });

        if (response.status === 200) {
            console.log("downloaded");

            const data = await response.json();
            console.log(data);

            const vehicles = data.items.map(item => ({
                name: item.brand + ' ' + item.model,
                image: item.imageUrls.slice(0,-1),
                description: item.carEquipment,
                price: item.rentalNetPricePerDay + item.currency
            }));
            console.log(vehicles);
            this.setState({ vehicles });
        }
    }


}