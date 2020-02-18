import React, { useEffect, useState, useContext } from "react";
import {
  MDBContainer as Container,
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBRow as Row,
  MDBCol as Col,
  MDBBtn as Btn,
  MDBIcon as Icon,
  MDBInput as Input
} from "mdbreact";

import { findUser, topTwenty } from "../../utils/apiRequests/userwithtoken";

import Context from "../../utils/Context";

import { history } from "../../App";

const UserSearchPage = ({ match, location }) => {
  const [username, setUsername] = useState(match.params.username);
  const { token } = useContext(Context);

  const [top20Users, setTop20Users] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    topTwenty(
      token,
      res => {
        setTop20Users(res.data);
        console.log(res.data);
      },
      err => {
        console.log(err);
      }
    );

    findUser(
      token,
      {
        username
      },
      res => {
        setSearchResult(res.data);
        console.log(res.data);
      },
      err => {
        console.log(err);
      }
    );
  }, []);

  return (
    <Container className="page">
      <div style={{ marginTop: "20px" }}>
        <Card
          style={{
            backgroundColor: "#151515",
            color: "white",
            marginTop: "20px"
          }}
        >
          <CardBody>
            <form onSubmit={() => history.push(`/find/${searchText}`)}>
              <Row center>
                <Col xs="4">
                  <Input
                    style={{ marginTop: "-25px", color: "white" }}
                    hint="Ara"
                    type="text"
                    aria-label="Search"
                    onChange={e => setSearchText(e.target.value)}
                  />
                </Col>
                <Col xs="2">
                  <Btn
                    color="white"
                    size="sm"
                    type="submit"
                  >
                    <Icon icon="search"></Icon>
                  </Btn>
                </Col>
              </Row>
            </form>
            <h5>Sonuçlar</h5>
            <Row>
              {searchResult.length !== 0 ? (
                searchResult.map(user => (
                  <a key={user._id} href={`/profile/${user.username}`}>
                    <Col
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        color: "white",
                        marginTop: "5px",
                        marginLeft: "5px"
                      }}
                    >
                      <div>
                        <img
                          style={{ width: "35px", height: "35px" }}
                          src={user.profile_photo}
                          alt=""
                        ></img>
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            fontSize: "14px"
                          }}
                        >
                          <p>{user.name}</p>
                          <p style={{ marginTop: "-20px" }}>@{user.username}</p>
                        </div>
                      </div>
                    </Col>
                  </a>
                ))
              ) : (
                <p style={{ marginLeft: "20px" }}>Sonuç bulunamadı...</p>
              )}
            </Row>
            <hr></hr>
            <Row>
              {top20Users.map(user => (
                <a key={user._id} href={`/profile/${user.username}`}>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      color: "white",
                      marginTop: "5px",
                      marginLeft: "5px"
                    }}
                  >
                    <div>
                      <img
                        style={{ width: "35px", height: "35px" }}
                        src={user.profile_photo}
                        alt=""
                      ></img>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          fontSize: "14px"
                        }}
                      >
                        <p>{user.name}</p>
                        <p style={{ marginTop: "-20px" }}>@{user.username}</p>
                      </div>
                    </div>
                  </Col>
                </a>
              ))}
            </Row>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default UserSearchPage;
