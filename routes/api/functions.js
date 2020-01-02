const router = require("express").Router();
// causality processing function... should this go here , in the controllers, in routes, client utils ?
const utils = require("../../utils/app");

router.post("/testFunction", async (req, res) => {
  let response = utils.causality(req.body);
  res.send(response);
});

module.exports = router;
