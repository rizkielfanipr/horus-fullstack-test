import PropTypes from 'prop-types';

const Button = ({ text, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#03346E] text-white py-2 px-4 rounded-md hover:bg-[#022a4d] focus:outline-none w-full mt-2"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Button;
