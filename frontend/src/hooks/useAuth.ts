import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import { AuthUser } from '../utils/types';

export const useAuth = () => {
  const navigate = useNavigate();
  const ctx = useAuthContext();

  const login = (user: AuthUser) => {
    ctx.login(user);
    navigate('/');
  };

  const logout = () => {
    ctx.logout();
    navigate('/login');
  };

  return { ...ctx, login, logout };
};
