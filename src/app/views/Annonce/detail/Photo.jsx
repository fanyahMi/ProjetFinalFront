import React from 'react';
import GrandImage from './GrandImage';

const Photo = ({ images }) => {
  console.log(images + '  ty ');
  return <GrandImage imageData={images} />;
};

export default Photo;
