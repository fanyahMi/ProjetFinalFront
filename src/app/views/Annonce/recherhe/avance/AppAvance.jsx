import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AppAvance = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    motCle: null,
    lieu: null,
    minPrix: null,
    maxPrix: null,
    minKm: null,
    maxKm: null,
    marque: null,
    categorie: null,
    minAnnee: null,
    maxAnnee: null,
    carburant: null
  });

  const handleInputChange = (fieldName, value) => {
    setSearchCriteria((prevSearchCriteria) => ({
      ...prevSearchCriteria,
      [fieldName]: value
    }));
  };

  const categoriesOptions = [
    { label: 'Sélectionnez une catégorie', value: '' },
    { label: 'Berline', value: 'Berline' },
    { label: 'SUV', value: 'SUV' },
    { label: 'Hatchback', value: 'Hatchback' },
    { label: 'Camionnette', value: 'Camionnette' }
  ];

  const lieuxOptions = [
    { label: 'Sélectionnez un lieu', value: '' },
    { label: 'Antananarivo', value: 'Antananarivo' },
    { label: 'Antsirabe', value: 'Antsirabe' },
    { label: 'Toamasina', value: 'Toamasina' },
    { label: 'Fianarantsoa', value: 'Fianarantsoa' }
  ];

  const marquesOptions = [
    { label: 'Sélectionnez une marque', value: '' },
    { label: 'Toyota', value: 'Toyota' },
    { label: 'Honda', value: 'Honda' },
    { label: 'Ford', value: 'Ford' },
    { label: 'Mazda', value: 'Mazda' },
    { label: 'Nissan', value: 'Nissan' },
    { label: 'Audi', value: 'Audi' },
    { label: 'Porsche', value: 'Porsche' },
    { label: 'Range Rover', value: 'Range Rover' },
    { label: 'BMW', value: 'BMW' },
    { label: 'Subaru', value: 'Subaru' }
  ];

  const carburantsOptions = [
    { label: 'Sélectionnez un type de carburant', value: '' },
    { label: 'Essence', value: 'Essence' },
    { label: 'Diesel', value: 'Diesel' },
    { label: 'Hybride', value: 'Hybride' },
    { label: 'Electrique', value: 'Electrique' }
  ];
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = Object.entries(searchCriteria)
      .filter(([key, value]) => value !== null && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    console.log(queryParams + '    huhuh');
    // Naviguer vers la page de recherche avec les paramètres de requête
    navigate(`/recherche?${queryParams}`);
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Recherche Avancée
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Mot-clé"
              fullWidth
              value={searchCriteria.motCle}
              onChange={(e) => handleInputChange('motCle', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="lieu-label">Lieu</InputLabel>
              <Select
                labelId="lieu-label"
                id="lieu"
                value={searchCriteria.lieu || ''}
                onChange={(e) => handleInputChange('lieu', e.target.value)}
              >
                {lieuxOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="marque-label">Marque</InputLabel>
              <Select
                labelId="marque-label"
                id="marque"
                value={searchCriteria.marque || ''}
                onChange={(e) => handleInputChange('marque', e.target.value)}
              >
                {marquesOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="categorie-label">Catégorie</InputLabel>
              <Select
                labelId="categorie-label"
                id="categorie"
                value={searchCriteria.categorie || ''}
                onChange={(e) => handleInputChange('categorie', e.target.value)}
              >
                {categoriesOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="carburant-label">Carburant</InputLabel>
              <Select
                labelId="carburant-label"
                id="carburant"
                value={searchCriteria.carburant || ''}
                onChange={(e) => handleInputChange('carburant', e.target.value)}
              >
                {carburantsOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Prix minimum"
              fullWidth
              type="number"
              value={searchCriteria.minPrix}
              onChange={(e) => handleInputChange('minPrix', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Prix maximum"
              fullWidth
              type="number"
              value={searchCriteria.maxPrix}
              onChange={(e) => handleInputChange('maxPrix', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Kilométrage minimum"
              fullWidth
              type="number"
              value={searchCriteria.minKm}
              onChange={(e) => handleInputChange('minKm', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Kilométrage maximum"
              fullWidth
              type="number"
              value={searchCriteria.maxKm}
              onChange={(e) => handleInputChange('maxKm', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Rechercher
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component={Link} to="/">
              Retour à l'accueil
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AppAvance;
