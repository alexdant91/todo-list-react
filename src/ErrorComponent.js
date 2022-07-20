const ErrorComponent = ({ error, handleCloseError }) => {
  return (
    error != null && (
      <div className="error">
        {error}
        <span onClick={handleCloseError}></span>
      </div>
    )
  )
}

export default ErrorComponent;
