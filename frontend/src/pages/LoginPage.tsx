import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';

interface LoginForm {
  email: string;
  role: 'Employee' | 'Policy Manager' | 'Admin';
}

export const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>({ defaultValues: { role: 'Employee' } });
  const { login } = useAuth();

  const onSubmit = (values: LoginForm) =>
    login({ email: values.email, fullName: values.email, role: values.role });

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Policy Portal</h1>
        <label>
          Email
          <input type="email" {...register('email', { required: true })} />
        </label>
        <label>
          Role
          <select {...register('role')}>
            <option>Employee</option>
            <option>Policy Manager</option>
            <option>Admin</option>
          </select>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
