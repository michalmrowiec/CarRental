import React, { Component } from 'react';
import VehicleCard from './VehicleCard';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


export class VehiclesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            pageSize: 10,
            page: 1,
            currentPage: 0,
            totalItems: 0
        };
    }

    componentDidMount() {
        this.giveVehicles(this.state.page, this.state.pageSize);
    }

    async giveVehicles(page, pageSize) {
        if (pageSize === undefined)
            pageSize = this.state.pageSize;

        const response = await fetch('https://localhost:44403/api/v1/Vehicle/get-filtered', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filters: '',
                sorts: '',
                page: page,
                pageSize: pageSize
            })
        });

        if (response.status === 200) {
            console.log("downloaded");

            const data = await response.json();
            console.log(data);

            const vehicles = data.items.map(item => ({
                name: item.brand + ' ' + item.model,
                image: 'images/VehicleImage/sample_car.jpeg',//item.imageUrls.slice(0, -1),
                description: item.carEquipment,
                price: item.rentalNetPricePerDay + item.currency
            }));

            this.setState({
                vehicles,
                totalPages: data.totalPages,
                currentPage: page,
                pageSize: pageSize,
                totalItems: data.totalItems
            });
        }
    }

    render() {
        const { vehicles, pageSize, currentPage, totalPages } = this.state;
        return (
            <div className="container">
                {vehicles.map((vehicle, index) => (
                    <VehicleCard key={index} vehicle={vehicle} />
                ))}

                <div className="mt-2 d-flex justify-content-center align-items-center">
                    <Pagination size="">
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink
                                first
                                onClick={() => this.giveVehicles(1)}
                            />
                        </PaginationItem>
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink
                                previous
                                onClick={() => this.giveVehicles(currentPage - 1)}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((page, i) =>
                            <PaginationItem active={i === currentPage - 1} key={i}>
                                <PaginationLink href="" onClick={() => this.giveVehicles(i + 1)}>
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink
                                next
                                onClick={() => this.giveVehicles(currentPage + 1)}
                            />
                        </PaginationItem>
                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink
                                last
                                onClick={() => this.giveVehicles(totalPages)}
                            />
                        </PaginationItem>
                    </Pagination>

                    <div className="ms-2 d-flex">
                        <select className="form-select form-select-sm" style={{ width: 'auto', marginBottom: '1rem' }} onChange={(e) => this.giveVehicles(1, e.target.value)}>
                            <option value={2} selected={pageSize === 2}>2</option>
                            <option value={10} selected={pageSize === 10}>10</option>
                            <option value={20} selected={pageSize === 20}>20</option>
                            <option value={50} selected={pageSize === 50}>50</option>
                        </select>

                        <div className="ms-2">
                            Total items: {this.state.totalItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}