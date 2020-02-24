import React, { useState, useEffect, useContext, Fragment } from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBRow as Row, MDBCol as Col, MDBIcon, MDBContainer as Container, MDBCard as Card, MDBCardBody as CardBody, MDBBtn as Btn } from 'mdbreact';

import {quitCEP, isJoinedCEP} from '../../utils/apiRequests/connectionUser/alldata';
import {joinCEP} from '../../utils/apiRequests/notification';
import {findUser} from '../../utils/apiRequests/userwithtoken';

import Context from '../../utils/Context';

const GeneralPostPreviewModal = (props) => {
    const {token, userId, username} = useContext(Context);
    const [modal, setModal] = useState(props.isOpen);
    const [post, setPost] = useState({...props.post});

    const [joinButton, setJoinButton] = useState('+');
    const [isJoined, setIsJoined] = useState(false);
    const [joinedUsers, setJoinedUsers] = useState(post.cep_inf ? post.cep_inf.user_Count : post.user_Count);

    const [creatorPhoto, setCreatorPhoto] = useState('');

    useEffect(() => {
        if (props.isOpen === true) {
            setModal(props.isOpen);
        }
    }, [props.isOpen])

    useEffect(() => {
        // Concert post doesnt have creator pp then condition checks it
        if (post.cep_inf.tur !== 'Concert') {
            props.isOpen === true && 
            // To get the post creator's profile photo
            findUser(token, {username: post.cep_inf.produced_username},
                (res) => {
                    setCreatorPhoto(res.data[0].profile_photo);
                },
                (err) => {
                    console.log(err);
                })
        }
    }, [props.isOpen])

    useEffect(() => {
        if (modal === true) {
            isJoinedCEP(token, {cep_id: post.cep_id},
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
            joinCEP(token, {user_id: userId,
                            cep_id: post.cep_id,
                            firebaseToken: "0",
                            notification_username: username,
                            ownpost_id: post.cep_inf.produced_id,
                            type_CEP: post.tur,
                            produced_id: post.cep_inf.produced_id,
                            ownpost_username: post.cep_inf.username},
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
            quitCEP(token, {cep_id: post.cep_id}, 
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
            <MDBModal isOpen={modal} toggle={() => toggle()}>
                <Row between style={{backgroundColor: '#151515', color: 'white', paddingTop: '10px', paddingRight: '20px', paddingLeft: '20px'}}>
                    <Col xs="5" style={{marginLeft: '20px'}}>
                        {post.cep_inf.name}
                    </Col>
                    <Col xs="3" onClick={() => toggle()} style={{marginRight: '20px', cursor: 'pointer'}}>
                        <MDBIcon icon="times" />
                    </Col>
                </Row>
                <Row style={{backgroundColor: '#151515', paddingRight: '20px', paddingLeft: '20px', paddingTop: '10px'}}>
                    <Fragment>
                        <Container className='page d-none d-md-block mt-2' style={{color: 'white'}}>
                                <Row>
                                    <Col style={{textAlign: 'center'}}>
                                        <img style={{width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px'}} src={post.cep_inf.event_photo || post.cep_inf.party_photo || post.cep_inf.musician_photo} alt=""></img>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '20px'}}>
                                    <Col>
                                        <h1>{post.cep_inf.name}</h1>
                                    </Col>
                                </Row>
                                {
                                    post.tur === "Party" &&
                                        <Row style={{marginBottom: '-15px', fontSize: '15px'}}>
                                            <Col>
                                                <p>{`Yer: ${post.cep_inf.location}`}</p>
                                            </Col>
                                        </Row>
                                }
                                {
                                    post.tur === "Event" &&
                                        <Row start style={{marginLeft: '5px'}}>
                                            <Col xs="2">
                                                <img style={{borderRadius: '50%', height: '50px', width: '50px', marginTop: '5px'}} src={post.cep_inf.university_photoUrl}></img>
                                            </Col>
                                            <Col xs="2" style={{fontSize:"15px", marginLeft: '10px'}}>
                                                <p style={{marginBottom: '-5px'}}>Yer:</p>
                                                <p style={{marginBottom: '-5px'}}>{post.cep_inf.university}</p>
                                                <p>{post.cep_inf.location}</p>
                                            </Col>
                                        </Row>
                                } 
                                <Row>
                                    <Col> 
                                        <p style={{fontSize: '15px'}}>{`Açıklama: ${post.cep_inf.description}`}</p>
                                    </Col>
                                </Row>
                                {
                                    post.cep_inf.produced_username &&
                                    <Row start style={{marginLeft: '5px', marginBottom: '-15px'}}>
                                        <Col xs="2" style={{marginRight: '5px'}}>
                                            <img style={{borderRadius: '50%', height: '25px', width: 'auto'}} src={creatorPhoto}></img>
                                        </Col>
                                        <Col xs="2">
                                            <a href={`/profile/${post.cep_inf.produced_username}`}><p style={{fontSize: '13px'}}>{`@${post.cep_inf.produced_username}`}</p></a>
                                        </Col>
                                    </Row>
                                }
                                <hr></hr>
                                <Row style={{textAlign: 'center'}}>
                                    <Col style={{marginTop: '10px', fontSize: '15px'}}>
                                        <p style={{marginBottom: '-5px'}}>Tarih:</p>
                                        <p>{post.cep_inf.date}</p>
                                    </Col>
                                    <Col size="4">
                                        <Btn onClick={() => join()} color="white" size="sm" style={{borderRadius: '20px', fontWeight: 'bold', fontSize: '20px', textTransform: 'none'}}>{joinButton}</Btn>
                                        <p style={{fontSize: '12px'}}>{`${joinedUsers} kişi katıldı`}</p>
                                    </Col>
                                    <Col style={{marginTop: '10px', fontSize: '15px'}}>
                                        <p style={{marginBottom: '-5px'}}>Saat:</p>
                                        <p>{post.cep_inf.time}</p>
                                    </Col>
                                </Row>
                        </Container>
    
                        <Container className='page d-md-none' style={{color: 'white'}}>
                            <Row>
                                <Col>
                                    <img style={{width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px'}} src={post.cep_inf.event_photo || post.cep_inf.party_photo || post.cep_inf.musician_photo} alt=""></img>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '20px'}}>
                                <Col>
                                    <h1 style={{fontSize: '25px'}}>{post.cep_inf.name}</h1>
                                </Col>
                            </Row>
                            {
                                post.tur === "Party" &&
                                    <Row style={{marginBottom: '-5px'}}>
                                        <Col>
                                            <p>{`Yer: ${post.cep_inf.location}`}</p>
                                        </Col>
                                    </Row>
                            }
                            {
                                post.tur === "Event" &&
                                    <Row start style={{marginLeft: '5px'}}>
                                        <Col xs="2">
                                            <img style={{borderRadius: '50%', height: '40px', width: 'auto', marginTop: '5px'}} src={post.cep_inf.university_photoUrl}></img>
                                        </Col>
                                        <Col xs="2" style={{fontSize:"13px", marginLeft: '10px'}}>
                                            <p style={{marginBottom: '-5px'}}>Yer:</p>
                                            <p style={{marginBottom: '-5px'}}>{post.cep_inf.university}</p>
                                            <p>{post.cep_inf.location}</p>
                                        </Col>
                                    </Row>
                            } 
                            <Row>
                                <Col>
                                    <p>{`Açıklama: ${post.cep_inf.description}`}</p>
                                </Col>
                            </Row>
                            {
                                post.cep_inf.produced_username &&
                                <Row start style={{marginLeft: '5px', marginBottom: '-15px'}}>
                                    <Col xs="2" style={{marginRight: '5px'}}>
                                        <img style={{borderRadius: '50%', height: '25px', width: 'auto'}} src={creatorPhoto}></img>
                                    </Col>
                                    <Col xs="2">
                                        <a href={`/profile/${post.cep_inf.produced_username}`}><p style={{fontSize: '13px'}}>{`@${post.cep_inf.produced_username}`}</p></a>
                                    </Col>
                                </Row>
                            }
                            <hr></hr>
                            <Row style={{textAlign: 'center'}}>
                                <Col style={{fontSize: '15px', marginTop: '10px'}}>
                                    <p style={{marginBottom: '-5px'}}>Tarih:</p>
                                    <p>{post.cep_inf.date}</p>
                                </Col>
                                <Col size="4">
                                    <Btn onClick={() => join()} color="white" size="sm" style={{borderRadius: '20px', fontWeight: 'bold', fontSize: '20px', textTransform: 'none'}}>{joinButton}</Btn>
                                    <p style={{fontSize: '12px'}}>{`${joinedUsers} kişi katıldı`}</p>
                                </Col>
                                <Col style={{fontSize: '15px', marginTop: '10px'}}>
                                    <p style={{marginBottom: '-5px'}}>Saat:</p>
                                    <p>{post.cep_inf.time}</p>
                                </Col>
                            </Row>
                        </Container>
                    </Fragment>
                </Row>
            </MDBModal>
        </div>
    );
  
}

export default GeneralPostPreviewModal;