import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


export class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            ageError: false,
            formSubmitted: false,
            registered: false // Dodajemy flagę registered
        };
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
                // Obsługa pozytywnej odpowiedzi API
                console.log('Dane zostały pomyślnie wysłane do API');
                // Resetowanie stanu formularza i wyświetlenie komunikatu
                this.setState({
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
                    ageError: false,
                    formSubmitted: true,
                    registered: true
                });

                // Ukryj komunikat "zarejestrowano" po 3 sekundach
                setTimeout(() => {
                    this.setState({ registered: false });
                }, 3000);
            } else {
                // Obsługa błędu odpowiedzi API
                console.error('Błąd podczas wysyłania danych do API');
            }
        } catch (error) {
            // Obsługa błędu połączenia lub innych błędów
            console.error('Wystąpił błąd:', error);
        }
    };
    

    render() {
        return (
            <div className='d-flex justify-content-center align-items-center bg-light vh-100'>
                <form onSubmit={this.handleSubmit} className='bg-white p-3 rounded w-25'>
                    <div className="container text-center">
                    <h2>Registration</h2>
                    {this.state.registered && <div className="input-group-text flex-nowrap" style={{ color: 'green' }}>Zarejestrowano!</div>}
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Name</span>
                            <input type="text" 
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                name="name"
                                className="form-control" />
                        </div>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Last name</span>
                            <input type="text" 
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                name="lastName"
                                className="form-control" />
                        </div>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Birth date</span>
                            <input type="date" 
                                value={this.state.dateOfBirth}
                                onChange={this.handleInputChange}
                                name="dateOfBirth"
                                className="form-control" />
                        </div>
                        {this.state.ageError && <div className="input-group flex-nowrap" style={{ color: 'red' }}>Musisz mieć co najmniej 18 lat, aby się zarejestrować.</div>}
                        <div className="input-group dropend">
                            <button className="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {this.state.gender ? this.state.gender : 'Gender'}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><button type="button" className="dropdown-item" onClick={() => this.handleGenderSelect('Male')}>Male</button></li>
                                <li><button type="button" className="dropdown-item" onClick={() => this.handleGenderSelect('Female')}>Female</button></li>
                                <li><button type="button" className="dropdown-item" onClick={() => this.handleGenderSelect('Skoryk')}>Skoryk</button></li>
                            </ul>
                        </div>
                        <div className="input-group flex-nowrap ">
                            <span className="input-group-text" id="addon-wrapping">@</span>
                            <input type="email"
                                    name="emailAddress"
                                    value={this.state.emailAddress}
                                    onChange={this.handleInputChange} 
                                    className="form-control"/>
                        </div>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Password</span>
                            <input type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange} 
                                    className="form-control"/>
                        </div>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Repeat password</span>
                            <input type="password"
                                    name="repeatPassword"
                                    value={this.state.repeatPassword}
                                    onChange={this.handleInputChange} 
                                    className="form-control"/>
                        </div>
                        <div className="input-group flex-nowrap ">
                            <span className="input-group-text" id="addon-wrapping">Phone number</span>
                            <input type="tel"
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.handleInputChange} 
                                    className="form-control"/>
                        </div>
                        <div className="input-group flex-nowrap ">
                            <span className="input-group-text" id="addon-wrapping">Street</span>
                            <input type="text" 
                                value={this.state.street}
                                onChange={this.handleInputChange}
                                name="street"
                                className="form-control" />
                        </div>
                        <div className="input-group flex-nowrap ">
                            <span className="input-group-text" id="addon-wrapping">House number</span>
                            <input type="text" 
                                value={this.state.houseNumber}
                                onChange={this.handleInputChange}
                                name="houseNumber"
                                className="form-control" />
                        </div>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Apartment number</span>
                            <input type="text" 
                                value={this.state.apartmentNumber}
                                onChange={this.handleInputChange}
                                name="apartmentNumber"
                                className="form-control" />
                        </div>
                        
                        <div className="input-group flex-nowrap ">
                            <span className="input-group-text" id="addon-wrapping">City</span>
                            <input type="text" 
                                value={this.state.city}
                                onChange={this.handleInputChange}
                                name="city"
                                className="form-control" />
                        </div>
                        <div className="input-group flex-nowrap ">
                            <span className="input-group-text" id="addon-wrapping">State</span>
                            <input type="text" 
                                value={this.state.state}
                                onChange={this.handleInputChange}
                                name="state"
                                className="form-control" />
                        </div>
                        <div className="input-group flex-nowrap ">
                            <span className="input-group-text" id="addon-wrapping">Country</span>
                            <input type="text" 
                                value={this.state.country}
                                onChange={this.handleInputChange}
                                name="country"
                                className="form-control" />
                        </div>
                        <div className="input-group flex-nowrap ">
                            <span className="input-group-text" id="addon-wrapping">Postal code</span>
                            <input type="text" 
                                value={this.state.postalCode}
                                onChange={this.handleInputChange}
                                name="postalCode"
                                className="form-control" />
                        </div>
                    </div>    
                    <div>
                        <button type="submit" onClick={this.handleSubmit}>Zarejestruj</button>
                    </div>
                </form>
            </div>
        );
    }
}
