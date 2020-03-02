//get express modules
const express = require("express");
const app = express();

const path = require('path');

//body parser module which allows for data to be passed through the body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//helmet module provides  a bit of security
const helmet = require('helmet');
app.use(helmet());

//fetch module
const fetch = require("node-fetch");

//local port at 8000 since create-react-app always runs on 3000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
  'frontend', 'build','index.html'));
  });
  }

  app.use(express.static(path.join(__dirname,'frontend/build')));

const favourites = [];

//set favourites
app.get('/api/favourites', function(req,res) {
  res.json(favourites);
})

app.post("/api/favourites", (req, res) => {
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
  
app.get("/welcome", (req, res) => {
  res.json("Welcome");
});

//search for item by movie entity
//use params to get data from client side and pass to server
app.get("/search/:term/:media", async (req, res) => {
  const term = req.params.term;
  const media = req.params.media;
  fetch(`https://itunes.apple.com/search?term=${term}&entity=${media}`)
  .then(res => res.json())
  .then( 
    items => res.send({items})
  )
  .catch(error => {
    console.log(error)
    res.redirect('/error');
  })
})

//search for item by term only. Finds all items from search
app.get("/search/:term", async (req, res) => {
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


//used to check if data is being passed. this works
app.get("/api/batman", (req, res) => {
  const term = "batman";
  fetch(`https://itunes.apple.com/search?term=${term}`)
    .then(res => res.json())
    .then(items => res.send({ items }))
    .catch(error => {
      console.log(error);
      res.redirect("/error");
    });
});

//error handler. '*' catces every undefined route and error message gets displayed
app.get('*', function(request, response, next) {
  let err = new Error("Sorry! Can’t find that resource. Please check your URL");
  err.statusCode = 404;
  next(err);
})


module.exports = app;