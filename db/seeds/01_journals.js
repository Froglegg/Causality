const exampleJournal = require("../../utils/exampleJournal");
const exampleJournal2 = require("../../utils/exampleJournal2");
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
        },
        {
          user: 1,
          journalName: "WereSquirrel2",
          condition: "Turning into a squirrel part deux",
          data: JSON.stringify(exampleJournal2),
          causality: 0
        }
      ]);
    });
};
