exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          userName: "froggleg",
          email: "frogboi@gmail.com",
          password: "pass123",
          location: "anywhere",
          hobby: "doing stuff"
        }
      ]);
    });
};
