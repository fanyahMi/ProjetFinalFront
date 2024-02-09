import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
  Box,
  styled,
  useTheme
} from '@mui/material';

import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';
import { logoutUser } from '../../../../deconnection';
import { Span } from '../../Typography';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [userEmail, setUserEmail] = useState('User');
  useEffect(() => {
    if (sessionStorage.getItem('email') !== null) {
      setUserEmail(sessionStorage.getItem('email'));
    }
  }, [userEmail]);

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  const navigate = useNavigate();
  const handleMessage = () => {
    navigate('/message');
  };
  const handleFavoris = () => {
    navigate('/listeAnnonceFavorie');
  };

  const hasToken = sessionStorage.getItem('token');

  const handleClick = async () => {
    const logoutResult = await logoutUser();
    logout();
    if (logoutResult.success) {
      navigate('/annonces');
    } else {
      console.error('Échec de la déconnexion:', logoutResult.message);
      alert(logoutResult.message);
    }
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>
          <StyledIconButton onClick={handleMessage}>
            <Icon>mail_outline</Icon>
          </StyledIconButton>

          <StyledIconButton onClick={handleFavoris}>
            <Icon>star_outline</Icon>
          </StyledIconButton>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    <strong>{userEmail}</strong>
                  </Span>
                </Hidden>
                <Avatar
                  src={'/assets/images/illustrations/icon-admin.svg'}
                  sx={{ cursor: 'pointer' }}
                />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/annonces">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            {hasToken ? (
              <StyledItem onClick={handleClick}>
                <Icon> exit_to_app</Icon>
                <Span> Logout </Span>
              </StyledItem>
            ) : (
              <StyledItem>
                <Link to="/session/signin">
                  <Icon> power_settings_new </Icon>
                  <Span> Login </Span>
                </Link>
              </StyledItem>
            )}
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
