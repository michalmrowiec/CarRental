import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Label, Input, FormGroup, Button, Alert } from 'reactstrap';
import  UserContext  from '../context/UserContext'; // Zaimportuj swój UserContext

export function SignIn() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(UserContext); // Użyj Contextu

    const handleInputChange = event => {
        const { name, value } = event.target;
        if (name === 'emailAddress') {
            setEmailAddress(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await fetch('https://localhost:44403/api/v1/User/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailAddress: emailAddress,
                    password: password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Odpowiedź z serwera:', data);
                // Użyj dispatch do aktualizacji stanu w Context API
                sessionStorage.setItem('userToken', data.token);
                sessionStorage.setItem('userRole', data.role);
                sessionStorage.setItem('userEmail', emailAddress);

                
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        token: data.token,
                        role: data.role,
                        email: data.email
                    }
                });
                
                navigate('/'); // Przekierowanie do strony głównej
                // window.location.reload();
            } else {
                setError(true);
                console.log("Nieudane logowanie. Sprawdź dane logowania i spróbuj ponownie.");
            }
        } catch (error) {
            console.error("Błąd podczas próby zalogowania:", error);
            setError(true);
        }
    };

    return (
        <div className='divv d-flex justify-content-center align-items-center bg-light'>
            <Form className='bg-white p-3 rounded w-25' onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <FormGroup>
                    <Label for="emailAddress">Email</Label>
                    <Input
                        id="emailAddress"
                        name="emailAddress"
                        placeholder="Email address"
                        type="email"
                        onChange={handleInputChange}
                        value={emailAddress}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={handleInputChange}
                        value={password}
                    />
                </FormGroup>
                {error && <Alert color="danger">Incorrect email or password</Alert>}
                <Button type="submit">Sign In</Button>
            </Form>
        </div>
    );
}
