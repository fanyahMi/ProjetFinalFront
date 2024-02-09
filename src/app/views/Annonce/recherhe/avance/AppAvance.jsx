import React, { useState, useEffect } from 'react';
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
import Api from 'app/functions/Api';
const AppAvance = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    keyWord: null,
    lieu: null,
    min_prix: null,
    max_prix: null,
    min_km: null,
    max_km: null,
    marque: null,
    categorie: null,
    min_annee: null,
    max_annee: null,
    carburant: null
  });

  const handleInputChange = (fieldName, value) => {
    setSearchCriteria((prevSearchCriteria) => ({
      ...prevSearchCriteria,
      [fieldName]: value
    }));
  };

  const [categories, setCategories] = useState([]);
  const [lieux, setLieux] = useState([]);
  const [marques, setMarques] = useState([]);
  const [carburants, setCarburants] = useState([]);
  useEffect(() => {
    const fetchCategorie = async () => {
      const response = await Api.fetch(
        'https://wscloudfinal-production.up.railway.app/api/v1/categories',
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );
      setCategories(response.data);
    };
    const fetchlieux = async () => {
      const response = await Api.fetch(
        'https://wscloudfinal-production.up.railway.app/api/lieux',
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );
      setLieux(response.data);
    };
    const fetchMarques = async () => {
      const response = await Api.fetch(
        'https://wscloudfinal-production.up.railway.app/api/v1/marques',
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );
      setMarques(response.data);
    };
    const fetchCarburant = async () => {
      const response = await Api.fetch(
        'https://wscloudfinal-production.up.railway.app/api/v1/models/v1/carburants',
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );
      setCarburants(response.data);
    };
    fetchCarburant();
    fetchMarques();
    fetchlieux();
    fetchCategorie();
  }, []);

  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = Object.entries(searchCriteria)
      .filter(([key, value]) => value !== null && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
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
              value={searchCriteria.keyWord}
              onChange={(e) => handleInputChange('keyWord', e.target.value)}
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
                {lieux?.map((option) => (
                  <MenuItem key={option.lieu} value={option.lieu}>
                    {option.lieu}
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
                {marques?.map((option) => (
                  <MenuItem key={option.marque} value={option.marque}>
                    {option.marque}
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
                {categories?.map((option) => (
                  <MenuItem key={option.categorie} value={option.categorie}>
                    {option.categorie}
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
                {carburants?.map((option) => (
                  <MenuItem key={option.carburant} value={option.carburant}>
                    {option.carburant}
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
              value={searchCriteria.min_prix}
              onChange={(e) => handleInputChange('min_prix', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Prix maximum"
              fullWidth
              type="number"
              value={searchCriteria.max_prix}
              onChange={(e) => handleInputChange('max_prix', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Kilométrage minimum"
              fullWidth
              type="number"
              value={searchCriteria.min_km}
              onChange={(e) => handleInputChange('min_km', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Kilométrage maximum"
              fullWidth
              type="number"
              value={searchCriteria.max_km}
              onChange={(e) => handleInputChange('max_km', e.target.value)}
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
