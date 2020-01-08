const db = require("./knex");

const getUser = (email, password) => {
  return db
    .select()
    .column(
      "id",
      "name",
      "email",
      "description",
      "website",
      { logoUrl: "logo_url" },
      "password"
    )
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

const getEvents = creatorId => {
  return db
    .table("events")
    .column(
      "id",
      "name",
      "category",
      { createdAt: "created_at" },
      { startingDate: "starting_date" },
      { endingDate: "ending_date" },
      "description",
      { photoUrl: "photo_url" },
      { countryCode: "country_code" },
      "city",
      "address",
      "price",
      { currencyCode: "currency_code" },
      { creatorId: "creator_id" }
    )
    .select()
    .where({ creator_id: creatorId });
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
      currency_code: event.currencyCode,
      creator_id: event.creatorId
    })
    .then(() => {
      return "success";
    });
};

module.exports = { getUser, createUser, getEvents, createEvent };
