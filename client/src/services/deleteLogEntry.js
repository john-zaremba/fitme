const deleteLogEntry = async (entryId) => {
  try {
    const response = await fetch(`/api/v1/entries/${entryId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })

    if (!response.ok) {
      const error = new Error(`Error in fetch: ${error.status} (${error.statusText})`)
      throw error
    }

    const responseBody = await response.json()
    
    return responseBody.log
  } catch (error) {
    console.error(error.message)
  }
}

export default deleteLogEntry