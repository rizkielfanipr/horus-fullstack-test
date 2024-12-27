import { FaSortAlphaDown, FaSortAlphaUp, FaSignOutAlt } from 'react-icons/fa';
import EditUserModal from '../components/EditUserModal';
import UserTable from '../components/UserTable';
import { useUsers } from '../hooks/useUsers';

const Dashboard = () => {
  const { 
    users, 
    searchTerm, 
    handleSearch, 
    handleSort, 
    handleDelete, 
    sortOrder, 
    showModal, 
    currentUser, 
    openModal, 
    closeModal, 
    handleInputChange, 
    handleUpdate, 
    handleLogout 
  } = useUsers();

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#03346E]">Users Dashboard</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleSort}
            className="btn bg-[#03346E] text-white flex items-center space-x-2 hover:bg-[#001A40] px-4 py-2 rounded-md"
          >
            {sortOrder === 'asc' ? <FaSortAlphaUp size={16} /> : <FaSortAlphaDown size={16} />}
            <span>Sort</span>
          </button>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="input input-bordered px-4 py-2 rounded-md border border-gray-300"
          />
        </div>
      </div>

      {/* User Table */}
      <UserTable users={users} searchTerm={searchTerm} openModal={openModal} handleDelete={handleDelete} />

      {/* Logout Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleLogout}
          className="btn bg-[#FF2929] text-white flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-red-800"
        >
          <FaSignOutAlt size={16} />
          <span>Logout</span>
        </button>
      </div>

      {/* Edit User Modal */}
      {showModal && (
        <EditUserModal
          currentUser={currentUser}
          handleInputChange={handleInputChange}
          handleUpdate={handleUpdate}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
