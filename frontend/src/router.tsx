import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { PoliciesListPage } from './pages/PoliciesListPage';
import { PolicyDetailPage } from './pages/PolicyDetailPage';
import { PolicyRequestListPage } from './pages/PolicyRequestListPage';
import { ReviewPage } from './pages/ReviewPage';
import { ActivityLogPage } from './pages/ActivityLogPage';
import { ProtectedLayout } from './components/ProtectedLayout';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <PoliciesListPage /> },
      { path: 'policies/:policyId', element: <PolicyDetailPage /> },
      { path: 'requests', element: <PolicyRequestListPage /> },
      { path: 'review', element: <ReviewPage /> },
      { path: 'activity', element: <ActivityLogPage /> }
    ]
  }
]);
