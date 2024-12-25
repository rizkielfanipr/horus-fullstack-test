import propTypes from "prop-types";

const InputField = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div className="form-control w-full mb-2">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full border-1 border-gray-200 rounded-lg"
      />
    </div>
  );
};

InputField.propTypes = {
  label: propTypes.string.isRequired,
  type: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  name: propTypes.string,
};

export default InputField;
