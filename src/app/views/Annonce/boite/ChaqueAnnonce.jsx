import React, { useState } from 'react';
import { Button, Card, styled, Grid, Icon, Tooltip } from '@mui/material';
import { convertHexToRGB } from 'app/utils/utils';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChatHead from 'app/views/message/Chat/ChatHead';
import Chatbox from 'app/views/message/Chat/Chatbox';
import { useNavigate } from 'react-router-dom';
import Api from 'app/functions/Api';

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

const Paragraph = styled('p')(({ theme }) => ({
  margin: 0,
  paddingTop: '24px',
  paddingBottom: '24px',
  color: theme.palette.text.secondary,
  '& strong': {
    fontSize: '20px',
    paddingRight: '6%'
  }
}));

const ChaqueAnnonce = ({ data }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const images = data.photos.map((photo) => photo.data);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000
  };

  const handleFavButtonClick = async () => {
    const annonceId = data.annonce_id;
    await Api.fetch(
      `https://wscloudfinal-production.up.railway.app/api/v1/annonces/favoris/${annonceId}`,
      'PUT',
      {
        'Content-Type': 'application/json'
      }
    );
    setIsFavorited(!isFavorited);
  };

  return (
    <CardRoot>
      {images.length > 1 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <StyledCard elevation={0}>
                <img
                  src={image}
                  style={{ height: '255px', width: '100%' }}
                  alt={`upgrade-${index}`}
                />
              </StyledCard>
            </div>
          ))}
        </Slider>
      ) : (
        // Si la longueur du tableau d'images est égale à 1, affichez simplement l'image sans le carrousel
        <StyledCard elevation={0}>
          <img src={images[0]} style={{ height: '255px', width: '100%' }} alt={`upgrade-0`} />
        </StyledCard>
      )}
      <br />
      <Paragraph>
        <strong>{data.detailvoiture.model}</strong> <tab /> <tab />
        <tab />
        {data.detailvoiture.categorie} <br />
        <i>{data.lieu}</i>
      </Paragraph>

      {/* Action buttons */}
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
        <Button
          size="large"
          color="primary"
          variant="contained"
          sx={{
            textTransform: 'uppercase',
            marginRight: '5px'
          }}
          onClick={() => {
            const annonce_id = `?annonce_id=${data.annonce_id}`;
            navigate(`/detail${annonce_id}`);
          }}
        >
          Voir plus
        </Button>
        <Tooltip title={isFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
          <Icon
            className="icon"
            sx={{
              textTransform: 'uppercase',
              fontSize: { xs: '32px', lg: '42px' },
              margin: '5px',
              cursor: 'pointer',
              color: isFavorited ? 'primary' : 'default'
            }}
            onClick={handleFavButtonClick}
          >
            favorite_border
          </Icon>
        </Tooltip>
        <ChatHead
          icon={
            <Button
              size="large"
              color="secondary"
              variant="contained"
              sx={{
                textTransform: 'uppercase',
                marginLeft: '5px'
              }}
            >
              Contacter
            </Button>
          }
        >
          <Chatbox auteur_id={data.auteur_id} />
        </ChatHead>
      </Grid>
    </CardRoot>
  );
};

export default ChaqueAnnonce;
