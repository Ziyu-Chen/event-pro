
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("description");
    table.string("website");
    table.string("logo_url")
    table.string("password").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
