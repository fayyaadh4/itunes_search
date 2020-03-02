//THE PART I AM STRUGGLING WITH IS THE HANDLE SEARCH FUNCTION
//IVE COMMENTED OUT ALL THE OTHER PARTS

import React from "react";
import Items from "./Items";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Favourite from "./Favourite";
import Header from "./Header";
import InputGroup from "react-bootstrap/InputGroup";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Footer from "./Footer";

//state component used as states are passed through props
//initial states are set
export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
      items: [],
      newQuery: "",
      newGenre: "",
      isLoaded: true,
      error: null
    };
  }

  //the add favourite function which checks if the item has already been favourited before adding it to the favourites array
  addFavourite = item => {
    const { favourites } = this.state;

    if (
      !favourites.some(
        alreadyFavourite => alreadyFavourite.trackId === item.trackId
      )
    ) {
      //the spread operator is used to add the selected favourite to a copy of the favourites array
      this.setState(
        {
          favourites: [...this.state.favourites, item]
        },
        () => console.log(favourites)
      );
    }
  };
  //remove favourites function for removing items from favourites list
  removeFavourite = (item, index) => {
    const { favourites } = this.state;
    console.log(favourites);
    console.log(item);
    this.setState({
      favourites: favourites.filter(favourites => favourites !== item)
    });
  };

  //function which allows for the input field to be edited while setting thte state of the
  //newQuery field to the target of the input field
  handleQueryChange = e => {
    e.preventDefault();
    this.setState(
      {
        newQuery: e.target.value
      },
      () => console.log(this.state.newQuery)
    );
  };

  //function which allows for filter search into different media types depending on user
  handleGenreChange = e => {
    e.preventDefault();
    this.setState(
      {
        newGenre: e.target.id
      },
      () => console.log(this.state.newGenre)
    );
  };

  //main function whichh handles search from user
  //this function sends the data from the client side to the server fetching the data and then recieving the data back from the server
  handleSearch = e => {
    //prevents form from submitting whole time
    e.preventDefault();
    //set term and media params to state set by input of user
    const term = this.state.newQuery;
    const media = this.state.newGenre;
    //if function checking if specific media was selected, else get all media
    if (media) {
      console.log(media);
      //function which fetches data from server
      fetch(`/search/${term}/${media}`)
        .then(res => res.json())
        .then(
          items => {
            console.log(items);
            this.setState(
              {
                //sets data recieved to items empty array
                items: items.items.results
              },
              () => console.log(items.items.results)
            );
          },
          //returns error
          error => {
            this.setState({
              error
            });
          }
        );
    } else {
      console.log(media);
      //function which fetches data from server
      fetch(`/search/${term}`)
        .then(res => res.json())
        .then(
          items => {
            console.log(items);
            this.setState(
              {
                //sets data recieved to items empty array
                items: items.items.results
              },
              () => console.log(items.items.results)
            );
          },
          //returns error
          error => {
            this.setState({
              error
            });
          }
        );
    }
  };

  render() {
    //if error run error message else run app
    if (this.state.error) {
      return (
        <div>
          <span>Error: Invalid entry. Please refresh and try again.</span>
        </div>
      );
    } else {
      return (
        <div>
          <Container>
            <Header></Header>
            <Row>
              <Col lg={true} md={10}>
                <InputGroup className="mb-3" onSubmit={this.handleSubmit}>
                  <Form.Control
                    type="text"
                    name="search"
                    placeholder="search..."
                    value={this.state.newQuery}
                    onChange={this.handleQueryChange}
                  ></Form.Control>
                  <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    title="All media"
                    id=""
                  >
                    <Dropdown.Item
                      id="movie"
                      value="movie"
                      onClick={this.handleGenreChange}
                    >
                      Movies
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="song"
                      value="music"
                      onClick={this.handleGenreChange}
                    >
                      Music
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="tvEpisode"
                      value="tv-episode"
                      onClick={this.handleGenreChange}
                    >
                      TV Shows
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="ebook"
                      value="ebook"
                      onClick={this.handleGenreChange}
                    >
                      Ebooks
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="podcast"
                      value="podcast"
                      onClick={this.handleGenreChange}
                    >
                      Podcasts
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="shortFilm"
                      value="shortFilm"
                      onClick={this.handleGenreChange}
                    >
                      Short Films
                    </Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </Col>
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSearch}
              >
                Search
              </Button>
            </Row>
            <Row>
              <Col>
                <Items
                  items={this.state.items}
                  addFavourite={this.addFavourite}
                ></Items>
              </Col>
              <Col lg={3}>
                <Favourite
                  favourites={this.state.favourites}
                  removeFavourite={this.removeFavourite}
                ></Favourite>
              </Col>
            </Row>
            <Row>
              <Footer></Footer>
            </Row>
          </Container>
        </div>
      );
    }
  }
}
