import InputField from '../components/InputField';
import PropTypes from 'prop-types';

const EditUserModal = ({ currentUser, handleInputChange, handleUpdate, closeModal }) => {
  if (!currentUser) return null;

  return (
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
          <button onClick={closeModal} className="btn bg-[#FF2929] text-white hover:bg-red-800">
            Cancel
          </button>
          <button onClick={handleUpdate} className="btn bg-[#03346E] text-white hover:bg-[#022a4d]">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

EditUserModal.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditUserModal;
