import React, {useState, useContext, useEffect, Fragment} from 'react';

import {MDBRow as Row, MDBCol as Col, MDBContainer as Container, MDBCard as Card, MDBCardBody as CardBody, MDBIcon} from 'mdbreact';

import JoinedUsersModal from '../Modal/JoinedUsersModal';
import ConcertPostPreviewModal from '../Modal/ConcertPostPreviewModal';

const ConcertPostDraft = (props) => {
    const [post, setPost] = useState({...props.post});
    const [isOpen, setIsOpen] = useState(false);
    const [usersOpen, setUsersOpen] = useState(false);
    const [userCount, setUserCount] =  useState(post.user_Count);

    useEffect(() => {
        console.log(post);
    }, [post])

    // Fixes double click problem
    useEffect(() => {
        if (isOpen === true) {
            setIsOpen(false);
        }
    }, [isOpen])

    // Fixes double click problem
    useEffect(() => {
        if (usersOpen === true) {
            setUsersOpen(false);
        }
    }, [usersOpen])

    // It is for increasing or decreasing when post joining session
    const checkJoin = (isJoined) => {
        if (isJoined) {
            setUserCount(userCount + 1);
        } else if (!isJoined) {
            setUserCount(userCount - 1);
        }
    }

    return (
        <Fragment>
            <Col className="d-none d-md-block mt-2" size="6" >
                <Card style={{backgroundColor: '#151515', color: 'white', height: '150px', width: 'auto', marginBottom: '10px', textAlign: 'center'}}>
                    <CardBody>
                        <a onClick={() => setIsOpen(true)} z>    
                            <Row style={{fontSize: '14px', marginLeft: '10px'}}>
                                <Col md="2">
                                    <img style={{borderRadius: '50%', height: '60px', width: '60px', objectFit: 'cover'}} src={post.musician_photo} alt=""></img>
                                </Col>
                                <Col md="3">
                                    <p style={{fontWeight: 'bold'}}>{post.name}</p>
                                </Col>
                                <Col md="3">
                                    <p>{`${post.date}\n${post.time}`}</p>
                                </Col>
                                <Col md="3">
                                    <p>{post.location_name}</p>
                                </Col>
                            </Row>
                        </a>
                        <hr/>
                        <Row center>
                            <Col size="4">
                                <MDBIcon icon="map-marker-alt" />
                            </Col>
                            <Col size="4">
                                <MDBIcon style={{marginRight: '10px'}} onClick={() => setUsersOpen(!usersOpen)} far icon="user" />{userCount}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>

            <Col className="d-md-none" size="12" >
                <Card style={{backgroundColor: '#151515', color: 'white', height: '300px', width: 'auto', marginBottom: '10px', textAlign: 'center'}}>
                    <CardBody>
                        <a onClick={() => setIsOpen(true)} >
                            <Row style={{fontSize: '14px', marginLeft: '10px'}}>
                                <Col md="2">
                                    <img style={{borderRadius: '50%', height: '90px', width: '90px', objectFit: 'cover'}} src={post.musician_photo} alt=""></img>
                                </Col>
                                <Col md="3">
                                    <p style={{fontWeight: 'bold', marginTop: '10px'}}>{post.name}</p>
                                </Col>
                                <Col md="3">
                                    <p>{`${post.date}\n${post.time}`}</p>
                                </Col>
                                <Col md="3">
                                    <p>{post.location_name}</p>
                                </Col>
                            </Row>
                        </a>
                        <hr/>
                        <Row center>
                            <Col size="4">
                                <MDBIcon icon="map-marker-alt" />
                            </Col>
                            <Col size="4">
                                <MDBIcon style={{marginRight: '10px'}} onClick={() => setUsersOpen(!usersOpen)} far icon="user" />{userCount}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>

            <ConcertPostPreviewModal isOpen={isOpen} post={post} checkJoin={checkJoin}/>
            <JoinedUsersModal isOpen={usersOpen} id={post._id}/>
        </Fragment>
    )
}

export default ConcertPostDraft;