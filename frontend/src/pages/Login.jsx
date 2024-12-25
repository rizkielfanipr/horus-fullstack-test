import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField'; 
import Button from '../components/Button';
import FormContainer from '../components/FormContainer';
import Alert from '../components/Alert'; 

const Login = () => {
  const {
    username, setUsername,
    password, setPassword,
    alert,
    handleLogin,
  } = useAuth();

  const navigate = useNavigate();

  return (
    <FormContainer title="Login">
      {alert && <Alert type={alert.type} message={alert.message} />}

      <InputField
        label="Username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        name="username"
      />
      <InputField
        label="Password" 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
      />
      <Button text="Login" onClick={handleLogin} />
      <div className="mt-4 text-center">
        <p>
          Belum punya akun?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Registrasi
          </span>
        </p>
      </div>

    </FormContainer>
  );
};

export default Login;
