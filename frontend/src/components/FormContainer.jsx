import PropTypes from "prop-types";

const FormContainer = ({ children, title }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full p-5 border rounded-lg shadow-md">
        {title && <h2 className="text-2xl font-semibold p-4 text-center">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default FormContainer;
