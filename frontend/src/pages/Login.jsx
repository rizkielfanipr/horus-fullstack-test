import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import InputField from '../components/InputField'; 
import Button from '../components/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (response.data.token) {
        navigate('/dashboard'); // Mengarahkan ke halaman dashboard
      } else {
        alert('Username atau Password salah');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert('Terjadi kesalahan saat login. Coba lagi nanti.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Mengarahkan ke halaman registrasi
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <InputField
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        name="username"
      />
      <InputField
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
            onClick={handleRegisterRedirect}
          >
            Registrasi
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
