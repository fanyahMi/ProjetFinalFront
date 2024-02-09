import { useState, useEffect } from 'react';
import { Box, styled, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import ChaqueAnnonce from './ChaqueAnnonce';
import { useLocation } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '10px',
  [theme.breakpoints.down('sm')]: { margin: '10px' },
  '& .breadcrumb': {
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: { marginBottom: '10px' }
  }
}));

const AppResultat = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const value = JSON.stringify({
    keyWord: searchParams.get('keyWord'),
    lieu: searchParams.get('lieu'),
    min_prix: searchParams.get('min_prix'),
    max_prix: searchParams.get('max_prix'),
    min_km: searchParams.get('min_km'),
    max_km: searchParams.get('max_km'),
    marque: searchParams.get('marque'),
    categorie: searchParams.get('categorie'),
    min_annee: searchParams.get('min_annee'),
    max_annee: searchParams.get('max_annee'),
    carburant: searchParams.get('carburant')
  });
  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const response = await fetch(`http://localhost:8080/api/v1/annonces/filtre`, {
          method: 'POST',
          headers: headers,
          body: value
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setAnnonces(jsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAnnonce();
  }, [value]);
  console.log(value);
  const [annonces, setAnnonces] = useState([]);
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Annonce', path: '/' }, { name: 'Resultat recherche' }]}
        />
      </Box>

      <SimpleCard title="Liste de resultat du recherche ">
        {annonces?.map((annonce, index) => (
          <Grid spacing={2} key={index} sx={{ mt: 2, marginBottom: '0.3rem' }}>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <ChaqueAnnonce {...annonce} />
            </Grid>
          </Grid>
        ))}
      </SimpleCard>
    </Container>
  );
};

export default AppResultat;
