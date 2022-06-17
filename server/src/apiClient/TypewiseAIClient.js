import got from "got"
import "dotenv/config"

const key = process.env.TYPEWISEAI_API_KEY
const host = process.env.TYPEWISEAI_API_HOST

class TypewiseAIClient {
  static async autoComplete(query) {
    try {
      const url = "https://typewise-ai.p.rapidapi.com/completion/complete"
      const response = await got.post({
        url: url,
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": host
        },
        json: {
          "text": query,
          "correctTypoInPartialWord": true,
          "language": "en"
        }
      })
      const data = JSON.parse(response.body)
      const suggestions = [] 

      for (let i = 0; i < 3; i++) {
        if (data.predictions[i]) {
          suggestions.push(data.predictions[i].text)
        }
      }
      
      return suggestions
    } catch (error) {
      return { error: error.message }
    }
  }
}

export default TypewiseAIClient