import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const AddVehicleImage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: userState } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const vehicleId = location.state?.vehicleId; // Pobieramy vehicleId z lokacji

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
        navigate('/SimpleVehiclesList'); // Przekierowanie z powrotem do listy pojazdów
      } else {
        setError('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="add-vehicle-image">
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
