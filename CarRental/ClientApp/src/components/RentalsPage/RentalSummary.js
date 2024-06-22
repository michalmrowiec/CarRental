import React, { useContext, useState } from "react";
import {
    Row,
    Col,
    Button,
    Card,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import UserContext from "../../context/UserContext";
import { VehicleContext } from "../../context/VehicleContext"; // Import VehicleContext
import { useLocation, useNavigate } from "react-router-dom";

import RentalCard from "./RentalCard";

const RentalSummary = () => {
    const location = useLocation();
    const rentalDataResponse = location.state?.data;
    const navigate = useNavigate();

    const { state } = useContext(UserContext);
    const isLoggedIn = state.token !== null;
    const { selectedVehicle } = useContext(VehicleContext);

    if (!isLoggedIn) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1>Please log in to see vehicle details.</h1>
                </div>
            </div>
        );
    }

    if (!selectedVehicle) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <h1>No vehicle selected.</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <h4>Reservation Details:</h4>
            <p>Vehicle: {selectedVehicle.brand} {selectedVehicle.model}</p>
            <p>Start Date: {rentalDataResponse?.startDate}</p>
            <p>End Date: {rentalDataResponse?.endDate}</p>
            <p>Total Amount: ${rentalDataResponse?.totalGrossAmount.toFixed(2)}</p>
            <p>Status: {rentalDataResponse?.isPaid ? "Paid" : "Pending"}</p>
            <Button color="primary" onClick={() => navigate("/RentalList")}>
                See all reservations
            </Button>
        </div>
    );
};

export default RentalSummary;
