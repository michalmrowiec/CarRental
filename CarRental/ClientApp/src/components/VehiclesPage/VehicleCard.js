import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class VehicleCard extends Component {
    render() {
        const { vehicle } = this.props;
        return (
            <Card>
                <div style={{ display: 'flex' }}>
                    <CardImg style={{ width: '30%', objectFit: 'cover' }} src={vehicle.image} alt="Card image cap" />
                    <CardBody style={{ width: '20%' }}>
                        <CardTitle tag="h5">{vehicle.name}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{vehicle.price}/dzień</CardSubtitle>
                        <Button>Wynajmij</Button>
                    </CardBody>
                    <CardBody style={{ width: '50%' }}>
                        <CardText>{vehicle.description}</CardText>
                    </CardBody>
                </div>
            </Card>
        );
    }
}