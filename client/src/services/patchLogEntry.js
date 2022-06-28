const patchLogEntry = async (entryId, patchData) => {
  try {
    const response = await fetch(`/api/v1/entries/${entryId}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(patchData)
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

export default patchLogEntry