import React from 'react';
import { Card, styled, Grid, useMediaQuery, useTheme } from '@mui/material';
import { convertHexToRGB } from 'app/utils/utils';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SmallPhoto from './SmallPhoto';

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

const GrandImage = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const getSliderHeight = () => {
    if (isExtraSmall) {
      return '200px'; // Hauteur pour les petits écrans (mobiles)
    } else if (isMobile) {
      return '300px'; // Hauteur pour les écrans de taille moyenne (tablettes)
    } else {
      return '555px'; // Hauteur par défaut pour les grands écrans (bureaux)
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000
  };

  return (
    <>
      {props.imageData && props.imageData.length > 1 ? (
        <CardRoot>
          <Slider {...settings}>
            {props.imageData.map((image, index) => (
              <div key={index}>
                <StyledCard elevation={0}>
                  <img
                    src={image?.data}
                    style={{ height: getSliderHeight(), width: '100%' }}
                    alt={`upgrade-${index}`}
                  />
                </StyledCard>
              </div>
            ))}
          </Slider>
          <br />
          <br />
        </CardRoot>
      ) : (
        props.imageData &&
        props.imageData[0] && (
          <StyledCard elevation={0}>
            <img
              src={props.imageData[0]?.data}
              style={{ height: getSliderHeight(), width: '100%' }}
              alt={`upgrade`}
            />
          </StyledCard>
        )
      )}

      {isMobile ? null : (
        <Grid
          container
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {props.imageData?.map((image, index) => (
            <Grid
              key={index}
              container
              item
              lg={4}
              md={4}
              sm={4}
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <SmallPhoto imageUrl={image?.data} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default GrandImage;
