import got from "got"
import dotenv from "dotenv"
dotenv.config()

const appId = process.env.NUTRITIONIX_APPLICATION_ID
const apiKey = process.env.NUTRITIONIX_API_KEY
const remoteUserId = process.env.NUTRITIONIX_REMOTE_USER_ID

class NutritionIxClient {
  static async naturalSearch(queryString) {
    try {
      const url = `https://trackapi.nutritionix.com/v2/natural/nutrients`
      const response = await got.post({
        url: url,
        headers: {
          "x-app-id": appId,
          "x-app-key": apiKey,
          "x-remote-user-id": remoteUserId,
          "Content-Type": "application/json"
        },
        json: {
          "query": queryString
        }
      })
      const responseBody = response.body
      return responseBody
    } catch (error) {
      return { error: error.message }
    }
  }
}