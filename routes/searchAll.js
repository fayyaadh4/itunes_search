const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

//search for item by term only. Finds all items from search
router.get("/search/:term", async (req, res) => {
    const term = req.params.term;
    fetch(`https://itunes.apple.com/search?term=${term}`)
    .then(res => res.json())
    .then( 
      items => res.send({items})
    )
    .catch(error => {
      console.log(error)
      res.redirect('/error');
    })
  })
  
module.exports = router;