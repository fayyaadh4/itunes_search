const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//search for item by movie entity
//use params to get data from client side and pass to server
router.get("/search/:term/:media/:limit", async (req, res) => {
  const term = req.params.term;
  const media = req.params.media;
  const limit = req.params.limit;
  fetch(`https://itunes.apple.com/search?term=${term}&media=${media}&limit=${limit}`)
    .then(res => res.json())
    .then(items => res.send({ items }))
    .catch(error => {
      console.log(error);
      res.redirect("/error");
    });
});

module.exports = router;
