import { useAuth } from '../hooks/useAuth';
import InputField from '../components/InputField'; 
import Button from '../components/Button';
import FormContainer from '../components/FormContainer';
import Alert from '../components/Alert';  // Komponen Alert untuk menampilkan pesan

const Register = () => {
  const {
    username, setUsername,
    password, setPassword,
    email, setEmail,
    name, setName,
    alert,  
    handleRegister,
  } = useAuth();

  return (
    <FormContainer title="Registrasi">
      {alert && <Alert type={alert.type} message={alert.message} />} {/* Menampilkan alert */}

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
      <InputField
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <InputField
        label="Nama Lengkap"
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
      />
      <Button text="Registrasi" onClick={handleRegister} />
    </FormContainer>
  );
};

export default Register;
