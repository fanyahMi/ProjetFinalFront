// DetailVoiture.jsx
import React from 'react';
import { Icon, Table, TableBody, TableCell, TableRow, styled } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const AccordionRoot = styled('div')(({ theme }) => ({
  width: '100%',
  '& .heading': {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

// Constants for the component
const dataConstants = {
  voiture: {
    title: 'Voiture',
    icon: 'drive_eta',
    properties: [
      { label: 'Marque', key: 'marque' },
      { label: 'Matricule', key: 'matricule' },
      { label: 'Kilometrage', key: 'kilometrage' },
      { label: 'Categorie', key: 'categorie' },
      { label: 'Serie', key: 'annee' },
      { label: 'Carburant', key: 'carburant' }
    ]
  },
  propriete: {
    title: 'Proprietes',
    icon: 'info_outline',
    properties: [
      { label: 'Titre', key: 'titre' },
      { label: 'Description', key: 'description' }
    ]
  },
  description: {
    title: 'Description',
    icon: 'info_outline',
    properties: [{ label: 'Description', key: 'description' }]
  }
};

const DetailVoiture = ({ detailvoiture, proprietes, description }) => {
  const renderTableRows = (type) => {
    const properties = dataConstants[type].properties;

    return properties.map((property, index) => (
      <TableRow key={index}>
        <TableCell align="left" className="text-bold secondary">
          {property.label}
        </TableCell>
        <TableCell align="right">
          {type === 'voiture' && detailvoiture && detailvoiture[property.key]
            ? detailvoiture[property.key]
            : type === 'propriete' &&
              proprietes &&
              proprietes[index] &&
              proprietes[index][property.key]
            ? proprietes[index][property.key]
            : null}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <AccordionRoot>
      {Object.keys(dataConstants).map((type, index) => (
        <Accordion key={index}>
          <AccordionSummary
            id={`panel${index + 1}-header`}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
          >
            <Typography className="heading">
              <sub style={{ paddingRight: '5px' }}>
                <Icon>{dataConstants[type].icon}</Icon>
              </sub>{' '}
              {dataConstants[type].title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {type === 'description' ? (
              <Typography>{description}</Typography>
            ) : (
              <StyledTable>
                <TableBody>{renderTableRows(type)}</TableBody>
              </StyledTable>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </AccordionRoot>
  );
};

export default DetailVoiture;
