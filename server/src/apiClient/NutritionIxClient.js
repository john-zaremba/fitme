
import got from "got"
import "dotenv/config"

const appId = process.env.NUTRITIONIX_APPLICATION_ID
const apiKey = process.env.NUTRITIONIX_API_KEY

class NutritionIxClient {
  static async naturalSearch(query) {
    try {
      const url = `https://trackapi.nutritionix.com/v2/natural/nutrients`
      const response = await got.post({
        url: url,
        headers: {
          "Content-Type": "application/json",
          "x-app-id": appId,
          "x-app-key": apiKey,
          "x-remote-user-id": "0"
        },
        json: {
          "query": query
        }
      })
      const responseBody = response.body
      return responseBody
    } catch (error) {
      return { error: error.message }
    }
  }
}

export default NutritionIxClient