
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.integer("id").primary();
    table.string("name");
    table.string("email");
    table.string("description")
    table.string("website");
    table.string("logo_url")
    table.string("password");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
