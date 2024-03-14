import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import carLogo from '../images/car_rental.svg';

export class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isLoggedIn: localStorage.getItem('loggedInUser') !== null // Sprawdź, czy użytkownik jest zalogowany na podstawie localStorage
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

  handleLogout = () => {
    // Usuń informacje o zalogowanym użytkowniku z localStorage
    localStorage.removeItem('loggedInUser');
    // Zaktualizuj stan isLoggedIn na false
    this.setState({ isLoggedIn: false });
  };

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
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/AboutUs">AboutUs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/vehicles">Vehicles</NavLink>
              </NavItem>
              {isLoggedIn ? (
                <>
                  <NavItem>
                    <span className="text-dark">{localStorage.getItem('loggedInUser')}</span>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/" onClick={this.handleLogout}>Log-Out</NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/Join">Join</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/SignIn">Sign-In</NavLink>
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
