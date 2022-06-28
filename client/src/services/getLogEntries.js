const getLogEntries = async (id) => {
  try {
    const response = await fetch(`/api/v1/logs/${id}`)
    if (!response.ok) {
      if (response.status === 401) {
        return 401
      } else {
        const error = new Error(`Error in fetch: ${response.status} (${response.statusText})`)
        throw error
      }
    }
    const responseBody = await response.json()
    return responseBody.log
  } catch (error) {
    console.error(error.message)
  }
}

export default getLogEntries