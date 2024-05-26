import React, { useState, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ReservationContext } from '../../context/ReservationContext'; // Upewnij się, że ścieżka do pliku jest poprawna
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingWidget = () => {
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');

  const { setSelectedDate } = useContext(ReservationContext);
  const navigate = useNavigate();

  const handleReservation = () => {
    // Ustawienie wybranej daty w kontekście
    setSelectedDate({ from: pickupDate, to: returnDate });
    // Następnie nawigacja do VehiclesList
    navigate('/vehiclesList');
  };

  return (
    <Container className="booking-widget ">
      <h2>Start Reservation</h2>
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
        </Row>
        <Button color="primary" onClick={handleReservation}>Go</Button>
      </Form>
    </Container>
  );
};

export default BookingWidget;
