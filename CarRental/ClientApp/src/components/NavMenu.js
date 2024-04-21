import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Link } from 'react-router-dom';
import '../style/NavMenu.css';
import carLogo from '../images/car_rental.svg';
import userLogo from '../images/user.svg';

// import { AuthContext } from './AuthContext';


export class NavMenu extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this); // Dodaj tę linię
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            dropdownOpen: false,
            isLoggedIn: sessionStorage.getItem('userRole') !== null,
            collapsed: true,
            role: sessionStorage.getItem('userRole')
        };
    }


    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const isLoggedIn = sessionStorage.getItem('userRole') !== null;
        console.log(prevState.isLoggedIn);
        if (prevState.isLoggedIn !== isLoggedIn) {
            this.setState({ isLoggedIn });
            // window.location.reload();
        }
    }



    toggleDropdown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleLogout() {
        // Usuń informacje o zalogowanym użytkowniku z localStorage
        sessionStorage.removeItem('userRole');
        // window.location.reload();

    }

    render() {

        // const role = sessionStorage.getItem('userRole'); // Pobierz rolę z localStorage
        // console.log(role);

        // console.log(this.state.role);
        // console.log(this.state.isLoggedIn);
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand tag={Link} to="/">
                        <img src={carLogo} alt='CarLogo' className='mr-2'></img>
                        CarRental
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark text-decoration" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark text-decoration" to="/AboutUs">AboutUs</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark text-decoration" to="/vehicles">Vehicles</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark text-decoration" to="/vehiclesList">Vehicles List</NavLink>
                            </NavItem>

                            {this.state.role === 'customer' && this.state.isLoggedIn ? (
                                <>
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                                        <DropdownToggle caret className="btn btn-light d-flex align-items-center">
                                            <div className="">
                                                <img src={userLogo} alt='userLogo' className='mr-2 img-fluid user-logo'></img>
                                                <span className="text-dark">{localStorage.getItem('loggedInUser')}</span>
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem tag={Link} className="text-dark text-decoration" to="/User">My profile</DropdownItem>
                                            <DropdownItem onClick={this.handleLogout} className="text-dark text-decoration">Log-Out</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark text-decoration" to="/Join">Join</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark text-decoration" to="/SignIn">Sign-In</NavLink>
                                    </NavItem>
                                </>
                            )}
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
