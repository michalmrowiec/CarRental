import React, { Component } from 'react';
import VehicleCard from './VehicleCard';
import { Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';


export class VehiclesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            pageSize: 10,
            page: 1,
            currentPage: 0,
            totalItems: 0,
            from: null,
            to: null,
            brandsToFiltier: { 'Wszystkie': '' },
            brand: 'Wszystkie',
            imageUrls: null
        };
    }

    componentDidMount() {
        this.getOptions();
        this.giveVehicles(this.state.page, this.state.pageSize, null, null);
    }

    async getOptions() {
        const response = await fetch('https://localhost:44403/api/v1/Vehicle/get-filtered', {
            method: 'OPTIONS',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const data = await response.json();

            let brands = {
                'Wszystkie': '', ...data.brand.reduce((obj, item) => {
                    obj[item] = item;
                    return obj;
                }, {})
            };

            this.setState({
                brandsToFiltier: brands
            });
        }
    }

    async giveVehicles(page, pageSize) {
        if (pageSize === undefined)
            pageSize = this.state.pageSize;

        if (this.state.from > this.state.to) {
            this.setState({
                from: '',
                to: ''
            })
        }


        const response = await fetch('https://localhost:44403/api/v1/Vehicle/get-filtered', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filters: 'brand@=' + this.state.brandsToFiltier[this.state.brand],
                sorts: '',
                page: page,
                pageSize: pageSize,
                from: this.state.from === '' ? null : this.state.from,
                to: this.state.to === '' ? null : this.state.to
            })
        });

        if (response.status === 200) {

            const data = await response.json();

            this.setState({
                vehicles: data.items, // Teraz 'vehicles' będzie zawierać wszystkie dane z odpowiedzi
                totalPages: data.totalPages,
                currentPage: page,
                pageSize: pageSize,
                totalItems: data.totalItems
              });
        }
    }

    handleBrandChange = (event) => {
        this.setState({ brand: event.target.value });
    }

    render() {
        const { vehicles, pageSize, currentPage, totalPages, brandsToFiltier, brand } = this.state;
        console.log(brandsToFiltier);
        return (
            <div className="container">

                <select value={brand} onChange={this.handleBrandChange}>
                    {Object.keys(brandsToFiltier).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>

                <div>
                    <label>From: </label>
                    <Input type="date" onChange={(e) => this.setState({ from: e.target.value })} value={this.state.from} />
                    <label>To: </label>
                    <Input type="date" onChange={(e) => this.setState({ to: e.target.value })} value={this.state.to} />
                    <button onClick={() => {
                        this.giveVehicles(1, this.state.pageSize)
                    }}>Filtruj</button>

                    <button onClick={() => {
                        this.setState({ from: '', to: '', brand: 'Wszystkie' });
                        this.giveVehicles(1, this.state.pageSize);
                    }}>Wyczyść filtry</button>
                </div>

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