function createInvalidDataError(message) {
  const error = new Error(message)
  error.type = 'ERROR_INVALID_DATA'
  return error
}

export { createInvalidDataError }