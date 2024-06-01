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
        <Card style={{ minHeight: '150px', height: 'auto', marginBottom: '1%' }}>
            <div style={{ display: 'flex' }}>
                <CardImg style={{ height: '20vh', width: 'auto', objectFit: 'cover', flex: '0 0 auto' }} src={vehicle.coverImageUrl || 'images\\VehicleImage\\no_photo.jpg'} alt="Card image cap" />
                <CardBody style={{ flex: '1' }}>
                    <CardTitle tag="h5">{vehicle.brand} {vehicle.model}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{vehicle.rentalNetPricePerDay}{vehicle.currency}/day</CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {vehicle.estimatedTotalGrossAmount}
                        {vehicle.currency}/total
                    </CardSubtitle>
                    <Button onClick={handleRentClick}>Rent car</Button>
                </CardBody>
            </div>
        </Card>
    );
};

export default VehicleCard;
