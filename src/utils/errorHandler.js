export function handleError(error, defaultMessage) {
  const errorMessage = error.response?.data?.message || defaultMessage
  console.error('Error:', errorMessage)
  throw new Error(errorMessage)
}
