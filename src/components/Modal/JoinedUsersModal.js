import React, { useState, useEffect, useContext, Fragment } from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBRow as Row, MDBCol as Col, MDBIcon } from 'mdbreact';

import {getUsers} from '../../utils/apiRequests/connectionUser/alldata';

import Context from '../../utils/Context';

const JoinedUsersModal = (props) => {
    const {token} = useContext(Context);
    const [modal, setModal] = useState(props.isOpen);
    const [users, setUsers] = useState([]);

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (props.isOpen === true) {
            setModal(props.isOpen);
        }
    }, [props.isOpen])

    useEffect(() => {
        const cep_id = props.id;
        if (modal === true) {
            getUsers(token, {paginationNumber: "0", cep_id},
                (res) => {
                    if (res.data.length === 0) {
                        return setMessage('Henüz katılımcı bulunmamaktadır.');
                    }
                    setUsers(res.data);
                },
                (err) => {
                    console.log(err);
                }
            )
        }
    }, [modal])

    const toggle = () => {
        setModal(!modal);
    }

  return (
        <Fragment>
            {
                message ? 
                    <div>
                        <MDBModal isOpen={modal} toggle={() => toggle()} centered>
                        <MDBModalHeader style={{backgroundColor: '#151515', height: '60px', color: 'white'}} toggle={() => toggle()}>Katılan Kişiler</MDBModalHeader>
                            <MDBModalBody style={{backgroundColor: '#151515', fontSize:'10px', color: 'white'}}>
                                <p style={{fontSize:'15px'}}>{message}</p>
                            </MDBModalBody>
                        </MDBModal>
                    </div>
                :
                    <div>
                        <MDBModal isOpen={modal} toggle={() => toggle()} centered>
                        <MDBModalHeader style={{backgroundColor: '#151515', height: '60px', color: 'white'}} toggle={() => toggle()}>Katılan Kişiler</MDBModalHeader>
                            <MDBModalBody style={{backgroundColor: '#151515', fontSize:'10px', color: 'white'}}>
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
                    </div>
            }
        </Fragment>


    );
  
}

export default JoinedUsersModal;