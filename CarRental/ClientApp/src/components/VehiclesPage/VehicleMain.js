import React, { useContext } from 'react';
import { Row, Col, Button, Card } from 'reactstrap';
import UserContext from '../../context/UserContext';
import { VehicleContext } from '../../context/VehicleContext'; // Import VehicleContext

const VehicleMain = () => {
    const { selectedVehicle } = useContext(VehicleContext); // Use selectedVehicle from context
    const { state } = useContext(UserContext);
    const isLoggedIn = state.token !== null;

    if (!isLoggedIn) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1>Please log in to see vehicle details.</h1>
                </div>
            </div>
        );
    }

    if (!selectedVehicle) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <h1>No vehicle selected.</h1>
                </div>
            </div>
        );
    }

    // Use data from selectedVehicle to render vehicle information
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card className="my-3 p-3">
                <Row>
                    <Col md="4">
                        <img src={selectedVehicle.coverImageUrl || 'images\\VehicleImage\\sample_car.jpeg'} alt={`${selectedVehicle.brand} ${selectedVehicle.model}`} className="img-fluid" />
                    </Col>
                    <Col md="8">
                        <Row>
                            <Col md="8">
                                <h3>{selectedVehicle.brand} {selectedVehicle.model}</h3>
                                <p>Transmission Type: {selectedVehicle.gearboxType}</p>
                                <p>Number of Doors: {selectedVehicle.numberOfDoors}</p>
                                <p>Seats: {selectedVehicle.seats}</p>
                            </Col>
                            <Col md="4">
                                <p className="price">Price: {selectedVehicle.price || '100 PLN/day'}</p>
                                <Button color="primary">Select</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <h5>Equipment:</h5>
                                <h5>{selectedVehicle.carEquipment}</h5>
                            </Col>
                            <Col md="8">
                                <h5>Other Information:</h5>
                                {/* Here you can add more vehicle details */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default VehicleMain;
