import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaSortAlphaDown, FaSortAlphaUp, FaSignOutAlt } from 'react-icons/fa'; // Importing additional icons
import InputField from '../components/InputField'; 

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort
  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle delete
  const handleDelete = (userId) => {
    axios.delete(`http://localhost:5000/api/delete/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error("There was an error deleting the user!", error);
      });
  };

  // Open modal to edit user
  const openModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  // Handle update
  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/update/${currentUser.id}`, currentUser)
      .then(() => {
        setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
        closeModal();
      })
      .catch(error => {
        console.error("There was an error updating the user!", error);
      });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // Handle logout
  const handleLogout = () => {
    navigate('/'); 
    // Add your logout logic here
  };

  return (
    <div className="container mx-auto p-12">
      {/* Title and Search bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Users Dashboard</h2>
        <div className="flex space-x-4">
          <button onClick={handleSort} className="btn bg-[#03346E] text-white flex items-center space-x-2 hover:bg-[#001A40]">
            {/* Display different icons based on sort order */}
            {sortOrder === 'asc' ? (
              <FaSortAlphaUp size={16} />
            ) : (
              <FaSortAlphaDown size={16} />
            )}
          </button>
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={handleSearch}
            className="input input-bordered"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-full mx-auto">
        <table className="table-auto w-full min-w-max border border-gray-300 border-collapse rounded-lg">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2 text-center">No</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Username</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Password</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-100 border-b border-gray-300">
                <td className="px-8 py-2 text-center">{index + 1}</td>
                <td className="px-6 py-6 text-center">{user.name}</td>
                <td className="px-4 py-2 text-center">{user.username}</td>
                <td className="px-4 py-2 text-center">{user.email}</td>
                <td className="px-4 py-2 text-center">{user.password ? `${user.password.slice(0, 5)}*****` : 'No password'}</td>
                <td className="px-4 py-2 space-x-2 text-center">
                  <button 
                    onClick={() => openModal(user)} 
                    className="btn text-sm text-green-600 hover:text-green-800"
                  >
                    <FaEdit size={16} className="text-green-600" />
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="btn btn-danger text-sm text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={16} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Logout button */}
      <div className="flex justify-end mt-4">
        <button 
          onClick={handleLogout} 
          className="btn bg-red-700 text-white flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-800"
        >
          <FaSignOutAlt size={16} />
          <span>Logout</span>
        </button>
      </div>

      {/* Modal for editing */}
      {showModal && currentUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <InputField 
              label="Name"
              type="text"
              name="name"
              value={currentUser.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
            <InputField 
              label="Username"
              type="text"
              name="username"
              value={currentUser.username}
              onChange={handleInputChange}
              placeholder="Enter username"
            />
            <InputField 
              label="Email"
              type="email"
              name="email"
              value={currentUser.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
            <InputField 
              label="Password"
              type="password"
              name="password"
              value={currentUser.password}
              onChange={handleInputChange}
              placeholder="Enter password"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={closeModal} className="btn bg-red-700 text-white hover:bg-red-800">Cancel</button>
              <button onClick={handleUpdate} className="btn bg-[#03346E] text-white hover:bg-[#022a4d]">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
