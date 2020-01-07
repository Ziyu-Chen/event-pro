
exports.up = function(knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("category").notNullable();
    table.timestamp("created_at").default(knex.fn.now());
    table.date("starting_date").notNullable();
    table.date("ending_date").notNullable();
    table.string("description").notNullable();
    table.string("photo_url");
    table.string("country_code").notNullable();
    table.string("city").notNullable();
    table.string("address").notNullable();
    table.float("price").notNullable();
    table.string("currency_code");
    table.integer("creator_id");
    table.foreign("creator_id").references("id").inTable("users");
    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("events");
};
