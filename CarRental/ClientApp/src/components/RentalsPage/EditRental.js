import React, { useState, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';


function EditRental(props) {
    const location = useLocation();
    const [rental, setRental] = useState(location.state.rental || {});
    const { state } = useContext(UserContext);
    const userToken = state.token;

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setRental(prevRental => ({
            ...prevRental,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:44403/api/v1/Rental', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(rental)
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/MenageRentalList');
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
                <Label for="isVehiclePickedUp">IsVehiclePickedUp</Label>
                <Input type="checkbox" name="isVehiclePickedUp" id="isVehiclePickedUp" onChange={handleChange} value={rental.isVehiclePickedUp} checked={rental.isVehiclePickedUp} />
            </FormGroup>
            <FormGroup>
                <Label for="isVehicleReturned">IsVehicleReturned</Label>
                <Input type="checkbox" name="isVehicleReturned" id="isVehicleReturned" onChange={handleChange} value={rental.isVehicleReturned} checked={rental.isVehicleReturned} />
            </FormGroup>
            <FormGroup>
                <Label for="isPaid">IsPaid</Label>
                <Input type="checkbox" name="isPaid" id="isPaid" onChange={handleChange} value={rental.isPaid} checked={rental.isPaid} />
            </FormGroup>
            <FormGroup>
                <Label for="paymentMethod">PaymentMethod</Label>
                <Input type="text" name="paymentMethod" id="paymentMethod" onChange={handleChange} value={rental.paymentMethod} />
            </FormGroup>
            <FormGroup>
                <Label for="comments">Comments</Label>
                <Input type="text" name="comments" id="comments" onChange={handleChange} value={rental.comments} />
            </FormGroup>
            <FormGroup>
                <Label for="isCanceled">IsCanceled</Label>
                <Input type="checkbox" name="isCanceled" id="isCanceled" onChange={handleChange} value={rental.isCanceled} checked={rental.isCanceled} />
            </FormGroup>
            <Button type="submit">Save Changes</Button>
        </Form>
    );
}

export default EditRental;
