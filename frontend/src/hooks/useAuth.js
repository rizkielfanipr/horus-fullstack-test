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

  // Register Handler
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

      if (response.status === 201) { // Check if registration was successful
        setAlert({ type: 'success', message: 'Registrasi berhasil, silakan login!' });
        navigate('/'); // Redirect to login page after successful registration
      } else {
        setAlert({ type: 'error', message: 'Terjadi kesalahan saat registrasi' });
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Error handling for 400 or other server errors
      if (error.response) {
        setAlert({ type: 'error', message: error.response.data.message || 'Terjadi kesalahan saat registrasi, coba lagi nanti.' });
      } else {
        setAlert({ type: 'error', message: 'Terjadi kesalahan saat registrasi, coba lagi nanti.' });
      }
    }
  };

  // Login Handler
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (response.status === 200 && response.data.token) {
        setAlert({ type: 'success', message: 'Login berhasil!' });
        // Store the token in localStorage or state
        localStorage.setItem('authToken', response.data.token); // Store JWT token
        navigate('/dashboard'); // Redirect to dashboard after successful login
      } else {
        setAlert({ type: 'error', message: 'Username atau Password salah' });
      }
    } catch (error) {
      console.error("Login error:", error);
      // Error handling for 401 Unauthorized or server errors
      if (error.response) {
        setAlert({ type: 'error', message: error.response.data.message || 'Terjadi kesalahan saat login. Coba lagi nanti.' });
      } else {
        setAlert({ type: 'error', message: 'Terjadi kesalahan saat login. Coba lagi nanti.' });
      }
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
