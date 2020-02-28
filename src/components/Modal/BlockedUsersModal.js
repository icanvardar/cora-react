import React, { useState, useEffect, useContext } from "react";
import {
  MDBContainer as Container,
  MDBBtn as Btn,
  MDBModal as Modal,
  MDBRow as Row,
  MDBCol as Col,
  MDBIcon as Icon,
  MDBInput
} from "mdbreact";

import axios from "axios";
import { history } from '../../App';

import Context from "../../utils/Context";

const BlockedUsersModal = props => {
  const { token } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    if (props.isOpen === true) {
      setIsOpen(props.isOpen);
    }
  }, [props.isOpen]);

  useEffect(() => {
    console.log(props.blockedUsers);
    setBlockedUsers(props.blockedUsers);
  }, [props.blockedUsers]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Modal centered isOpen={isOpen}>
      <Row
        between
        style={{
          backgroundColor: "#151515",
          color: "white",
          paddingTop: "10px",
          paddingRight: "20px",
          paddingLeft: "20px"
        }}
      >
        <Col xs="5" style={{ marginLeft: "20px" }}>
            <h3>Engellenen Listesi</h3>
        </Col>
        <Col
          xs="3"
          onClick={() => toggle()}
          style={{ marginRight: "20px", cursor: "pointer" }}
        >
          <Icon icon="times" />
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: "#151515",
          paddingRight: "20px",
          paddingLeft: "20px",
          paddingTop: "30px"
        }}
      >
        <Container style={{ color: "white" }}>
          <Row>
            { blockedUsers.length > 0 ? blockedUsers.map(user => (
              <Col md="6" key={user._id}>
                <div
                  style={{ display: "flex", flexFlow: "row", fontSize: "14px" }}
                >
                  <img
                    style={{ width: "35px", height: "35px" }}
                    src={user.profile_photo}
                    alt="user-profile-photo"
                  ></img>
                  <div
                    style={{
                      width: "75px",
                      marginLeft: "10px",
                      marginRight: "20px",
                      marginTop: "-5px"
                    }}
                  >
                    <p>@{user.username}</p>
                    <p
                      style={{ marginTop: "-20px" }}
                    >{`${user.name} ${user.surname}`}</p>
                  </div>
                  <div>
                    <p style={{cursor: 'pointer', color: 'aliceblue', fontSize: '12px'}} onClick={ async () => {
                        await props.removeBlock(user._id);
                        history.push('/settings');
                    }}>Kaldır</p>
                  </div>
                </div>
              </Col>
            ))
            :
            <div style={{marginLeft: '20px'}}>
                <p>Engellenen kullanıcı bulunmamaktadır.</p>
            </div>
        }
          </Row>
          <hr></hr>
          <div style={{paddingBottom: '25px', paddingTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Btn style={{textTransform: 'none'}} size="sm" color="danger" onClick={() => toggle()}>Kapat</Btn>
          </div>
        </Container>
      </Row>
    </Modal>
  );
};

export default BlockedUsersModal;
