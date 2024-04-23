import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Label, Input,FormGroup,Button,FormFeedback } from 'reactstrap';

export class Join extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            name: '',
            lastName: '',
            dateOfBirth: '',
            gender: '',
            emailAddress: '',
            password: '',
            repeatPassword: '',
            phoneNumber: '',
            street: '',
            houseNumber: '',
            apartmentNumber: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            emailError: null,
            ageError: false,
            formSubmitted: false,
            registered: false
          };
          this.state = this.initialState;
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleGenderSelect = gender => {
        this.setState({ gender });
    };

    validateAge = () => {
        const dob = new Date(this.state.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const month = today.getMonth() - dob.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        if (age < 18) {
            this.setState({ ageError: true });
            return false;
        }
        return true;
    };

    handleSubmit = async event => {
        event.preventDefault();
        console.log("Form submitted!");

        // Walidacja wieku tylko po naciśnięciu przycisku "Zarejestruj" i jeśli formularz nie został jeszcze złożony
        if (!this.state.formSubmitted && !this.validateAge()) {
            return;
        }

        try {
            const response = await fetch('https://localhost:44403/api/v1/User/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            });

            if (response.ok) {
                this.resetState();
                // Ukryj komunikat "zarejestrowano" po 3 sekundach
                setTimeout(() => {
                    this.setState({ registered: false });
                }, 3000);
            } else {
                const errorData = await response.json();

                if (errorData.includes('Email Address must be email address')) {
                    this.setState({emailError : 1});
                } else if (errorData.includes('Email is taken')) {
                    this.setState({emailError : 2});
                } 
                else {
                    console.error('Nieznany błąd:', errorData);
                }
                // Obsługa błędu odpowiedzi API
                console.error('Błąd podczas wysyłania danych do API');
            }
        } catch (error) {
            // Obsługa błędu połączenia lub innych błędów
            console.error('Wystąpił błąd:', error);
        }
    };
    
    resetState = () => {
        this.setState(this.initialState);
      };

    render() {
        console.log('email status ' + this.state.emailError);
        return (
            <div className='divv d-flex justify-content-center align-items-center bg-light  '>
            
            <Form onSubmit={this.handleSubmit} className='bg-white p-3 rounded w-25'>
            <h2>Register</h2>
            <FormGroup>
                <Label for="emailAddress">
                Email
                </Label>
                <Input
                id="emailAddress"
                name="emailAddress"
                placeholder="Email address"
                type="email"
                onChange={this.handleInputChange}
                value={this.state.emailAddress}
                invalid={this.state.emailError ? true : false}
                
                />
                <FormFeedback >
                {
                    (() => {
                    if (this.state.emailError === 1) {
                        return 'Email Address must be email address';
                    } else if (this.state.emailError === 2) {
                        return 'Email is taken';
                    }
                    })()
                }
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="dateOfBirth">
                Date
                </Label>
                <Input
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="date placeholder"
                type="date"
                onChange={this.handleInputChange}
                value={this.state.dateOfBirth}
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
                onChange={this.handleInputChange}
                value={this.state.password}
                />
            </FormGroup>
            <FormGroup>
                <Label for="repeatPassword">
                Repeat password
                </Label>
                <Input
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Repeat password"
                type="password"
                onChange={this.handleInputChange}
                value={this.state.repeatPassword}
                />
            </FormGroup>
            <Button onClick={this.handleSubmit}>
                Submit
            </Button>
            </Form>               
            </div>
        );
    }
}
