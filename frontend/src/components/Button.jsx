import propTypes from 'prop-types';

const Button = ({ text, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn"
      style={{
        backgroundColor: '#79D7BE',
        color: 'white',
        border: 'none',
      }}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: propTypes.string,
  onClick: propTypes.func,
  type: propTypes.string,
};

export default Button;
