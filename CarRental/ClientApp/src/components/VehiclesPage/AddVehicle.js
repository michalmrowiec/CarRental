import React, { useState, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../../style/AddVehicleForm.css';
import UserContext from '../../context/UserContext'; // Import UserContext

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
  const { state } = useContext(UserContext); // Use Context to get the state
  const userToken = state.token; // Get the token from the context

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
        setNotification('Vehicle has been successfully added!');
        setTimeout(() => {
          setNotification(null);
          navigate('/AddVehicleImage');
        }, 3000);
      } else {
        setNotification('Error while adding vehicle.');
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    } catch (error) {
      setNotification('An error occurred while sending the request.');
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

  const className = notification ? (notification.startsWith('Error') ? 'error-notification' : 'success-notification') : '';

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <FormGroup>
            <Label for="brand">Brand</Label>
            <Input type="text" name="brand" id="brand" onChange={handleChange} value={vehicle.brand} />
          </FormGroup>
          <FormGroup>
            <Label for="vinNumber">VIN Number</Label>
            <Input type="text" name="vinNumber" id="vinNumber" onChange={handleChange} value={vehicle.vinNumber} />
          </FormGroup>
          <FormGroup>
            <Label for="yearOfProduction">Year of Production</Label>
            <Input type="number" name="yearOfProduction" id="yearOfProduction" onChange={handleChange} value={vehicle.yearOfProduction} />
          </FormGroup>
          <FormGroup>
            <Label for="fuelType">Fuel Type</Label>
            <Input type="text" name="fuelType" id="fuelType" onChange={handleChange} value={vehicle.fuelType} />
          </FormGroup>
          <FormGroup>
            <Label for="mileage">Mileage</Label>
            <Input type="number" name="mileage" id="mileage" onChange={handleChange} value={vehicle.mileage} />
          </FormGroup>
          <FormGroup>
            <Label for="enginePower">Engine Power</Label>
            <Input type="number" name="enginePower" id="enginePower" onChange={handleChange} value={vehicle.enginePower} />
          </FormGroup>
          <FormGroup>
            <Label for="gearboxType">Gearbox Type</Label>
            <Input type="text" name="gearboxType" id="gearboxType" onChange={handleChange} value={vehicle.gearboxType} />
          </FormGroup>
          <FormGroup>
            <Label for="numberOfDoors">Number of Doors</Label>
            <Input type="number" name="numberOfDoors" id="numberOfDoors" onChange={handleChange} value={vehicle.numberOfDoors} />
          </FormGroup>
          <FormGroup>
            <Label for="carEquipment">Car Equipment</Label>
            <Input type="text" name="carEquipment" id="carEquipment" onChange={handleChange} value={vehicle.carEquipment} />
          </FormGroup>
          <FormGroup>
            <Label for="nextCarInspection">Next Car Inspection</Label>
            <Input type="date" name="nextCarInspection" id="nextCarInspection" onChange={handleChange} value={vehicle.nextCarInspection} />
          </FormGroup>
          <FormGroup>
            <Label for="currency">Currency</Label>
            <Input type="text" name="currency" id="currency" onChange={handleChange} value={vehicle.currency} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="model">Model</Label>
            <Input type="text" name="model" id="model" onChange={handleChange} value={vehicle.model} />
          </FormGroup>
          <FormGroup>
            <Label for="licensePlate">License Plate</Label>
            <Input type="text" name="licensePlate" id="licensePlate" onChange={handleChange} value={vehicle.licensePlate} />
          </FormGroup>
          <FormGroup>
            <Label for="bodyType">Body Type</Label>
            <Input type="text" name="bodyType" id="bodyType" onChange={handleChange} value={vehicle.bodyType} />
          </FormGroup>
          <FormGroup>
            <Label for="color">Color</Label>
            <Input type="text" name="color" id="color" onChange={handleChange} value={vehicle.color} />
          </FormGroup>
          <FormGroup>
            <Label for="engineSize">Engine Size</Label>
            <Input type="number" name="engineSize" id="engineSize" onChange={handleChange} value={vehicle.engineSize} />
          </FormGroup>
          <FormGroup>
            <Label for="torque">Torque</Label>
            <Input type="number" name="torque" id="torque" onChange={handleChange} value={vehicle.torque} />
          </FormGroup>
          <FormGroup>
            <Label for="weight">Weight</Label>
            <Input type="number" name="weight" id="weight" onChange={handleChange} value={vehicle.weight} />
          </FormGroup>
          <FormGroup>
            <Label for="seats">Number of Seats</Label>
            <Input type="number" name="seats" id="seats" onChange={handleChange} value={vehicle.seats} />
          </FormGroup>
          <FormGroup>
            <Label for="rentalNetPricePerDay">Rental Net Price Per Day</Label>
            <Input type="number" name="rentalNetPricePerDay" id="rentalNetPricePerDay" onChange={handleChange} value={vehicle.rentalNetPricePerDay} />
          </FormGroup>
          <FormGroup>
            <Label for="vatRate">VAT Rate</Label>
            <Input type="number" name="vatRate" id="vatRate" onChange={handleChange} value={vehicle.vatRate} />
          </FormGroup>
          <FormGroup  className='availableCheckBox'>
            <Label>Availability</Label>
            <br></br>
            <Input className="form-check-input" type="checkbox" name="isAvailable" id="isAvailable" onChange={handleChange} checked={vehicle.isAvailable} />
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit">Add Vehicle</Button>
      {notification && <div className={`notification ${className}`}>{notification}</div>}
    </Form>
  );
}

export default AddVehicle;

