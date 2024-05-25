import React, { useContext } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { VehicleContext } from '../../context/VehicleContext'; // Załóżmy, że kontekst został już utworzony

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
  const { setSelectedVehicle } = useContext(VehicleContext);

  const handleRentClick = () => {
    setSelectedVehicle(vehicle); // Aktualizacja kontekstu z wybranym pojazdem
    navigate('/VehicleMain'); // Nawigacja do VehicleMain
  };

  return (
    <Card style={{ height: '200px' }}>
      <div style={{ display: 'flex' }}>
        <CardImg style={{ width: '30%', objectFit: 'cover', flex: '0 0 auto' }} src={vehicle.coverImageUrl} alt="Card image cap" />
        <CardBody style={{ flex: '1' }}>
          <CardTitle tag="h5">{vehicle.brand} {vehicle.model}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{vehicle.rentalNetPricePerDay}/dzień</CardSubtitle>
          <Button onClick={handleRentClick}>Wynajmij</Button>
        </CardBody>
        <CardBody style={{ flex: '2' }}>
          <CardText>{vehicle.carEquipment}</CardText>
        </CardBody>
      </div>
    </Card>
  );
};

export default VehicleCard;
