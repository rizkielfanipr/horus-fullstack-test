import { FaEdit, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// Komponen untuk Header Tabel
const TableHeader = () => (
  <tr className="border-b border-gray-300">
    {['No', 'Nama', 'Username', 'Email', 'Password', 'Aksi'].map((header, index) => (
      <th key={index} className="px-4 py-2 text-center">
        {header}
      </th>
    ))}
  </tr>
);

// Komponen untuk Cell Tabel (untuk menyederhanakan td)
const TableCell = ({ children, className = '' }) => (
  <td className={`px-4 py-2 text-center ${className}`}>{children}</td>
);

TableCell.propTypes = {
  children: PropTypes.node.isRequired, // Expecting a node (text, elements, etc.)
  className: PropTypes.string, // Optional string for className
};

// Komponen untuk Baris Tabel
const TableRow = ({ user, index, openModal, handleDelete }) => {
  const rowData = [
    index + 1, // No
    user.name, // Nama
    user.username, // Username
    user.email, // Email
    user.password ? `*******` : 'No password', // Password
  ];

  return (
    <tr key={user.id} className="hover:bg-gray-100 border-b border-gray-300">
      {rowData.map((data, idx) => (
        <TableCell key={idx}>{data}</TableCell>
      ))}
      <td className="px-4 py-2 space-x-2 text-center">
        <button
          onClick={() => openModal(user)}
          className="btn text-sm text-green-600 hover:text-green-800"
        >
          <FaEdit size={16} className="text-green-600" />
        </button>
        <button
          onClick={() => handleDelete(user.id)} // Call handleDelete directly
          className="btn btn-danger text-sm text-red-600 hover:text-red-800"
        >
          <FaTrash size={16} className="text-red-600" />
        </button>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

const UserTable = ({
  users = [],
  searchTerm = '',
  openModal = () => {},
  handleDelete = () => {},
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Handle Delete with confirmation using DaisyUI modal
  const confirmDelete = (userId) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedUserId);
    setModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="overflow-x-auto max-w-full mx-auto">
      <table className="table-auto w-full min-w-max border border-gray-300 border-collapse rounded-lg">
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <TableRow
              key={user.id}
              user={user}
              index={index}
              openModal={openModal}
              handleDelete={() => confirmDelete(user.id)} // Pass the id to confirm delete
            />
          ))}
        </tbody>
      </table>

      {/* Modal Konfirmasi Hapus */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl font-semibold">Apakah Anda Yakin?</h2>
              <p className="my-4">Data yang dihapus tidak dapat dikembalikan.</p>
              <div className="modal-action">
                <button
                  onClick={handleConfirmDelete}
                  className="btn btn-danger bg-red-600 text-white"
                >
                  Hapus
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="btn"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
      password: PropTypes.string,
    })
  ).isRequired,
  searchTerm: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default UserTable;
