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
import { useLocation } from "react-router-dom";
import RentalCard from "./RentalCard";

const RentalSummary = () => {
  const location = useLocation();
  const rentalDataResponse = location.state?.data;

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
    <div className="d-flex justify-content-center align-items-center">
      <p>{rentalDataResponse?.totalGrossAmount || "total gross amount none"}</p>
          <p>{rentalDataResponse?.isPaid || "paid none"}</p>

    </div>
  );
};

export default RentalSummary;
