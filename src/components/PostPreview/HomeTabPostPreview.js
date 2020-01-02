import React, {useState, useEffect, useContext, Fragment} from 'react';

import Context from '../../utils/Context';

import {MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBBtn as Btn} from 'mdbreact';

import {history} from '../../App';

const HomeTabPostPreview = (props) => {
    const {token} = useContext(Context);
    const [post, setPost] = useState({...props.post});

    const [joinButton, setJoinButton] = useState('+');
    const [isJoined, setIsJoined] = useState(false);
    const [joinedUsers, setJoinedUsers] = useState(post.cep_inf ? post.cep_inf.user_Count : post.user_Count);

    useEffect(() => {
        console.log(post);
    }, [])

    const join = () => {
        console.log('You\'ve tried to join!');
        setIsJoined(!isJoined);
        if (isJoined) {
            setJoinedUsers(joinedUsers - 1);
            setJoinButton('+');
        } else {
            setJoinedUsers(joinedUsers + 1 );
            setJoinButton('x');
        }
    }

    return (
        <Fragment>
            <Container className='page d-none d-md-block mt-2' style={{color: 'white'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Card style={{backgroundColor: '#151515', marginTop: '20px', width: '60%'}}>
                        <CardBody>
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
                                    <Row style={{marginBottom: '-15px'}}>
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
                                    <p>{`Açıklama: ${post.cep_inf.description}`}</p>
                                </Col>
                            </Row>
                            <Row start style={{marginLeft: '5px', marginBottom: '-15px'}}>
                                <Col xs="2" style={{marginRight: '5px'}}>
                                    <img style={{borderRadius: '50%', height: '25px', width: 'auto'}} src={post.user_id.profile_photo}></img>
                                </Col>
                                <Col xs="2">
                                    <a href={`/profile/${post.user_id.username}`}><p>{`@${post.user_id.username}`}</p></a>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row style={{textAlign: 'center'}}>
                                <Col style={{marginTop: '10px'}}>
                                    <p style={{marginBottom: '-5px'}}>Tarih:</p>
                                    <p>{post.cep_inf.date}</p>
                                </Col>
                                <Col size="4">
                                    <Btn onClick={() => join()} color="white" size="sm" style={{borderRadius: '20px', fontWeight: 'bold', fontSize: '20px', textTransform: 'none'}}>{joinButton}</Btn>
                                    <p style={{fontSize: '12px'}}>{`${joinedUsers} kişi katıldı`}</p>
                                </Col>
                                <Col style={{marginTop: '10px'}}>
                                    <p style={{marginBottom: '-5px'}}>Saat:</p>
                                    <p>{post.cep_inf.time}</p>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </Container>

            <Container className='page d-md-none' style={{color: 'white'}}>
                <Card style={{backgroundColor: '#151515', marginTop: '20px'}}>
                    <CardBody>
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
                        <Row start style={{marginLeft: '5px', marginBottom: '-15px'}}>
                            <Col xs="2" style={{marginRight: '5px'}}>
                                <img style={{borderRadius: '50%', height: '25px', width: 'auto'}} src={post.user_id.profile_photo}></img>
                            </Col>
                            <Col xs="2">
                                <a href={`/profile/${post.user_id.username}`}><p style={{fontSize: '13px'}}>{`@${post.user_id.username}`}</p></a>
                            </Col>
                        </Row>
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
                    </CardBody>
                </Card>
            </Container>
        </Fragment>
    )
}

export default HomeTabPostPreview;