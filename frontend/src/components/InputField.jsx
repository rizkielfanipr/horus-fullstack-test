import propTypes from "prop-types";

const InputField = ({ type, placeholder, value, onChange, name }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};

InputField.propTypes = {
  type: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  name: propTypes.string,
};

export default InputField;
