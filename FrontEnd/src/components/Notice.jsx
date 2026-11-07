function Notice({ message, onDismiss }) {
  if (!message) return null

  return (
    <button className="notice" onClick={onDismiss} type="button">
      {message}
    </button>
  )
}

export default Notice
