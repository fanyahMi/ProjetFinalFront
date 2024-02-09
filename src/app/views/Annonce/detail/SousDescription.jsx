// SousDescription.jsx
import React from 'react';
import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import ChatHead from 'app/views/message/Chat/ChatHead';
import Chatbox from 'app/views/message/Chat/Chatbox';
import * as Util from 'app/functions/Util';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main }
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main
}));

const SousDescription = ({ auteur_id, auteur, prixVente, lieu, dateAnnonce }) => {
  const cardList = [
    { name: 'Auteur', value: auteur, icon: 'person' },
    { name: 'Prix vente', value: Util.formatNumber(prixVente), icon: 'attach_money' },
    { name: 'Lieu', value: lieu, icon: 'location_on' },
    { name: 'Date', value: Util.formatDate(dateAnnonce), icon: 'event' }
  ];
  console.log(auteur_id + '  sous description');
  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={12} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.value}</Heading>
              </Box>
            </ContentBox>

            {item.name === 'Auteur' && (
              <ChatHead
                icon={
                  <Tooltip title="Contacter le propriétaire" placement="top">
                    <IconButton>
                      <Icon>arrow_right_alt</Icon>
                    </IconButton>
                  </Tooltip>
                }
              >
                <Chatbox auteur_id={auteur_id} />
              </ChatHead>
            )}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default SousDescription;
