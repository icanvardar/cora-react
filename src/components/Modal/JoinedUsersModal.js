import React, { useState, useEffect, useContext } from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBRow as Row, MDBCol as Col, MDBIcon } from 'mdbreact';

import {getUsers} from '../../utils/apiRequests/connectionUser/alldata';

import Context from '../../utils/Context';

const JoinedUsersModal = (props) => {
    const {token} = useContext(Context);
    const [modal, setModal] = useState(props.isOpen);
    const [users, setUsers] = useState([]);

    const toggle = () => {
        setModal(!modal);
    }

    useEffect(() => {
        const cep_id = props.post.cep_id;
        getUsers(token, {paginationNumber: "0", cep_id},
            (res) => {
                setUsers(res.data);
            },
            (err) => {
                console.log(err);
            }
        )
    }, [props])

  return (
        <div>
            <MDBModal isOpen={modal} toggle={() => toggle()} centered>
            <MDBModalHeader style={{backgroundColor: '#151515', height: '60px'}} toggle={() => toggle()}>Katılan Kişiler</MDBModalHeader>
                <MDBModalBody style={{backgroundColor: '#151515', fontSize:'10px'}}>
                    {
                        users.map(user => (
                            <Row key={user._id} between>
                                <Col size="2">
                                    <img style={{height: '30px', width: 'auto', borderRadius: '50%', objectFit: 'cover'}} src={user.profile_photo} alt=""></img>
                                </Col>
                                <Col size="4">
                                    <p>{`${user.name} ${user.surname}`}</p>
                                    <p style={{marginTop: '-15px'}}>{`@${user.username}`}</p>
                                </Col>
                                <Col size="4">
                                    <p>{user.university}</p>
                                    <p style={{marginTop: '-15px'}}>{user.department}</p>
                                </Col>
                            </Row>
                        ))
                    }
                </MDBModalBody>
            </MDBModal>

            <MDBIcon onClick={() => toggle()} icon="users" /><span style={{marginLeft: '5px'}}>{props.post.cep_inf.user_Count}</span>
        </div>
    );
  
}

export default JoinedUsersModal;