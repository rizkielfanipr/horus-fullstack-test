import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) =>
      sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setUsers(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:5000/api/delete/${userId}`)
      .then(() => setUsers(users.filter(user => user.id !== userId)))
      .catch(error => console.error("Error deleting user:", error));
  };

  // Open modal for editing
  const openModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  // Handle input change in modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // Handle user update
  const handleUpdate = () => {
    if (!currentUser) return;

    axios
      .put(`http://localhost:5000/api/update/${currentUser.id}`, currentUser)
      .then(() => {
        setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
        closeModal();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  // Logout and redirect
  const handleLogout = () => {
    navigate('/');
  };

  return {
    users,
    setUsers,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    showModal,
    currentUser,
    handleSearch,
    handleSort,
    handleDelete,
    openModal,
    closeModal,
    handleInputChange,
    handleUpdate,
    handleLogout,
  };
};
