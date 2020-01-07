const db = require("./knex")

const getUser = (email, password) => {
  return db.select().table("users").where({"email":email, "password":password})
}

const createUser = (user) => {
  return db.table("users").insert(
    {
      name: user.name,
      email: user.email,
      description: user.description,
      website: user.website,
      logo_url: user.logoUrl,
      password: user.password
    }
  ).then(() => {
    return db.select().table("users").where({email: user.email})
  })
}

module.exports = { getUser, createUser }