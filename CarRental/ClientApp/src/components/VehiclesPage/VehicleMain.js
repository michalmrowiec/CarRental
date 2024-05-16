import React, { useContext } from 'react';
import { Row, Col, Button, Card } from 'reactstrap';
import UserContext from '../../context/UserContext';
import { VehicleContext } from '../../context/VehicleContext'; // Import VehicleContext

const VehicleMain = () => {
  const { selectedVehicle } = useContext(VehicleContext); // Użyj selectedVehicle z kontekstu
  const { state } = useContext(UserContext);
  const isLoggedIn = state.token !== null;
  console.log('selectedVehicle: ');  
  console.log(selectedVehicle);
  if (!isLoggedIn) {
    return <div>Proszę się zalogować, aby zobaczyć szczegóły pojazdu.</div>;
  }

  if (!selectedVehicle) {
    return <div>Nie wybrano pojazdu.</div>; // Dodaj warunek sprawdzający, czy pojazd został wybrany
  }

  // Użyj danych z selectedVehicle do renderowania informacji o pojeździe
  return (
    <Card className="my-3 p-3">
      <Row>
        <Col md="4">
          <img src={selectedVehicle.coverImageUrl} alt={`${selectedVehicle.brand} ${selectedVehicle.model}`} className="img-fluid" />
        </Col>
        <Col md="8">
          <Row>
            <Col md="8">
              <h3>{selectedVehicle.brand} {selectedVehicle.model}</h3>
              <p>Typ skrzyni biegów: {selectedVehicle.gearboxType}</p>
              <p>Liczba drzwi: {selectedVehicle.numberOfDoors}</p>
              <p>Miejsca: {selectedVehicle.seats}</p>
            </Col>
            <Col md="4">
              <p className="price">Cena: {selectedVehicle.price || '100 PLN/dzień'}</p>
              <Button color="primary">Select</Button>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <h5>Wyposażenie:</h5>
              <h5>{selectedVehicle.carEquipment}</h5>
            </Col>
            <Col md="8">
              <h5>Pozostałe informacje:</h5>
              {/* Tutaj możesz dodać więcej szczegółów o pojeździe */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default VehicleMain;
