import React, { useState, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';


function EditRental(props) {
    const location = useLocation();
    // const vehicle = location.state;
    const [rental, setRental] = useState(location.state.rental || {});
    console.log(rental);
    const { state } = useContext(UserContext); // Use Context to get the state
    const userToken = state.token; // Get the token from the context

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setRental(prevVehicle => ({
            ...prevVehicle,
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

            <Button type="submit">Save Changes</Button>
        </Form>
    );
}

export default EditRental;
