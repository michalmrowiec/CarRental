import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardImg, CardText, Row, Col } from 'reactstrap';

const AddVehicleImage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state: userState } = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const vehicleId = location.state?.vehicleId; // Pobieramy vehicleId z lokacji
    const [vehiclesImagesUrls, setVehiclesImagesUrls] = useState([]);


    if (!vehicleId) {
        // Jeśli nie ma vehicleId, przekieruj z powrotem do listy pojazdów
        navigate('/SimpleVehiclesList');
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null); // Resetowanie błędów
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`https://localhost:44403/api/v1/Vehicle/upload-image/${vehicleId}/true`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userState.token}`
                },
                body: formData
            });

            setUploading(false);

            if (response.ok) {
                alert('Image uploaded successfully!');
                navigate('/MenageVehiclesList'); // Przekierowanie z powrotem do listy pojazdów
            } else {
                setError('Failed to upload image. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Error uploading image. Please try again.');
            setUploading(false);
        }
    };

    useEffect(() => {
        const fetchAllVehiclesImages = async () => {
            try {
                const response = await fetch('https://localhost:44403/api/v1/Vehicle/images', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userState.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setVehiclesImagesUrls(data);
            } catch (error) {
                console.error('Błąd podczas pobierania listy pojazdów:', error);
            }
        };

        fetchAllVehiclesImages();

    }, []);

    const selectImage = async (imageUrl) => {
        //preventDefault();

        setUploading(true);

        try {
            const response = await fetch(`https://localhost:44403/api/v1/Vehicle`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userState.token}`
                },

                body: JSON.stringify({
                    id: vehicleId,
                    coverImageUrl: imageUrl
                })
            });

            setUploading(false);

            if (response.ok) {
                alert('Image updated successfully!');
                navigate('/MenageVehiclesList'); // Przekierowanie z powrotem do listy pojazdów
            } else {
                setError('Failed to update image. Please try again.');
            }
        } catch (error) {
            console.error('Error updating image:', error);
            setError('Error updating image. Please try again.');
            setUploading(false);
        }
    };

    return (
        <div className="add-vehicle-image">
            <Row>
                {vehiclesImagesUrls.map((imageUrl) => (
                    <Col lg="3" md="4" sm="6" className="mb-4">
                        <Card
                            style={{

                            }}
                        >
                            <CardImg style={{ objectFit: 'cover', height: '10rem' }} src={imageUrl} alt="vehicle" />

                            <CardBody
                                style={{
                                }}>
                                <CardText>
                                    {imageUrl.split('\\').pop()}
                                </CardText>
                                <Button color="primary" disabled={uploading} onClick={() => selectImage(imageUrl)}>
                                    Select
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h2>Add Vehicle Image</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="vehicleImageFile">Vehicle Image</Label>
                    <Input type="file" name="file" id="vehicleImageFile" onChange={handleFileChange} />
                </FormGroup>
                <Button type="submit" color="primary" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </Button>
            </Form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddVehicleImage;
