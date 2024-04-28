import React, { useState, useEffect, useRef } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../style/NavMenu.css';
import carLogo from '../images/car_rental.svg';
import userLogo from '../images/user.svg';

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('userRole') !== null);
    const [role, setRole] = useState(sessionStorage.getItem('userRole'));
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const toggleNavbar = () => setCollapsed(!collapsed);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleLogout = () => {
        sessionStorage.removeItem('userRole');
        navigate('/'); // Przekierowanie do strony głównej
        window.location.reload();
    };

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('userRole') !== null;
        setIsLoggedIn(isLoggedIn);
        setRole(sessionStorage.getItem('userRole'));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">
                    <img src={carLogo} alt='CarLogo' className='mr-2'></img>
                    CarRental
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
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

                        {role === 'customer' && isLoggedIn ? (
                            <>
                                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} innerRef={dropdownRef}>
                                    <DropdownToggle caret className="btn btn-light d-flex align-items-center">
                                        <div className="">
                                            <img src={userLogo} alt='userLogo' className='mr-2 img-fluid user-logo'></img>
                                            <span className="text-dark">{localStorage.getItem('loggedInUser')}</span>
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem tag={Link} className="text-dark text-decoration" to="/User">My profile</DropdownItem>
                                        <DropdownItem onClick={handleLogout} className="text-dark text-decoration">Log-Out</DropdownItem>
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
};

export default NavMenu;
