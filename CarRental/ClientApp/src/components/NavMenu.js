import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import carLogo from '../images/car_rental.svg';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { loggedInUser } = this.props;

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
              {loggedInUser ? (
                <NavItem>
                  <span className="text-dark">{loggedInUser.name}</span>
                </NavItem>
              ) : (
                <>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/Join">Join</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/SignIn">SignIn</NavLink>
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
