import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSignIn} from 'react-auth-kit';
import { Form,Label, Input,FormGroup,Button,Alert } from 'reactstrap';


export function SignIn() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false); // Dodanie stanu do przechowywania błędu
    const navigate = useNavigate();

    const handleInputChange = event => {
        const { name, value } = event.target;
        if (name === 'emailAddress') {
            setEmailAddress(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const signIn = useSignIn();


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
            // console.log(response);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                signIn({
                    token: data.JwtToken,
                    expiresIn: 3600, //czas wygaśnięcia tokenu
                    tokenType: "Bearer",
                    authState: {}, //dodatkowy stan auth
                });
                
                sessionStorage.setItem('userRole', data.role);
                sessionStorage.setItem('userToken', data.token);
                console.log('pomyslnie zalogowano');
                navigate('/'); // Przekierowanie do strony głównej
                window.location.reload();
                // console.log(data);
            } else {
                console.log("Nieudane logowanie. Sprawdź dane logowania i spróbuj ponownie.");
            }
        } catch (error) {
            console.error("Błąd podczas próby zalogowania:", error);
            setError(true);
        }
    };    
    
    return (
                
        <div className='divv d-flex justify-content-center align-items-center bg-light'>
            <Form className='bg-white p-3 rounded w-25'>
                <h2>Sign In</h2>
                <FormGroup>
                    <Label for="emailAddress">
                    Email
                    </Label>
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
                    <Label for="password">
                    Password
                    </Label>
                    <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleInputChange}
                    value={password}
                    />
                </FormGroup>
                {error && 
                    <Alert color="danger">
                        Incorrect email or passowrd
                    </Alert>
                }
                <Button onClick={handleSubmit}>
                    Sign In
                </Button>
            </Form>
        </div>
    );
}
