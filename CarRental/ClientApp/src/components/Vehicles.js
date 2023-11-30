import React, { Component } from 'react';
import Vehicle from './Vehicle'; 

export class Vehicles extends Component {
  static displayName = Vehicles.name;

  constructor(props) {
    super(props);
    this.state = { vehicles: [], loading: true };
  }

  componentDidMount() {
    this.giveVehicles();
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : (
        <div>
          <h1 id="Vehicles">Vehicles</h1>
          <p>Our car option(s)</p>
          <div className="row">
            {this.state.vehicles.map(vehicle => (
              <div className="col-md-6" key={vehicle}>
                <Vehicle imagePath={vehicle} />
              </div>
            ))}
          </div>
        </div>
      );

    return (
      <div className="container">
        {contents}
      </div>
    );
  }

  async giveVehicles() {
    const vehicleImages = ['small_car', 'medium_car', 'big_car', 'premium_car'];
    this.setState({ vehicles: vehicleImages, loading: false });
  }
}
