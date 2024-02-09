import { Box, styled, Grid } from '@mui/material';
import { Breadcrumb } from 'app/components';
import Destinataire from './Destinataire';

const Container = styled('div')(({ theme }) => ({
  margin: '10px',
  [theme.breakpoints.down('sm')]: { margin: '10px' },
  '& .breadcrumb': {
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: { marginBottom: '10px' }
  }
}));

const AppListDiscussion = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Message', path: '/message' }, { name: 'Liste discussions' }]}
        />
      </Box>
      <Grid item lg={9} md={9} sm={12} xs={12}>
        <Destinataire />
      </Grid>
    </Container>
  );
};

export default AppListDiscussion;
