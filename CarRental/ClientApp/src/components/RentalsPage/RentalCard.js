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
        <Card style={{ position: 'relative' }}>
            <CardBody style={{ flex: '1' }}>
                <h3>Reservation</h3>
                <CardSubtitle tag="h6" className="text-muted">Reservation ID:</CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{rental.id}</CardSubtitle>
                <CardSubtitle tag="h6" className="text-muted">Total Amount: </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{rental.totalGrossAmount}</CardSubtitle>

                <CardSubtitle className='text-muted'>Start Date: {new Date(rental.startDate).toLocaleDateString()}</CardSubtitle>
                <CardSubtitle className='mb-2 text-muted'>End Date: {new Date(rental.endDate).toLocaleDateString()}</CardSubtitle>
                <span>Status: </span><span style={{ color: statusColor }}>{status}</span>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                    <Button onClick={handleConfirm} disabled={rental.isConfirmedByEmployee} className="me-2" color="primary">Confirm</Button>
                    <Button onClick={handleCancel} color="danger">Cancel</Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default RentalCard;