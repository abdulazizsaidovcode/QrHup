import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import DefaultLayout from './layout/DefaultLayout';
import User from './pages/User';
import Partners from './pages/Partners/Partners';
import PartnerDetials from './pages/Partners/partnerDetials';
import Merchant from './pages/Merchant/Merchant';
import MerchantDetials from './pages/Merchant/MerchantDetails';
import Qrs from './pages/Qrs/Qrs';
import QrDetial from './pages/Qrs/QrDetial';
import Mcc from './pages/MCC/mcc';
import Action from './pages/Action/Action';
import Currency from './pages/Currency/Currency';
import ActionModerator from './pages/MaderatorPage/ActionModerator';
import Clarify from './pages/MaderatorPage/clarify';
import AdminTransactions from './pages/Admin-Transactions/admin-transactions';
import Generated from './pages/Generated';

interface RouteConfig {
  path: string;
  element: JSX.Element;
  title: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const routes: RouteConfig[] = [
    { path: '/', element: <ECommerce />, title: 'Admin | Statistics' },
    { path: '/User', element: <User />, title: 'Admin | User' },
    { path: '/Qrs', element: <Qrs />, title: 'Admin | Qrs' },
    { path: '/admin/transactions', element: <AdminTransactions />, title: 'Admin | Transactions' },
    { path: '/mcc', element: <Mcc />, title: 'Admin | Mcc' },
    { path: '/action', element: <Action />, title: 'Admin | Action' },
    { path: '/currency', element: <Currency />, title: 'Admin | Currency' },
    { path: '/merchant', element: <Merchant />, title: 'Settings | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/chart', element: <Chart />, title: 'Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/partners', element: <Partners />, title: 'Admin | Partners' },
    { path: '/partnersDetials/:id', element: <PartnerDetials />, title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/merchantDetials/:id', element: <MerchantDetials />, title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/qrDetial/:id', element: <QrDetial />, title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/auth/signin', element: <SignIn />, title: 'Signin ' },
    { path: '/generated/:ApiKey', element: <Generated />, title: 'Generated' },

    // Moderator
    {
      path: '/moderator/Action',
      element: <ActionModerator />,
      title: 'Action | Moderator',
    },
    {
      path: '/moderator/clarify',
      element: <Clarify />,
      title: 'QRs To Clarify | Moderator',
    },
  ];

  // Check authentication and navigate accordingly
  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('token');
      const role = sessionStorage.getItem('role');
      const isApiKeyRoute = /^\/generated\/[^/]+$/.test(pathname);

      if (!role && !isApiKeyRoute && !token) {
        navigate('/auth/signin');
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        {routes.map(({ path, element, title }) => (
          <Route
            key={path}
            path={path}
            element={
              <>
                <PageTitle title={title} />
                {element}
              </>
            }
          />
        ))}
      </Routes>
    </DefaultLayout>
  );
}

export default App;
