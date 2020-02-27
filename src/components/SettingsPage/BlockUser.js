import React, { Fragment, useState, useContext, useEffect } from 'react';
import Context from "../../utils/Context";

import BlockFeedbackModal from '../Modal/BlockFeedbackModal';

import { MDBInput as Input, MDBIcon, MDBRow as Row, MDBCol as Col, MDBBtn as Btn, MDBIcon as Icon, MDBModal as Modal, MDBModalHeader as ModalHeader, MDBModalBody as ModalBody } from 'mdbreact';
import { findUser } from '../../utils/apiRequests/userwithtoken';
import { add } from '../../utils/apiRequests/connectionUser/blockeduser';

const BlockUser = () => {
  const { token, username, userId } = useContext(Context);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // To show modal to user after blocking session
  const [blockedApproved, setBlockedApproved] = useState(false);

  // To distinct blocked user's username after blocking
  const [blockedUserUsername, setBlockedUserUsername] = useState('');

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
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      })
  }

  const blockUser = (id, username) => {
    add(token, {
      blocked_id: id,
      blocking_id: userId
    },
      (res) => {
        setBlockedUserUsername(username);
        setBlockedApproved(true);
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      })
  }

  return (
    <Fragment>
      <form onSubmit={(e) => listResults(e)}>
        <Row style={{ marginLeft: '10px' }}>
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

      {
        searchResult.length > 0 &&
        <div>
          <h5 style={{ marginLeft: '10px', marginBottom: '20px' }}>Sonuçlar:</h5>
        </div>
      }

      <div style={{ marginLeft: '10px' }}>
        <Row>
          {
            searchResult.map(user =>
              <Col md="6" key={user._id}>
                <div style={{ display: 'flex', flexFlow: 'row', fontSize: '14px' }}>
                  <img style={{ width: '35px', height: '35px' }} src={user.profile_photo} alt="user-profile-photo"></img>
                  <div style={{ width: '75px', marginLeft: '10px', marginRight: '20px', marginTop: '-5px' }}>
                    <p>@{user.username}</p>
                    <p style={{ marginTop: '-20px' }}>{`${user.name} ${user.surname}`}</p>
                  </div>
                  <div>
                    <MDBIcon style={{ color: 'red', cursor: 'pointer' }} onClick={e => blockUser(user._id, user.username)} icon="ban" />
                  </div>
                </div>
              </Col>
            )
          }
        </Row>
      </div>

      <BlockFeedbackModal isOpen={blockedApproved} blockedUserUsername={blockedUserUsername}></BlockFeedbackModal>

    </Fragment>

  )
}

export default BlockUser;