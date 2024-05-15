import React, { Component } from 'react';
import UserContext from '../../context/UserContext'; // Zaimportuj UserContext

class AddVehicleImage extends Component {
  static contextType = UserContext;
  
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      error: null,
      uploading: false
    };
  }
  

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    this.setState({ file });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { file } = this.state;
    const userToken = this.context.state.token;
    console.log('token w add image ' + userToken);
    if (!file) {
      this.setState({ error: 'Please select a file.' });
      return;
    }
    const vehicleId = sessionStorage.getItem('vehicleId');
    console.log(vehicleId);
    if (!vehicleId) {
      this.setState({ error: 'No vehicle selected.' });
      return;
    }
    this.setState({ uploading: true });
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`https://localhost:44403/api/v1/Vehicle/upload-image/${vehicleId}/true`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
        body: formData
      });
      if (response.ok) {
        this.setState({ error: null, uploading: false });
        alert('Image uploaded successfully!');
      } else {
        throw new Error('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      this.setState({ error: 'Error uploading image.', uploading: false });
    }
  };  

  render() {
    const { error, uploading } = this.state;
    return (
      <div className="add-vehicle-image">
        <h2>Add Vehicle Image</h2>
        <form onSubmit={this.handleSubmit} onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
          <input type="file" onChange={this.handleFileChange} />
          <button type="submit" disabled={uploading}>Upload Image</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    );
  }
}

export default AddVehicleImage;
