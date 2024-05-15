import React, { useState, useEffect, useContext, useRef } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext'; // Zaimportuj UserContext
import '../../style/NavMenu.css';
import carLogo from '../../images/car_rental.svg';
import userLogo from '../../images/user.svg';

const NavMenu = () => {
    const { state, dispatch } = useContext(UserContext); // Użyj Contextu
    const [collapsed, setCollapsed] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Zaktualizuj stan na podstawie danych z Contextu
    const isLoggedIn = state.token !== null;
    const role = state.role;
    const token = state.token;

    const toggleNavbar = () => setCollapsed(!collapsed);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    // Zaktualizuj funkcję handleLogout, aby czyściła stan kontekstu
    const handleLogout = () => {
        sessionStorage.clear(); // Wyczyść wszystkie dane sesji
        dispatch({ type: 'LOGOUT' }); // Wywołaj akcję wylogowania w Context API
        navigate('/'); // Przekierowanie do strony głównej
        window.location.reload();
    };

    useEffect(() => {
        console.log(`Czy użytkownik jest zalogowany: ${isLoggedIn}`);
        console.log(`Rola użytkownika: ${role}`);
        console.log(`token użytkownika: ${token}`);
    }, [isLoggedIn, role]);

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

                        {isLoggedIn ? (
                            <>
                                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} innerRef={dropdownRef}>
                                    <DropdownToggle caret className="btn btn-light d-flex align-items-center">
                                        <div className="">
                                            <img src={userLogo} alt='userLogo' className='mr-2 img-fluid user-logo'></img>
                                            <span className="text-dark">{localStorage.getItem('loggedInUser')}</span>
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                    {role === 'customer' && (
                                        <DropdownItem tag={Link} className="text-dark text-decoration" to="/User">My profile</DropdownItem>
                                    )}
                                    {role === 'employee' && (
                                        <DropdownItem tag={Link} className="text-dark text-decoration" to="/AddVehicle">Add Vehicle</DropdownItem>
                                    )}
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
