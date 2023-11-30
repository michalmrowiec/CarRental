import React from 'react';
import smallCarImage from '../images/small_car.jpeg';
import mediumCarImage from '../images/medium_car.jpeg';
import bigCarImage from '../images/big_car.jpeg';
import premiumCarImage from '../images/premium_car.jpeg';

const Vehicle = ({ imagePath }) => {
  let imageSrc;

  switch (imagePath) {
    case 'small_car':
      imageSrc = smallCarImage;
      break;
    case 'medium_car':
      imageSrc = mediumCarImage;
      break;
    case 'big_car':
      imageSrc = bigCarImage;
      break;
    case 'premium_car':
      imageSrc = premiumCarImage;
      break;
    default:
      imageSrc = null;
  }

  return (
    <div className=" d-flex justify-content-center align-items-center">
      {imageSrc && <img src={imageSrc} alt={imagePath} className="img-fluid rounded w-100 h-100" />}
    </div>
  );
};

export default Vehicle;
