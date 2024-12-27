import { FaEdit, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';

const UserTable = ({
  users = [],
  searchTerm = '',
  openModal = () => {},
  handleDelete = () => {},
}) => {
  return (
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
          {users
            .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-100 border-b border-gray-300">
                <td className="px-8 py-2 text-center">{index + 1}</td>
                <td className="px-6 py-6 text-center">{user.name}</td>
                <td className="px-4 py-2 text-center">{user.username}</td>
                <td className="px-4 py-2 text-center">{user.email}</td>
                <td className="px-4 py-2 text-center">
                  {user.password ? `${user.password.slice(0, 5)}*****` : 'No password'}
                </td>
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
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    })
  ),
  searchTerm: PropTypes.string,
  openModal: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default UserTable;
