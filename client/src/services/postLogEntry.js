const postLogEntry = async (id, formInput) => {
  try {
    const response = await fetch(`/api/v1/logs/${id}/entries`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(formInput)
    })

    if (!response.ok) {
      if (response.status === 401 || response.status === 404) {
        const body = await response.json()
        const responseObject = {
          errors: body.errors,
          status: response.status
        }
        return responseObject
      } else {
        const error = new Error(`Error in fetch: ${error.status} (${error.statusText})`)
        throw error
      }
    }

    const responseBody = await response.json()
    return responseBody.log
  } catch (error) {
    console.error(error.message)
  }
}

export default postLogEntry