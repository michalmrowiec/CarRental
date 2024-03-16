import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Link } from 'react-router-dom';
import './NavMenu.css';
import carLogo from '../images/car_rental.svg';
import userLogo from '../images/user.svg';

export class NavMenu extends Component {
  constructor(props) {
    super(props);
  
    this.toggleNavbar = this.toggleNavbar.bind(this); // Dodaj tę linię
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      dropdownOpen: false,
      isLoggedIn: localStorage.getItem('loggedInUser') !== null,
      collapsed: true,
    };
  }
  

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const isLoggedIn = localStorage.getItem('loggedInUser') !== null;
    if (prevState.isLoggedIn !== isLoggedIn) {
      this.setState({ isLoggedIn });
    }
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  
  handleLogout() {
    // Usuń informacje o zalogowanym użytkowniku z localStorage
    localStorage.removeItem('loggedInUser');
    // Zaktualizuj stan isLoggedIn na false
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn } = this.state;

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
              {isLoggedIn ? (
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
