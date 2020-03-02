import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

export default function Favourite(props) {
  return (
    //displays favourite items and includes button which removes favourite
    <div>
      <Container>
        <h2>Favourites</h2>
        <Card style={{ backgroundColor: "lightblue" }}>
          <Row>
            <ul>
              {props.favourites.map(item => {
                return (
                  <li key={item.index} className="favList">
                    <Col>
                      <a
                        href={item.collectionViewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          className="favImg itemImg img-responsive"
                          src={item.artworkUrl100}
                          alt={item.trackName}
                          fluid
                          thumbnail
                        />
                      </a>
                    </Col>
                    <Col>
                      <h6>{item.trackName}</h6>
                      <h6>{item.kind}</h6>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => props.removeFavourite(item)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </li>
                );
              })}
            </ul>
          </Row>
        </Card>
      </Container>
    </div>
  );
}
