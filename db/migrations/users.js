exports.up = knex =>
  knex.schema.createTable("users", table => {
    table.increments("id");
    table.string("userName", 255);
    table.text("email").notNullable();
    table.string("password", 255);
    table.string("location", 255);
    table.text("hobby");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.unique(["email", "userName"]);
  });

exports.down = knex => knex.schema.dropTableIfExists("users");
