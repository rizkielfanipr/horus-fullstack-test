import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login'; // Pastikan path ini benar
import Register from '../pages/Register'; // Pastikan path ini benar

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
