import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import InputField from '../components/InputField.jsX';
import Button from '../components/Button';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !email || !name) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        password,
        email,
        name,
      });

      // Memeriksa apakah response berisi message yang benar
      if (response.data.message === 'User created successfully') {
        alert('Registrasi berhasil, silakan login!');
        navigate('/'); // Arahkan ke halaman login setelah registrasi
      } else {
        alert('Terjadi kesalahan saat registrasi');
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert('Terjadi kesalahan saat registrasi, coba lagi nanti.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Registrasi</h2>
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
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <InputField
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
      />
      <Button text="Registrasi" onClick={handleRegister} />
    </div>
  );
};

export default Register;
