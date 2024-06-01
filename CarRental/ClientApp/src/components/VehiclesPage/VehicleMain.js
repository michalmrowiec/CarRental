import React, { useContext, useState } from 'react';
import { Row, Col, Button, Card, CardSubtitle, Form, FormGroup, Label, Input } from 'reactstrap';
import UserContext from '../../context/UserContext';
import { VehicleContext } from '../../context/VehicleContext';
import { useNavigate } from 'react-router-dom';

const VehicleMain = () => {
    const { selectedVehicle } = useContext(VehicleContext); // Use selectedVehicle from context
    const { state } = useContext(UserContext);
    const isLoggedIn = state.token !== null;
    const navigate = useNavigate();
    const { state: userState } = useContext(UserContext);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [error, setError] = useState(null);
    const [paymentMethod, setpaymentMethod] = useState('Credit Card');
    const [paymentMethodToFilter, setPaymentMethodToFilter] = useState(['Credit Card', 'Debit Card', 'Blik', 'InpostPay']);


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

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const startDate = new Date(`${pickupDate}T${pickupTime}`).toISOString();
            const endDate = new Date(`${returnDate}T${returnTime}`).toISOString();

            const response = await fetch('https://localhost:44403/api/v1/Rental', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userState.token}`
                },
                body: JSON.stringify({
                    "vehicleId": selectedVehicle.id,
                    "startDate": startDate,
                    "endDate": endDate,
                    "discountRate": 0,
                    "paymentMethod": paymentMethod
                })
            });

            if (response.ok) {
                alert('Car rent successfully!');
                //navigate('/MenageVehiclesList'); // Przekierowanie z powrotem do listy pojazdów
            } else {
                setError('Failed to rent a car. Please try again.');
            }
        } catch (error) {
            console.error("Błąd podczas próby zalogowania:", error);
        }
    };

    // Use data from selectedVehicle to render vehicle information
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%', marginTop: '2%' }}>
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
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{selectedVehicle.rentalNetPricePerDay}{selectedVehicle.currency}/day</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Estimated total: {selectedVehicle.rentalNetPricePerDay}{selectedVehicle.currency}</CardSubtitle>
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
            <Card className="my-3 p-3">
                <Row>
                    <Form className='p-1'>
                        <Row >
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="pickupDate">Pick Up Date</Label>
                                    <Input
                                        type="date"
                                        name="pickupDate"
                                        id="pickupDate"
                                        value={pickupDate}
                                        onChange={e => setPickupDate(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="pickupTime">Pick Up Time</Label>
                                    <Input
                                        type="time"
                                        name="pickupTime"
                                        id="pickupTime"
                                        value={pickupTime}
                                        onChange={e => setPickupTime(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row >
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="returnDate">Return Date</Label>
                                    <Input
                                        type="date"
                                        name="returnDate"
                                        id="returnDate"
                                        value={returnDate}
                                        onChange={e => setReturnDate(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="returnTime">Return Time</Label>
                                    <Input
                                        type="time"
                                        name="returnTime"
                                        id="returnTime"
                                        value={returnTime}
                                        onChange={e => setReturnTime(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <FormGroup>
                                <Label for="brandSelect">Brand:</Label>
                                <Input type="select" id="brandSelect" value={paymentMethod} onChange={(e) => setpaymentMethod(e.target.value)}>
                                    {paymentMethodToFilter.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Row>
                        <Button color="primary" onClick={handleSubmit}>Go</Button>
                    </Form>
                </Row>
            </Card>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default VehicleMain;

