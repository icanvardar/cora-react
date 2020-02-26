import React, { Fragment, useState, useContext } from 'react';
import Context from "../../utils/Context";

import { MDBInput as Input, MDBRow as Row, MDBCol as Col, MDBBtn as Btn, MDBIcon as Icon } from 'mdbreact';
import { findUser } from '../../utils/apiRequests/userwithtoken';

const BlockUser = () => {
    const {token, username, userId} = useContext(Context);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const listResults = (e) => {
        e.preventDefault();
        findUser(token, {
            username: searchText
          },
          (res) => {
            let result = [];
            // To ignore current user
            if (res.data.map(user => {
                if (user.username === username) {
                    return;
                }
                result.push(user);
            }))
            setSearchResult(result);
          },
          (err) => {
            console.log(err);
          })
    }

    return (
        <Fragment>
            <form onSubmit={(e) => listResults(e)}>
              <Row style={{marginLeft: '10px'}}>
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
        </Fragment>
    )
} 

export default BlockUser;