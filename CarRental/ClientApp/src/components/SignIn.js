import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSignIn} from 'react-auth-kit';


export function SignIn() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Dodanie stanu do przechowywania błędu
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
                console.log('pomyslnie zalogowano');
                // console.log(data.JwtToken);
                navigate('/'); // Przekierowanie do strony głównej
                window.location.reload();
            } else if (response.status === 400) {
                setError("Niepoprawne dane logowania. Sprawdź email i hasło."); // Ustawienie błędu dla niepoprawnych danych logowania
            } else {
                console.log("Nieudane logowanie. Sprawdź dane logowania i spróbuj ponownie.");
            }
        } catch (error) {
            console.error("Błąd podczas próby zalogowania:", error);
        }
    };    

    return (
        <div className='d-flex justify-content-center align-items-center bg-light vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">@</span>
                    <input type="email"
                            name="emailAddress"
                            value={emailAddress}
                            onChange={handleInputChange} 
                            className="form-control"/>
                </div>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Password</span>
                    <input type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange} 
                            className="form-control"/>
                </div>
                {error && <div className="alert alert-danger mt-2" role="alert">{error}</div>} {/* Wyświetlanie notyfikacji o błędzie */}
                <div>
                    <button onClick={handleSubmit}>Zaloguj</button>
                </div>
            </div>
        </div>
    );
}
