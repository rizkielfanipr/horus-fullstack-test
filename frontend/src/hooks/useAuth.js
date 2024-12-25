import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [alert, setAlert] = useState(null); // State untuk alert
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !email || !name) {
      setAlert({ type: 'error', message: 'Semua kolom harus diisi!' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        password,
        email,
        name,
      });

      if (response.data.message === 'User created successfully') {
        setAlert({ type: 'success', message: 'Registrasi berhasil, silakan login!' });
        navigate('/'); // Redirect ke halaman login
      } else {
        setAlert({ type: 'error', message: 'Terjadi kesalahan saat registrasi' });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAlert({ type: 'error', message: 'Terjadi kesalahan saat registrasi, coba lagi nanti.' });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (response.data.token) {
        setAlert({ type: 'success', message: 'Login berhasil!' });
        navigate('/dashboard'); // Mengarahkan ke halaman dashboard
      } else {
        setAlert({ type: 'error', message: 'Username atau Password salah' });
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlert({ type: 'error', message: 'Terjadi kesalahan saat login. Coba lagi nanti.' });
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    name,
    setName,
    alert, 
    handleRegister,
    handleLogin,
  };
};
