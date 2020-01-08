const db = require("./knex");

const getUser = (email, password) => {
  return db
    .select()
    .table("users")
    .where({ email: email, password: password });
};

const createUser = user => {
  return db
    .table("users")
    .insert({
      name: user.name,
      email: user.email,
      description: user.description,
      website: user.website,
      logo_url: user.logoUrl,
      password: user.password
    })
    .then(() => {
      return db
        .select()
        .table("users")
        .where({ email: user.email });
    });
};

const createEvent = event => {
  return db
    .table("events")
    .insert({
      name: event.name,
      category: event.category,
      starting_date: event.startingDate,
      ending_date: event.endingDate,
      description: event.description,
      photo_url: event.photoUrl,
      country_code: event.countryCode,
      city: event.city,
      address: event.address,
      price: event.price,
      currency_code: event.countryCode,
      creator_id: event.creatorId
    })
    .then(() => {
      return "success";
    });
};

module.exports = { getUser, createUser, createEvent };
