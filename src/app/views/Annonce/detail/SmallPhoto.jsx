import React, { useState } from 'react';
import { Card, styled } from '@mui/material';
import { convertHexToRGB } from 'app/utils/utils';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CardRoot = styled(Card)(({ theme }) => ({
  marginBottom: '24px',
  padding: '24px !important',
  [theme.breakpoints.down('sm')]: { paddingLeft: '16px !important' }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  padding: '24px !important',
  background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' }
}));

const SmallPhoto = (props) => {
  const { image } = useState(props.imageUrl);
  console.log(image);
  return (
    <CardRoot>
      <StyledCard elevation={0}>
        <img src={image} style={{ height: '130px', width: '100%' }} alt={'alt'} />
      </StyledCard>
    </CardRoot>
  );
};

export default SmallPhoto;
