import {
  Box,
  Card,
  Grid,
  Hidden,
  Icon,
  IconButton,
  Tooltip,
  useTheme,
  styled,
  Avatar
} from '@mui/material';
import { Span } from 'app/components/Typography';
import { format } from 'date-fns';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)'
}));
const ProjectName = styled(Span)(({ theme }) => ({
  marginLeft: 10,
  fontWeight: '500',
  [theme.breakpoints.down('sm')]: { marginLeft: 4 }
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: '32px !important',
  height: '32px !important'
}));

const ChaqueAnnonce = ({
  id,
  annonce_id,
  auteur,
  lieu,
  statut,
  prix_vente,
  date_annonce,
  detailvoiture,
  description,
  proprietes,
  photos
}) => {
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  console.log('id ' + annonce_id);
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const navigate = useNavigate();

  return (
    <Fragment>
      <Card sx={{ py: 1, px: 2, marginTop: '16px' }} className="project-card">
        <Grid container alignItems="center">
          <Grid item md={3} xs={7}>
            <Box display="flex" alignItems="center">
              <Hidden smDown>
                <StyledAvatar src={photos[0]?.data} />
              </Hidden>
              <ProjectName>
                {detailvoiture.marque} <Hidden smDown>{detailvoiture.categorie}</Hidden>
              </ProjectName>
              <ProjectName>{`${prix_vente} Ar`}</ProjectName>
            </Box>
          </Grid>

          <Hidden smDown>
            <Grid item xs={3}>
              <ProjectName>{`${auteur}`}</ProjectName>
              <ProjectName>{`${lieu}`}</ProjectName>
            </Grid>
          </Hidden>
          <Grid item md={2} xs={4}>
            <Hidden smDown>
              <ProjectName color={textMuted}>
                {format(new Date(date_annonce), 'dd/MM/yyyy')}
              </ProjectName>
            </Hidden>

            <ProjectName style={{ marginLeft: '10%' }}>
              {statut === 2 ? (
                <Small bgcolor={bgPrimary}>En vente</Small>
              ) : statut === 3 ? (
                <Small bgcolor={bgError}>Vendu</Small>
              ) : (
                ''
              )}
            </ProjectName>
          </Grid>

          <Grid item xs={1}>
            <Box display="flex" justifyContent="flex-end">
              <Tooltip title="Voir détail" placement="top">
                <IconButton
                  onClick={() => {
                    const idannonce = `?annonce_id=${annonce_id}`;
                    navigate(`/detail${idannonce}`);
                  }}
                >
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Fragment>
  );
};

export default ChaqueAnnonce;
