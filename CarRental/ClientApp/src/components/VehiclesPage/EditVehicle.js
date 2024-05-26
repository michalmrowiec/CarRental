import React, {useState,useContext} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';


function EditVehicle(props) {
    const location = useLocation();
    // const vehicle = location.state;
    const [vehicle, setVehicle] = useState(location.state.vehicle || {});
    console.log(vehicle);
    const { state } = useContext(UserContext); // Use Context to get the state
    const userToken = state.token; // Get the token from the context

  const navigate = useNavigate();

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
    // Tutaj można dodać logikę wysłania zaktualizowanych danych pojazdu
    // Przykład: fetch(`https://localhost:44403/api/v1/Vehicle/${vehicleId}`, {
    // Metoda PUT z zaktualizowanymi danymi pojazdu
    // });
    //navigate('/'); // Powrót do listy pojazdów po zatwierdzeniu zmian
    try {
        const response = await fetch('https://localhost:44403/api/v1/Vehicle', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify(vehicle)
        });
  
        if (response.ok) {
          const data = await response.json();
          navigate('/MenageVehiclesList');
        } else {
          console.log('Error while adding vehicle.');
        }
      } catch (error) {
        console.log('An error occurred while sending the request.');
      }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="brand">Brand</Label>
        <Input type="text" name="brand" id="brand" onChange={handleChange} value={vehicle.brand} />
      </FormGroup>
      <FormGroup>
        <Label for="model">Model</Label>
        <Input type="text" name="model" id="model" onChange={handleChange} value={vehicle.model} />
      </FormGroup>
      <FormGroup>
        <Label for="yearOfProduction">Year of Production</Label>
        <Input type="text" name="yearOfProduction" id="yearOfProduction" onChange={handleChange} value={vehicle.yearOfProduction} />
      </FormGroup>
      <FormGroup>
        <Label for="vinNumber">VIN Number</Label>
        <Input type="text" name="vinNumber" id="vinNumber" onChange={handleChange} value={vehicle.vinNumber} />
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
        <Label for="fuelType">Fuel Type</Label>
        <Input type="text" name="fuelType" id="fuelType" onChange={handleChange} value={vehicle.fuelType} />
      </FormGroup>
      <FormGroup>
        <Label for="color">Color</Label>
        <Input type="text" name="color" id="color" onChange={handleChange} value={vehicle.color} />
      </FormGroup>
      <FormGroup>
        <Label for="mileage">Mileage</Label>
        <Input type="text" name="mileage" id="mileage" onChange={handleChange} value={vehicle.mileage} />
      </FormGroup>
      <FormGroup>
        <Label for="engineSize">Engine Size</Label>
        <Input type="text" name="engineSize" id="engineSize" onChange={handleChange} value={vehicle.engineSize} />
      </FormGroup>
      <FormGroup>
        <Label for="enginePower">Engine Power</Label>
        <Input type="text" name="enginePower" id="enginePower" onChange={handleChange} value={vehicle.enginePower} />
      </FormGroup>
      <FormGroup>
        <Label for="torque">Torque</Label>
        <Input type="text" name="torque" id="torque" onChange={handleChange} value={vehicle.torque} />
      </FormGroup>
      <FormGroup>
        <Label for="gearboxType">Gearbox Type</Label>
        <Input type="text" name="gearboxType" id="gearboxType" onChange={handleChange} value={vehicle.gearboxType} />
      </FormGroup>
      <FormGroup>
        <Label for="weight">Weight</Label>
        <Input type="text" name="weight" id="weight" onChange={handleChange} value={vehicle.weight} />
      </FormGroup>
      <FormGroup>
        <Label for="numberOfDoors">Number of Doors</Label>
        <Input type="text" name="numberOfDoors" id="numberOfDoors" onChange={handleChange} value={vehicle.numberOfDoors} />
      </FormGroup>
      <FormGroup>
        <Label for="seats">Number of Seats</Label>
        <Input type="text" name="seats" id="seats" onChange={handleChange} value={vehicle.seats} />
      </FormGroup>
      <FormGroup>
        <Label for="carEquipment">Car Equipment</Label>
        <Input type="text" name="carEquipment" id="carEquipment" onChange={handleChange} value={vehicle.carEquipment} />
      </FormGroup>
      <FormGroup>
        <Label for="isAvailable">Availability</Label>
        <Input type="checkbox" name="isAvailable" id="isAvailable" onChange={handleChange} checked={vehicle.isAvailable} />
      </FormGroup>
      <FormGroup>
        <Label for="nextCarInspection">Next Car Inspection</Label>
        <Input type="text" name="nextCarInspection" id="nextCarInspection" onChange={handleChange} value={vehicle.nextCarInspection} />
      </FormGroup>
      <FormGroup>
        <Label for="rentalNetPricePerDay">Rental Net Price Per Day</Label>
        <Input type="text" name="rentalNetPricePerDay" id="rentalNetPricePerDay" onChange={handleChange} value={vehicle.rentalNetPricePerDay} />
      </FormGroup>
      <FormGroup>
        <Label for="currency">Currency</Label>
        <Input type="text" name="currency" id="currency" onChange={handleChange} value={vehicle.currency} />
      </FormGroup>
      <FormGroup>
        <Label for="vatRate">VAT Rate</Label>
        <Input type="text" name="vatRate" id="vatRate" onChange={handleChange} value={vehicle.vatRate} />
      </FormGroup>
      <Button type="submit">Save Changes</Button>
    </Form>
  );
}

export default EditVehicle;
