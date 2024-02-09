import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Avatar,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Api from 'app/functions/Api';
import ChatHead from '../Chat/ChatHead';
import Chatbox from '../Chat/Chatbox';

const ColoredCard = styled(Card)(({ theme }) => ({
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  marginBottom: theme.spacing(2),
  transition: 'box-shadow 0.3s ease-in-out',
  height: '64px',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)'
  }
}));

const CustomCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  padding: theme.spacing(1)
}));

const CustomAvatar = styled(Avatar)({
  marginTop: '12%'
});

const CustomIconButton = styled(IconButton)(({ isMobile }) => ({
  marginTop: isMobile ? '2%' : '1%'
}));

const CustomTypography = styled(Typography)({
  marginTop: '5%'
});

const NoDiscussionMessage = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f7f7f7',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
});

const Destinataire = () => {
  if (sessionStorage.getItem('token') === null) {
    alert(
      "Pour accéder à cette fonctionnalité, veuillez vous connecter à votre compte. Si vous n'avez pas de compte, veuillez en créer un pour bénéficier de toutes les fonctionnalités disponibles."
    );
    window.location.href = '/';
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [discussionsData, setDiscussionsData] = useState([]);

  useEffect(() => {
    const fetchAnnonce = async () => {
      const response = await Api.fetch(
        'https://wscloudfinal-production.up.railway.app/api/v1/discussions',
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );
      setDiscussionsData(response.data);
    };

    fetchAnnonce();
  }, []);

  return (
    <Grid container spacing={2}>
      {discussionsData.length === 0 ? (
        <Grid item xs={12}>
          <NoDiscussionMessage>
            <Typography variant="body1">Aucune discussion pour l'instant.</Typography>
          </NoDiscussionMessage>
        </Grid>
      ) : (
        discussionsData.map((discussionData) => (
          <Grid item key={discussionData.id} xs={12}>
            <ColoredCard elevation={3}>
              <CustomCardContent>
                <Box display="flex" alignItems="center">
                  <CustomAvatar>
                    <PersonIcon />
                  </CustomAvatar>
                  <Box marginLeft={1}>
                    <CustomTypography variant="subtitle2">
                      {discussionData.nomparticipants[0]}
                    </CustomTypography>
                  </Box>
                </Box>
                <CustomIconButton isMobile={isMobile}>
                  <ChatHead icon={<EmailIcon color="primary" />}>
                    <Chatbox auteur_id={discussionData.participants[0]} />
                  </ChatHead>
                </CustomIconButton>
              </CustomCardContent>
            </ColoredCard>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Destinataire;
