import React, { useContext } from 'react';
import { Card, CardBody, CardSubtitle, Button } from 'reactstrap';
import UserContext from '../../context/UserContext';

const RentalCard = ({ rental }) => {
    const { state: userState } = useContext(UserContext);

    const handleConfirm = async () => {
        const response = await fetch(
            `https://localhost:44403/api/v1/Rental/confirm/${rental.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userState.token}`
                },
            }
        );

        if (response.status === 200) {
            console.log("Rental confirmed successfully");
        } else {
            console.error(`HTTP error! status: ${response.status}`);
        }
    };

    const handleCancel = async () => {
        const response = await fetch(
            `https://localhost:44403/api/v1/Rental/cancel/${rental.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userState.token}`
                },
            }
        );

        if (response.status === 200) {
            console.log("Rental cancelled successfully");
        } else {
            console.error(`HTTP error! status: ${response.status}`);
        }
    };

    let status;
    let statusColor;
    if (rental.isConfirmedByEmployee) {
        status = 'Confirmed';
        statusColor = 'green';
    } else if (rental.isCanceled) {
        status = 'Canceled';
        statusColor = 'red';
    } else {
        status = 'Pending'; // Status domyślny, jeśli nie jest ani potwierdzony, ani anulowany
        statusColor = 'black';
    }

    return (
        <Card style={{ display: 'flex', minHeight: '150px', height: 'auto', marginBottom: '1%' }}>
            <CardBody style={{}}>
                <h5>Reservation: {rental.id}</h5>
                <CardSubtitle tag="h6" className="mt-1 text-muted">Client: {rental.client.name} {rental.client.lastName} | tel.: {rental.client.phoneNumber}</CardSubtitle>
                <CardSubtitle tag="h6" className="mt-1 text-muted">Vehicle: {rental.vehicle.brand} {rental.vehicle.model} (VIN: {rental.vehicle.vinNumber})</CardSubtitle>
                <CardSubtitle tag="h6" className="mt-1 text-muted">Total Amount: {rental.totalGrossAmount} {rental.vehicle.currency}</CardSubtitle>

                <CardSubtitle className='mt-2 text-muted'>Start Date: {new Date(rental.startDate).toLocaleDateString()}</CardSubtitle>
                <CardSubtitle className='mb-2 text-muted'>End Date: {new Date(rental.endDate).toLocaleDateString()}</CardSubtitle>
                <div>
                    <span>Status: </span><span style={{ color: statusColor }}>{status}</span>
                </div>
                <div>
                    <span>Is paid: </span>{rental.isPaid === true ? <span>Yes</span> : <span>No</span>}
                </div>
                <div>
                    <span>Is picked up: </span>{rental.isVehiclePickedUp === true ? <span>Yes</span> : <span>No</span>}
                </div>
                <div>
                    <span>Is returned: </span>{rental.isVehicleReturned === true ? <span>Yes</span> : <span>No</span>}
                </div>
                <div style={{ marginTop: '6px', bottom: '10px', left: '10px' }}>
                    <Button onClick={handleConfirm} disabled={rental.isConfirmedByEmployee} className="me-2" color="primary">Confirm</Button>
                    <Button onClick={handleCancel} color="danger">Cancel</Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default RentalCard;