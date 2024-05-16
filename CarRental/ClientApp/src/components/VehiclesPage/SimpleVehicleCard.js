const MenagementVehicleCard = ({ vehicle, onEdit, onAddPhoto }) => {
    return (
      <div className="vehicle-card">
        <div className="vehicle-info">
          <h5>{vehicle.name}</h5>
          <p>{vehicle.description}</p>
          <p>Cena: {vehicle.price}</p>
        </div>
        <div className="vehicle-actions">
          <Button color="primary" onClick={() => onEdit(vehicle)}>Edit</Button>
          <Button color="secondary" onClick={() => onAddPhoto(vehicle)}>Add Photo</Button>
        </div>
      </div>
    );
  };