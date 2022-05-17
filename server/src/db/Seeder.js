/* eslint-disable no-console */
import { connection } from "../boot.js"
import ConsumableSeeder from "./seeders/consumableSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding consumables...")
    await ConsumableSeeder.seed()

    console.log("seeding users...")
    await UserSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder