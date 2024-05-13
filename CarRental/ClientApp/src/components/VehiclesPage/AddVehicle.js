import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export function AddVehicle() {
  const [vehicle, setVehicle] = useState({
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
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setVehicle({ ...vehicle, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userToken = sessionStorage.getItem('userToken');

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
        console.log('Pojazd został dodany pomyślnie.');
        // W tym miejscu możesz obsłużyć sukces dodania pojazdu, np. wyświetlając komunikat potwierdzający
      } else {
        console.error('Błąd podczas dodawania pojazdu.');
        // W tym miejscu możesz obsłużyć przypadek niepowodzenia dodania pojazdu, np. wyświetlając komunikat o błędzie
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania:', error);
      // W tym miejscu możesz obsłużyć błąd związany z wysłaniem żądania, np. wyświetlając komunikat o błędzie
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="vinNumber">Numer VIN</Label>
        <Input type="text" name="vinNumber" id="vinNumber" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="licensePlate">Numer rejestracyjny</Label>
        <Input type="text" name="licensePlate" id="licensePlate" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="brand">Marka</Label>
        <Input type="text" name="brand" id="brand" onChange={handleChange}>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="model">Model</Label>
        <Input type="text" name="model" id="model" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="yearOfProduction">Rok produkcji</Label>
        <Input type="number" name="yearOfProduction" id="yearOfProduction" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="bodyType">Typ nadwozia</Label>
        <Input type="text" name="bodyType" id="bodyType" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="fuelType">Rodzaj paliwa</Label>
        <Input type="text" name="fuelType" id="fuelType" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="color">Kolor</Label>
        <Input type="text" name="color" id="color" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="mileage">Przebieg</Label>
        <Input type="number" name="mileage" id="mileage" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="engineSize">Pojemność silnika</Label>
        <Input type="number" name="engineSize" id="engineSize" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="enginePower">Moc silnika</Label>
        <Input type="number" name="enginePower" id="enginePower" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="torqe">Moment obrotowy</Label>
        <Input type="number" name="torqe" id="torqe" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="gearboxType">Typ skrzyni biegów</Label>
        <Input type="text" name="gearboxType" id="gearboxType" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="weight">Waga</Label>
        <Input type="number" name="weight" id="weight" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="numberOfDoors">Liczba drzwi</Label>
        <Input type="number" name="numberOfDoors" id="numberOfDoors" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="seats">Liczba miejsc</Label>
        <Input type="number" name="seats" id="seats" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="carEquipment">Wyposażenie samochodu</Label>
        <Input type="text" name="carEquipment" id="carEquipment" onChange={handleChange} />
      </FormGroup>
      <FormGroup >
        <Label check for="isAvailable">Dostępność</Label>
        <span> </span>
        <Input type="checkbox" name="isAvailable" id="isAvailable" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="nextCarInspection">Następny przegląd</Label>
        <Input type="date" name="nextCarInspection" id="nextCarInspection" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="rentalNetPricePerDay">Cena netto za dzień wynajmu</Label>
        <Input type="number" name="rentalNetPricePerDay" id="rentalNetPricePerDay" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="currency">Waluta</Label>
        <Input type="text" name="currency" id="currency" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="vatRate">Stawka VAT</Label>
        <Input type="number" name="vatRate" id="vatRate" onChange={handleChange} />
      </FormGroup>
      <Button type="submit">Dodaj samochód</Button>
    </Form>
  );
};

export default AddVehicle;
