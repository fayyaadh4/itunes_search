const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");


//used to check if data is being passed. this works
router.get("/api/batman", (req, res) => {
    const term = "batman";
    fetch(`https://itunes.apple.com/search?term=${term}`)
      .then(res => res.json())
      .then(items => res.send({ items }))
      .catch(error => {
        console.log(error);
        res.redirect("/error");
      });
  });
  
module.exports = router;