import { Card, Grid, styled } from '@mui/material';
import { Fragment } from 'react';
import Photo from './Photo';
import Description from './Description';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ApiSans from 'app/functions/ApiSans';
const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

const AppDetailAnnonce = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const annonce_id = searchParams.get('annonce_id');
  const navigate = useNavigate();
  console.log(annonce_id);
  if (annonce_id === null) {
    navigate('/annonces');
  }
  const [annonce, setAnnonce] = useState([]);
  useEffect(() => {
    const fetchAnnonce = async () => {
      const response = await ApiSans.fetch(
        `http://localhost:8080/api/v1/annonces/${annonce_id}`,
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );
      setAnnonce(response.data);
    };
    fetchAnnonce();
  }, [annonce_id]);
  //console.log(annonce);
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Photo images={annonce.photos} />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Description annonce={annonce} />
            </Card>
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default AppDetailAnnonce;
