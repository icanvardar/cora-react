import React, { useState, useEffect, useContext, Fragment} from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBRow as Row, MDBCol as Col, MDBIcon, MDBContainer as Container, MDBCard as Card, MDBCardBody as CardBody, MDBBtn as Btn } from 'mdbreact';

import {quitCEP, isJoinedCEP} from '../../utils/apiRequests/connectionUser/alldata';
import {joinCEP} from '../../utils/apiRequests/notification';

import {joinConcert} from '../../utils/apiRequests/concert';

import Context from '../../utils/Context';

const ConcertPostPreviewModal = (props) => {
    const {token, userId, username} = useContext(Context);
    const [modal, setModal] = useState(props.isOpen);
    const [post, setPost] = useState({...props.post});

    const [joinButton, setJoinButton] = useState('+');
    const [isJoined, setIsJoined] = useState();
    const [joinedUsers, setJoinedUsers] = useState(post.user_Count);

    useEffect(() => {
        if (props.isOpen === true) {
            setModal(props.isOpen);
        }
    }, [props.isOpen])

    useEffect(() => {
        if (modal === true) {
            isJoinedCEP(token, {cep_id: post._id},
                (res) => {
                    if (res.data === true) {
                        setJoinButton('x');
                        setIsJoined(res.data);
                    } else if (res.data === false ) {
                        setJoinButton('+');
                        setIsJoined(res.data);
                    }
                },
                (err) => {
                    console.log(err);
                })
        }
    }, [modal])

    const join = () => {
        if (isJoined === false) {
            joinConcert(token, {concert_id: post._id,},
                (res) => {
                    console.log(res.data);
                    setJoinButton('x');
                    setIsJoined(true);
                    setJoinedUsers(joinedUsers + 1);
                    props.checkJoin(true);
                },
                (err) => {
                    console.log(err);
                })
        } else if (isJoined === true) {
            quitCEP(token, {cep_id: post._id}, 
                (res) => {
                    console.log(res.data);
                    setJoinButton('+');
                    setIsJoined(false);
                    setJoinedUsers(joinedUsers - 1);
                    props.checkJoin(false);
                },
                (err) => {
                    console.log(err);
                })
        }
    }
    
    const toggle = () => {
        setModal(!modal);
    }

  return (
        <div style={{wordWrap: 'break-word'}}>
            <MDBModal centered isOpen={modal} toggle={() => toggle()}>
                <Row between style={{backgroundColor: '#151515', color: 'white', paddingTop: '10px', paddingRight: '20px', paddingLeft: '20px'}}>
                    <Col xs="5" style={{marginLeft: '20px'}}>
                        {post.name}
                    </Col>
                    <Col xs="3" onClick={() => toggle()} style={{marginRight: '20px'}}>
                        <MDBIcon icon="times" />
                    </Col>
                </Row>
                <Row style={{backgroundColor: '#151515', paddingRight: '20px', paddingLeft: '20px', paddingTop: '10px'}}>
                    <Fragment>
                        <Container className='page d-none d-md-block mt-2' style={{color: 'white'}}>
                            <Row>
                                <Col style={{textAlign: 'center'}}>
                                    <img style={{width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px'}} src={post.musician_photo} alt=""></img>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '20px'}}>
                                <Col>
                                    <h1>{post.name}</h1>
                                </Col>
                            </Row>
                            {
                                post.tur === "Party" &&
                                    <Row style={{marginBottom: '-15px', fontSize: '15px'}}>
                                        <Col>
                                            <p>{`Yer: ${post.location}`}</p>
                                        </Col>
                                    </Row>
                            }
                            <Row>
                                <Col> 
                                    <p style={{fontSize: '15px'}}>{`Açıklama: ${post.description}`}</p>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row style={{textAlign: 'center'}}>
                                <Col style={{marginTop: '10px', fontSize: '15px'}}>
                                    <p style={{marginBottom: '-5px'}}>Tarih:</p>
                                    <p>{post.date}</p>
                                </Col>
                                <Col size="4">
                                    <Btn onClick={() => join()} color="white" size="sm" style={{borderRadius: '20px', fontWeight: 'bold', fontSize: '20px', textTransform: 'none'}}>{joinButton}</Btn>
                                    <p style={{fontSize: '12px'}}>{`${joinedUsers} kişi katıldı`}</p>
                                </Col>
                                <Col style={{marginTop: '10px', fontSize: '15px'}}>
                                    <p style={{marginBottom: '-5px'}}>Saat:</p>
                                    <p>{post.time}</p>
                                </Col>
                            </Row>
                        </Container>
            
                        <Container className='page d-md-none' style={{color: 'white'}}>
                            <Row>
                                <Col>
                                    <img style={{width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px'}} src={post.musician_photo} alt=""></img>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '20px'}}>
                                <Col>
                                    <h1 style={{fontSize: '25px'}}>{post.name}</h1>
                                </Col>
                            </Row>
                            {
                                post.tur === "Party" &&
                                    <Row style={{marginBottom: '-5px'}}>
                                        <Col>
                                            <p>{`Yer: ${post.location}`}</p>
                                        </Col>
                                    </Row>
                            }
                            <Row>
                                <Col>
                                    <p>{`Açıklama: ${post.description}`}</p>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row style={{textAlign: 'center'}}>
                                <Col style={{fontSize: '15px', marginTop: '10px'}}>
                                    <p style={{marginBottom: '-5px'}}>Tarih:</p>
                                    <p>{post.date}</p>
                                </Col>
                                <Col size="4">
                                    <Btn onClick={() => join()} color="white" size="sm" style={{borderRadius: '20px', fontWeight: 'bold', fontSize: '20px', textTransform: 'none'}}>{joinButton}</Btn>
                                    <p style={{fontSize: '12px'}}>{`${joinedUsers} kişi katıldı`}</p>
                                </Col>
                                <Col style={{fontSize: '15px', marginTop: '10px'}}>
                                    <p style={{marginBottom: '-5px'}}>Saat:</p>
                                    <p>{post.time}</p>
                                </Col>
                            </Row>
                        </Container>
                    </Fragment>
                </Row>
            </MDBModal>
        </div>
    );
  
}

export default ConcertPostPreviewModal;