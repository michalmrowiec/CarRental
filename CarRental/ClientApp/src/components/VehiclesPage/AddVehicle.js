import React, { useState,useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../../style/AddVehicleForm.css';
import UserContext from '../../context/UserContext'; // Zaimportuj UserContext


function AddVehicle() {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    vinNumber: '',
    licensePlate: '',
    brand: '',
    model: '',
    yearOfProduction: '',
    bodyType: '',
    fuelType: '',
    color: '',
    mileage: '',
    engineSize: '',
    enginePower: '',
    torque: '',
    gearboxType: '',
    weight: '',
    numberOfDoors: '',
    seats: '',
    carEquipment: '',
    isAvailable: false,
    nextCarInspection: '',
    rentalNetPricePerDay: '',
    currency: '',
    vatRate: ''
  });
  const [notification, setNotification] = useState(null);
  const { state } = useContext(UserContext); // Użyj Contextu do pobrania stanu
  const userToken = state.token; // Pobierz token z kontekstu


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setVehicle(prevVehicle => ({
      ...prevVehicle,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://localhost:44403/api/v1/Vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(vehicle)
      });

      if (response.ok) {
        const data = await response.json();
        const { id } = data;
        sessionStorage.setItem('vehicleId', id);
        resetState();
        setNotification('Samochód został pomyślnie dodany!');
        setTimeout(() => {
          setNotification(null);
          navigate('/AddVehicleImage');
        }, 3000);
      } else {
        setNotification('Błąd podczas dodawania pojazdu.');
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    } catch (error) {
      setNotification('Wystąpił błąd podczas wysyłania żądania.');
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const resetState = () => {
    setVehicle({
      vinNumber: '',
      licensePlate: '',
      brand: '',
      model: '',
      yearOfProduction: '',
      bodyType: '',
      fuelType: '',
      color: '',
      mileage: '',
      engineSize: '',
      enginePower: '',
      torque: '',
      gearboxType: '',
      weight: '',
      numberOfDoors: '',
      seats: '',
      carEquipment: '',
      isAvailable: false,
      nextCarInspection: '',
      rentalNetPricePerDay: '',
      currency: '',
      vatRate: ''
    });
  };

  const className = notification ? (notification.startsWith('Błąd') ? 'error-notification' : 'success-notification') : '';

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <FormGroup>
            <Label for="brand">Marka</Label>
            <Input type="text" name="brand" id="brand" onChange={handleChange} value={vehicle.brand} />
          </FormGroup>
          <FormGroup>
            <Label for="vinNumber">Numer VIN</Label>
            <Input type="text" name="vinNumber" id="vinNumber" onChange={handleChange} value={vehicle.vinNumber} />
          </FormGroup>
          <FormGroup>
            <Label for="yearOfProduction">Rok produkcji</Label>
            <Input type="number" name="yearOfProduction" id="yearOfProduction" onChange={handleChange} value={vehicle.yearOfProduction} />
          </FormGroup>
          <FormGroup>
            <Label for="fuelType">Rodzaj paliwa</Label>
            <Input type="text" name="fuelType" id="fuelType" onChange={handleChange} value={vehicle.fuelType} />
          </FormGroup>
          <FormGroup>
            <Label for="mileage">Przebieg</Label>
            <Input type="number" name="mileage" id="mileage" onChange={handleChange} value={vehicle.mileage} />
          </FormGroup>
          <FormGroup>
            <Label for="enginePower">Moc silnika</Label>
            <Input type="number" name="enginePower" id="enginePower" onChange={handleChange} value={vehicle.enginePower} />
          </FormGroup>
          <FormGroup>
            <Label for="gearboxType">Typ skrzyni biegów</Label>
            <Input type="text" name="gearboxType" id="gearboxType" onChange={handleChange} value={vehicle.gearboxType} />
          </FormGroup>
          <FormGroup>
            <Label for="numberOfDoors">Liczba drzwi</Label>
            <Input type="number" name="numberOfDoors" id="numberOfDoors" onChange={handleChange} value={vehicle.numberOfDoors} />
          </FormGroup>
          <FormGroup>
            <Label for="carEquipment">Wyposażenie samochodu</Label>
            <Input type="text" name="carEquipment" id="carEquipment" onChange={handleChange} value={vehicle.carEquipment} />
          </FormGroup>
          <FormGroup>
            <Label for="nextCarInspection">Następny przegląd</Label>
            <Input type="date" name="nextCarInspection" id="nextCarInspection" onChange={handleChange} value={vehicle.nextCarInspection} />
          </FormGroup>
          <FormGroup>
            <Label for="currency">Waluta</Label>
            <Input type="text" name="currency" id="currency" onChange={handleChange} value={vehicle.currency} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="model">Model</Label>
            <Input type="text" name="model" id="model" onChange={handleChange} value={vehicle.model} />
          </FormGroup>
          <FormGroup>
            <Label for="licensePlate">Numer rejestracyjny</Label>
            <Input type="text" name="licensePlate" id="licensePlate" onChange={handleChange} value={vehicle.licensePlate} />
          </FormGroup>
          <FormGroup>
            <Label for="bodyType">Typ nadwozia</Label>
            <Input type="text" name="bodyType" id="bodyType" onChange={handleChange} value={vehicle.bodyType} />
          </FormGroup>
          <FormGroup>
            <Label for="color">Kolor</Label>
            <Input type="text" name="color" id="color" onChange={handleChange} value={vehicle.color} />
          </FormGroup>
          <FormGroup>
            <Label for="engineSize">Pojemność silnika</Label>
            <Input type="number" name="engineSize" id="engineSize" onChange={handleChange} value={vehicle.engineSize} />
          </FormGroup>
          <FormGroup>
            <Label for="torque">Moment obrotowy</Label>
            <Input type="number" name="torque" id="torque" onChange={handleChange} value={vehicle.torque} />
          </FormGroup>
          <FormGroup>
            <Label for="weight">Waga</Label>
            <Input type="number" name="weight" id="weight" onChange={handleChange} value={vehicle.weight} />
          </FormGroup>
          <FormGroup>
            <Label for="seats">Liczba miejsc</Label>
            <Input type="number" name="seats" id="seats" onChange={handleChange} value={vehicle.seats} />
          </FormGroup>
          <FormGroup>
            <Label for="rentalNetPricePerDay">Cena netto za dzień wynajmu</Label>
            <Input type="number" name="rentalNetPricePerDay" id="rentalNetPricePerDay" onChange={handleChange} value={vehicle.rentalNetPricePerDay} />
          </FormGroup>
          <FormGroup>
            <Label for="vatRate">Stawka VAT</Label>
            <Input type="number" name="vatRate" id="vatRate" onChange={handleChange} value={vehicle.vatRate} />
          </FormGroup>
          <FormGroup check className='availableCheckBox'>
            <Label check for="isAvailable">
              <Input className="form-check-input" type="checkbox" name="isAvailable" id="isAvailable" onChange={handleChange} checked={vehicle.isAvailable} />
              Dostępność
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit">Dodaj samochód</Button>
      {notification && <div className={`notification ${className}`}>{notification}</div>}
    </Form>
  );
}

export default AddVehicle;
