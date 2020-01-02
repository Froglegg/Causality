const exampleJournal = require("../../utils/exampleJournal");
exports.seed = function(knex) {
  console.log(exampleJournal);
  // Deletes ALL existing entries
  return knex("journals")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("journals").insert([
        {
          user: 1,
          journalName: "WereSquirrel",
          condition: "Turning into a squirrel",
          data: JSON.stringify(exampleJournal),
          causality: 0
        }
      ]);
    });
};
