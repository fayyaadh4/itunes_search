import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

export default function Items(props) {
  return (
    //recieves data from parent and displays it
    //contains button whch allows for itm to be favourited
    <div>
      <Container>
        <Row>
          <h2>Items</h2>
        </Row>
        <Row>
          <Col>
            <ul>
              {props.items.map((item, index) => (
                <Card
                  className="itemCard"
                  style={{ backgroundColor: "powderblue" }}
                >
                  <li key={index}>
                    <Row>
                      <Col md={9}>
                        <a
                          href={item.collectionViewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            className="itemImage img-responsive"
                            src={item.artworkUrl100}
                            alt={item.trackName}
                            fluid
                            thumbnail
                          />
                        </a>
                        <h5>{item.trackName}</h5>
                        <span><h6>Release Date: </h6><p>{item.releaseDate.slice(0, 10)}</p></span>
                        <h6>Kind: {item.kind}</h6>
                        <h6>Description: </h6>
                        <p>{item.longDescription}</p>
                      </Col>
                      <Row>
                        <Col md={2} style={{ margin: "10px" }}>
                          <Button
                            className="favButton"
                            variant="primary"
                            size="sm"
                            onClick={() => props.addFavourite(item)}
                          >
                            Add to favourites
                          </Button>
                        </Col>
                      </Row>
                    </Row>
                  </li>
                </Card>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
