const knex = require("knex");
const config = require("./knexfile").development;

const db = knex({
  client: config.client,
  connection: config.connection,
  searchPath: "public",
});

module.exports = db;