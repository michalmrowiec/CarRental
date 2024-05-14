import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import '../../style/AddVehicleForm.css';

export class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      vehicle: {
        vinNumber: '',
        licensePlate: '',
        brand: '',
        model: '',
        yearOfProduction: 0,
        bodyType: '',
        fuelType: '',
        color: '',
        mileage: 0,
        engineSize: 0,
        enginePower: 0,
        torqe: 0,
        gearboxType: '',
        weight: 0,
        numberOfDoors: 0,
        seats: 0,
        carEquipment: '',
        isAvailable: false,
        nextCarInspection: '',
        rentalNetPricePerDay: 0,
        currency: '',
        vatRate: 0
      },
      notification: null
    };
    this.state = { ...this.initialState };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    this.setState(prevState => ({
      vehicle: {
        ...prevState.vehicle,
        [name]: newValue
      }
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const userToken = sessionStorage.getItem('userToken');
    try {
      const response = await fetch('https://localhost:44403/api/v1/Vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(this.state.vehicle)
      });
      console.log(response);
      if (response.ok) {
        this.setState({ notification: 'Samochód został pomyślnie dodany!' });
        this.resetState();
        setTimeout(() => {
          this.setState({ notification: null });
        }, 3000);
      } else {
        console.error('Błąd podczas dodawania pojazdu.');
        this.setState({ notification: 'Błąd podczas dodawania pojazdu.' });
        setTimeout(() => {
          this.setState({ notification: null });
        }, 3000);
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania:', error);
      this.setState({ notification: 'Wystąpił błąd podczas wysyłania żądania.' });
      setTimeout(() => {
        this.setState({ notification: null });
      }, 3000);
    }
  };

  resetState = () => {
    this.setState({ vehicle: this.initialState.vehicle });
  };
  

  render() {
    const { vehicle,notification } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
      <Row>
        
        <Col>
          <FormGroup>
            <Label for="brand">Marka</Label>
            <Input type="text" name="brand" id="brand" onChange={this.handleChange} value={vehicle.brand} />
          </FormGroup>
          <FormGroup>
          <Label for="vinNumber">Numer VIN</Label>
            <Input type="text" name="vinNumber" id="vinNumber" onChange={this.handleChange} value={vehicle.vinNumber} />
          </FormGroup>
          <FormGroup>
            <Label for="yearOfProduction">Rok produkcji</Label>
            <Input type="number" name="yearOfProduction" id="yearOfProduction" onChange={this.handleChange} value={vehicle.yearOfProduction} />
          </FormGroup>
          <FormGroup>
            <Label for="fuelType">Rodzaj paliwa</Label>
            <Input type="text" name="fuelType" id="fuelType" onChange={this.handleChange} value={vehicle.fuelType} />
          </FormGroup>
          <FormGroup>
            <Label for="mileage">Przebieg</Label>
            <Input type="number" name="mileage" id="mileage" onChange={this.handleChange} value={vehicle.mileage} />
          </FormGroup>
          <FormGroup>
            <Label for="enginePower">Moc silnika</Label>
            <Input type="number" name="enginePower" id="enginePower" onChange={this.handleChange} value={vehicle.enginePower} />
          </FormGroup>
          <FormGroup>
            <Label for="gearboxType">Typ skrzyni biegów</Label>
            <Input type="text" name="gearboxType" id="gearboxType" onChange={this.handleChange} value={vehicle.gearboxType} />
          </FormGroup>
          <FormGroup>
            <Label for="numberOfDoors">Liczba drzwi</Label>
            <Input type="number" name="numberOfDoors" id="numberOfDoors" onChange={this.handleChange} value={vehicle.numberOfDoors} />
          </FormGroup>
          <FormGroup>
            <Label for="carEquipment">Wyposażenie samochodu</Label>
            <Input type="text" name="carEquipment" id="carEquipment" onChange={this.handleChange} value={vehicle.carEquipment} />
          </FormGroup>
          <FormGroup>
            <Label for="nextCarInspection">Następny przegląd</Label>
            <Input type="date" name="nextCarInspection" id="nextCarInspection" onChange={this.handleChange} value={vehicle.nextCarInspection} />
          </FormGroup>
          <FormGroup>
            <Label for="currency">Waluta</Label>
            <Input type="text" name="currency" id="currency" onChange={this.handleChange} value={vehicle.currency} />
          </FormGroup>

        </Col>

        
        <Col>
          <FormGroup>
            <Label for="model">Model</Label>
            <Input type="text" name="model" id="model" onChange={this.handleChange} value={vehicle.model} />
          </FormGroup>
          <FormGroup>
            <Label for="licensePlate">Numer rejestracyjny</Label>
            <Input type="text" name="licensePlate" id="licensePlate" onChange={this.handleChange} value={vehicle.licensePlate} />
          </FormGroup>
          <FormGroup>
            <Label for="bodyType">Typ nadwozia</Label>
            <Input type="text" name="bodyType" id="bodyType" onChange={this.handleChange} value={vehicle.bodyType} />
          </FormGroup>
          <FormGroup>
            <Label for="color">Kolor</Label>
            <Input type="text" name="color" id="color" onChange={this.handleChange} value={vehicle.color} />
          </FormGroup>
          <FormGroup>
            <Label for="engineSize">Pojemność silnika</Label>
            <Input type="number" name="engineSize" id="engineSize" onChange={this.handleChange} value={vehicle.engineSize} />
          </FormGroup>
          <FormGroup>
            <Label for="torqe">Moment obrotowy</Label>
            <Input type="number" name="torqe" id="torqe" onChange={this.handleChange} value={vehicle.torqe} />
          </FormGroup>
          <FormGroup>
            <Label for="weight">Waga</Label>
            <Input type="number" name="weight" id="weight" onChange={this.handleChange} value={vehicle.weight} />
          </FormGroup>
          <FormGroup>
            <Label for="seats">Liczba miejsc</Label>
            <Input type="number" name="seats" id="seats" onChange={this.handleChange} value={vehicle.seats} />
          </FormGroup>
          
          <FormGroup>
            <Label for="rentalNetPricePerDay">Cena netto za dzień wynajmu</Label>
            <Input type="number" name="rentalNetPricePerDay" id="rentalNetPricePerDay" onChange={this.handleChange} value={vehicle.rentalNetPricePerDay} />
          </FormGroup>
          <FormGroup>
            <Label for="vatRate">Stawka VAT</Label>
            <Input type="number" name="vatRate" id="vatRate" onChange={this.handleChange} value={vehicle.vatRate} />
          </FormGroup>
          <FormGroup check className='avaiableCheckBox'>
            <Label check for="isAvailable">
              <Input className="form-check-input" type="checkbox" name="isAvailable" id="isAvailable" onChange={this.handleChange} checked={vehicle.isAvailable} />
              Dostępność
            </Label>
          </FormGroup>

        </Col>
      </Row>
      <Button type="submit">Dodaj samochód</Button>
      {notification && <div className="notification">{notification}</div>}
    </Form>
    );
  }
}

export default AddVehicle;
