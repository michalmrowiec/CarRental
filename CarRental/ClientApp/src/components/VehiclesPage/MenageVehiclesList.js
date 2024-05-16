import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import  '../../style/MenagementVehicles.css';

const MenageVehicleCard = ({ vehicle, onEdit, onAddPhoto }) => {
  return (
    <Col lg="3" md="4" sm="6" className="mb-4">
      <Card className="h-100 d-flex flex-column">
        <CardImg top className="img-fluid card-img-top" src={vehicle.image || 'placeholder-image-url'} alt={`${vehicle.brand} ${vehicle.model}`} />
        <CardBody>
          <CardTitle tag="h5">{vehicle.brand} {vehicle.model}</CardTitle>
          <Button color="primary" onClick={() => onEdit(vehicle)}>Edit</Button>{' '}
          <Button color="secondary" onClick={() => onAddPhoto(vehicle)}>Add Photo</Button>
        </CardBody>
      </Card>
    </Col>
  );
};

const MenageVehiclesList = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('https://localhost:44403/api/v1/Vehicle/get-filtered', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filters: '',
            sorts: '',
            page: 1,
            pageSize: 100,
            from: null,
            to: null
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVehicles(data.items.map(item => ({
          id: item.id,
          brand: item.brand,
          model: item.model,
          image: item.coverImageUrl,
          price: `${item.rentalNetPricePerDay} ${item.currency}`
        })));
      } catch (error) {
        console.error('Błąd podczas pobierania listy pojazdów:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleEdit = (vehicle) => {
    console.log('Edytuj pojazd:', vehicle);
    // Tutaj można dodać logikę edycji pojazdu
  };

  const handleAddPhoto = (vehicle) => {
    navigate('/AddVehicleImage', { state: { vehicleId: vehicle.id } });
  };

  return (
    <Row>
      {vehicles.map((vehicle) => (
        <MenageVehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onEdit={handleEdit}
          onAddPhoto={handleAddPhoto}
        />
      ))}
    </Row>
  );
};

export default MenageVehiclesList;
