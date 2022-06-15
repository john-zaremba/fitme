class UserSerializer {
  static getSummary(user) {
    const allowedAttributes = [
      "id",
      "email",
      "age",
      "height",
      "weight",
      "activityLevel",
      "sex",
      "bmr"
    ]
    let serializedUser = {}
  
    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute]
    }

    return serializedUser
  }
}

export default UserSerializer