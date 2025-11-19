import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedLayout = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>Policies</h2>
        <nav>
          <NavLink to="/">Policies</NavLink>
          <NavLink to="/requests">My Requests</NavLink>
          {user.role === 'Policy Manager' && <NavLink to="/review">Review</NavLink>}
          <NavLink to="/activity">Activity Log</NavLink>
        </nav>
        <button onClick={logout}>Logout</button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};
