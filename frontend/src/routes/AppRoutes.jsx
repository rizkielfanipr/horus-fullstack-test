import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login'; // Pastikan path ini benar
import Register from '../pages/Register'; // Pastikan path ini benar
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
