import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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

  return {
    users,
    setUsers,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    handleSearch,
    handleSort,
    handleDelete,
  };
};
