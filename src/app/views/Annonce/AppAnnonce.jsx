import { Grid, styled } from '@mui/material';
import { Fragment } from 'react';
import React, { useState, useEffect } from 'react';
import ChaqueAnnonce from './boite/ChaqueAnnonce';
import ApiSans from 'app/functions/ApiSans';
const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

const AppAnnonce = () => {
  const [annonces, setAnnonces] = useState([]);
  useEffect(() => {
    const fetchAnnonce = async () => {
      const response = await ApiSans.fetch('http://localhost:8080/api/v1/annonces/valide', 'GET', {
        'Content-Type': 'application/json'
      });
      setAnnonces(response.data);
    };
    fetchAnnonce();
  }, []);

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          {annonces.map((annonce, index) => (
            <Grid key={index} item lg={4} md={4} sm={12} xs={12}>
              <ChaqueAnnonce data={annonce} />
            </Grid>
          ))}
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default AppAnnonce;
