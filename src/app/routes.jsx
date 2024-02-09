import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
// Annonce
const AppAnnonce = Loadable(lazy(() => import('app/views/Annonce/AppAnnonce')));
//detail annonce
const AppDetailAnnonce = Loadable(lazy(() => import('app/views/Annonce/detail/AppDetailAnnonce')));
// liste annonce en favorie
const AppListeFavorie = Loadable(
  lazy(() => import('app/views/Annonce/listfavorie/AppListeFavorie'))
);
/*** Historique de ses annonce  ****/
const AppHistorique = Loadable(lazy(() => import('app/views/Annonce/historique/AppHistorique')));
/**** Liste discussion  *****/
const AppListDiscussion = Loadable(
  lazy(() => import('app/views/message/listDiscussion/AppListDiscussion'))
);

/**** Recherche  */
const AppResultat = Loadable(lazy(() => import('app/views/Annonce/recherhe/resultat/AppResultat')));
/**** Recherche avance  ****/
const AppAvance = Loadable(lazy(() => import('app/views/Annonce/recherhe/avance/AppAvance')));
const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      },
      {
        path: '/annonces',
        element: <AppAnnonce />,
        auth: authRoles.editor
      },
      {
        path: '/detail',
        element: <AppDetailAnnonce />,
        auth: authRoles.editor
      },
      {
        path: '/listeAnnonceFavorie',
        element: <AppListeFavorie />,
        auth: authRoles.editor
      },
      {
        path: '/listeAnnonceHistorique',
        element: <AppHistorique />,
        auth: authRoles.editor
      },
      {
        path: '/message',
        element: <AppListDiscussion />,
        auth: authRoles.editor
      },
      {
        path: '/recherche',
        element: <AppResultat />,
        auth: authRoles.editor
      },
      {
        path: '/avance',
        element: <AppAvance />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="/annonces" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
