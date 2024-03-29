import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, styled } from '@mui/material';
import Api from 'app/functions/Api';
import { Breadcrumb, SimpleCard } from 'app/components';
import ChaqueAnnonce from './ChaqueAnnonce';

const Container = styled('div')(({ theme }) => ({
  margin: '10px',
  [theme.breakpoints.down('sm')]: { margin: '10px' },
  '& .breadcrumb': {
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: { marginBottom: '10px' }
  }
}));

const NoAnnouncementMessage = styled(Typography)({
  textAlign: 'center',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f7f7f7',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px'
});

const AppHistorique = () => {
  if (sessionStorage.getItem('token') === null) {
    alert(
      "Pour accéder à cette fonctionnalité, veuillez vous connecter à votre compte. Si vous n'avez pas de compte, veuillez en créer un pour bénéficier de toutes les fonctionnalités disponibles."
    );
    window.location.href = '/';
    console.log('Redirection terminée.');
  }

  const [annonces, setAnnonces] = useState([]);
  useEffect(() => {
    const fetchAnnonce = async () => {
      const response = await Api.fetch(
        'https://wscloudfinal-production.up.railway.app/api/v1/annonces/utilisateur',
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );
      setAnnonces(response.data);
    };

    fetchAnnonce();
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Annonce', path: '/listeAnnonceHistorique' },
            { name: 'Historiques' }
          ]}
        />
      </Box>

      <SimpleCard title="Historique annonce">
        {annonces.length === 0 ? (
          <NoAnnouncementMessage variant="body1">
            Aucune annonce dans l'historique pour l'instant.
          </NoAnnouncementMessage>
        ) : (
          annonces.map((annonce, index) => (
            <Grid spacing={2} key={index} sx={{ mt: 2, marginBottom: '0.3rem' }}>
              <Grid item lg={9} md={9} sm={12} xs={12}>
                <ChaqueAnnonce {...annonce} />
              </Grid>
            </Grid>
          ))
        )}
      </SimpleCard>
    </Container>
  );
};

export default AppHistorique;
