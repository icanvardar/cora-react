import React, { useState, useEffect, useContext, Fragment} from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBRow as Row, MDBCol as Col, MDBIcon, MDBContainer as Container, MDBCard as Card, MDBCardBody as CardBody, MDBBtn as Btn } from 'mdbreact';

import {quitCEP, isJoinedCEP} from '../../utils/apiRequests/connectionUser/alldata';
import {joinCEP} from '../../utils/apiRequests/notification';

import Context from '../../utils/Context';

const EPPostPreviewModal = (props) => {
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
            joinCEP(token, {user_id: userId,
                            cep_id: post._id,
                            firebaseToken: "1",
                            notification_username: username,
                            ownpost_id: post.produced_id._id,
                            type_CEP: post.tur,
                            produced_id: post.produced_id._id,
                            ownpost_username: post.produced_id.username},
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
                    <Col xs="3" onClick={() => toggle()} style={{marginRight: '20px', cursor: 'pointer'}}>
                        <MDBIcon icon="times" />
                    </Col>
                </Row>
                <Row style={{backgroundColor: '#151515', paddingRight: '20px', paddingLeft: '20px', paddingTop: '10px'}}>
                    <Fragment>
                        <Container className='page d-none d-md-block mt-2' style={{color: 'white'}}>
                            <Row>
                                <Col style={{textAlign: 'center'}}>
                                    <img style={{width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px'}} src={post.event_photo || post.party_photo} alt=""></img>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '20px'}}>
                                <Col>
                                    <h1>{post.name}</h1>
                                </Col>
                            </Row>
                            {
                                post.tur === "Party" &&
                                    <Row>
                                        <Col>
                                            <p>{`Yer: ${post.location}`}</p>
                                        </Col>
                                    </Row>
                            }
                            {
                                post.tur === "Event" &&
                                    <Row start style={{marginLeft: '5px'}}>
                                        <Col xs="2">
                                            <img style={{borderRadius: '50%', height: '50px', width: '50px', marginTop: '5px'}} src={post.university_photoUrl}></img>
                                        </Col>
                                        <Col xs="2" style={{fontSize:"15px", marginLeft: '10px'}}>
                                            <p style={{marginBottom: '-5px'}}>Yer:</p>
                                            <p style={{marginBottom: '-5px'}}>{post.university}</p>
                                            <p>{post.location}</p>
                                        </Col>
                                    </Row>
                            } 
                            <Row>
                                <Col> 
                                    <p style={{fontSize: '15px'}}>{`Açıklama: ${post.description}`}</p>
                                </Col>
                            </Row>
                            <Row start style={{marginLeft: '5px', marginBottom: '-15px'}}>
                                <Col xs="2" style={{marginRight: '5px'}}>
                                    <img style={{borderRadius: '50%', height: '25px', width: 'auto'}} src={post.produced_id.profile_photo}></img>
                                </Col>
                                <Col xs="2">
                                    <a href={`/profile/${post.produced_id.username}`}><p style={{fontSize: '13px'}}>{`@${post.produced_id.username}`}</p></a>
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
                                    <img style={{width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px'}} src={post.event_photo || post.party_photo} alt=""></img>
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
                            {
                                post.tur === "Event" &&
                                    <Row start style={{marginLeft: '5px'}}>
                                        <Col xs="2">
                                            <img style={{borderRadius: '50%', height: '40px', width: 'auto', marginTop: '5px'}} src={post.university_photoUrl}></img>
                                        </Col>
                                        <Col xs="2" style={{fontSize:"13px", marginLeft: '10px'}}>
                                            <p style={{marginBottom: '-5px'}}>Yer:</p>
                                            <p style={{marginBottom: '-5px'}}>{post.university}</p>
                                            <p>{post.location}</p>
                                        </Col>
                                    </Row>
                            } 
                            <Row>
                                <Col>
                                    <p>{`Açıklama: ${post.description}`}</p>
                                </Col>
                            </Row>
                            <Row start style={{marginLeft: '5px', marginBottom: '-15px'}}>
                                <Col xs="2" style={{marginRight: '5px'}}>
                                    <MDBIcon style={{color: 'gold', position: 'absolute', marginLeft: '3px', marginTop: '-10px'}} icon="crown" /><img style={{borderRadius: '50%', height: '25px', width: 'auto'}} src={post.produced_id.profile_photo}></img>
                                </Col>
                                <Col xs="2">
                                    <a href={`/profile/${post.produced_id.username}`}><p style={{fontSize: '13px'}}>{`@${post.produced_id.username}`}</p></a>
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

export default EPPostPreviewModal;