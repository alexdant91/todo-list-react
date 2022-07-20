const MessageComponent = ({ message, handleCloseMessage }) => {
  return (
    message != null && (
      <div className="message">
        {message}
        <span onClick={handleCloseMessage}></span>
      </div>
    )
  )
}

export default MessageComponent;
