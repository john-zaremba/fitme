import { User } from "../../models/index.js"
import getBMR from "../../services/getBMR.js"

class UserSeeder {
  static async seed() {
    const bmr = getBMR("male", 185, 75, 29, 2)
    const usersData = [
      {
        email: "hello@email.com",
        password: "world",
        age: 29,
        height: 185,
        weight: 75,
        activityLevel: 2,
        sex: "male",
        bmr: bmr
      },
      {
        email: "extra@email.com",
        password: "placeHolderAccount"
      }
    ]

    for (const userObject of usersData) {
      const currentUser = await User.query().findOne({ email: userObject.email })
      if (!currentUser) {
        await User.query().insert(userObject)
      }
    }
  }
}

export default UserSeeder