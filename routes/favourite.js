const express = require('express');
const router = express.Router();

const favourites = [];

//set favourites
router.get('/api/favourites', function(req,res) {
  res.json(favourites);
})

router.post("/api/favourites", (req, res) => {
  //create new object instance for post request
  const project = {
    //set project id to be equal to the length of the new favourites array plus 1
    id: favourites.length + 1,
    //the title, description and url of the new project is entered into the body
    title: req.body.title,
    description: req.body.description,
  };
  //the new project is pushed into the favourites array using the push function
  favourites.push(favourite);
  //the result is returned as a json
  res.json(`Project ${favourite.id} was posted.`);
});

module.exports = router;