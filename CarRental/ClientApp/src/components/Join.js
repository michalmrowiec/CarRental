import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Label, Input,FormGroup,Button,FormFeedback,Alert } from 'reactstrap';

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
            passwordError: false,
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

    handleSubmit = async event => {
        event.preventDefault();
        console.log("Form submitted!");

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
                this.setState({ registered: true });
                // Ukryj komunikat "zarejestrowano" po 3 sekundach
                setTimeout(() => {
                    this.setState({ registered: false });
                }, 3000);
            } else {
                const errorData = await response.json();

                this.resetErrors();

                if (errorData.includes('Email Address must be email address')) {
                    this.setState({emailError : 1});
                }

                if (errorData.includes('Email is taken')) {
                    this.setState({emailError : 2});
                }

                if (errorData.includes('You must be at least 18 years old.')) {
                    this.setState({ageError : true});
                }

                if (errorData.includes('Passwords are not the same')) {
                    this.setState({passwordError : true});
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
    
    resetErrors = () => {
        this.setState({emailError: null,
                       ageError: false,
                       passwordError: false,});
    };

    render() {
        console.log('registrated? ' + this.state.registered);
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
                invalid={this.state.ageError}
                />
                <FormFeedback>
                You must be at least 18 years old.
                </FormFeedback>
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
                invalid={this.state.passwordError}
                />
                <FormFeedback>
                Passwords are not the same
                </FormFeedback>
                
            </FormGroup>
            {this.state.registered && 
                <Alert color="success">
                    Successfully rgistrated!
                </Alert>
            }
            <Button onClick={this.handleSubmit}>
                Submit
            </Button>
            </Form>               
            </div>
        );
    }
}
