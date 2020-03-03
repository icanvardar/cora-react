import React, { useState, useEffect, Fragment } from 'react';
import { MDBCard as Card, MDBCardBody as CardBody, MDBBtn as Btn, MDBRow as Row, MDBCol as Col } from 'mdbreact';

const SideCredentials = (props) => {
    const [credentials, setCredentials] = useState({});
    const [top20Users, setTop20Users] = useState([]);
    
    useEffect(() => {
        props.credentials !== {} && setCredentials(props.credentials)
    }, [props.credentials])

    useEffect(() => {
        props.top20Users.length > 0 && setTop20Users(props.top20Users)
    }, [props.top20Users])

    return (
        <Fragment>
            <Card style={{ marginTop: '10px', backgroundColor: '#151515', borderRadius: '5px', color: 'white' }}>
                <CardBody>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <img style={{ width: 'inherit', width: '75px', height: '75px', marginRight: '10px', borderRadius: '50%', objectFit: 'cover' }} src={credentials.profile_photo}></img>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                            <p>@{credentials.username}</p>
                            <p style={{ marginTop: '-20px' }}>{`${credentials.name} ${credentials.surname}`}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Btn href='/profile/me' style={{ textTransform: 'none' }} size="sm" color="white">Profil</Btn>
                        <Btn href='/settings' style={{ textTransform: 'none' }} size="sm" color="white">Ayarlar</Btn>
                    </div>
                    <hr></hr>
                    <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '15px' }}>
                        <Row center>
                            <Col>
                                <p>Konser</p>
                                <p style={{ marginTop: '-15px' }}>{credentials.concert_Count}</p>
                            </Col>
                            <Col>
                                <p>Etkinlik</p>
                                <p style={{ marginTop: '-15px' }}>{credentials.event_Count}</p>
                            </Col>
                            <Col>
                                <p>Parti</p>
                                <p style={{ marginTop: '-15px' }}>{credentials.party_Count}</p>
                            </Col>
                        </Row>
                        <Row center style={{ marginTop: '-5px' }}>
                            <Col>
                                <p>Takipçi</p>
                                <p style={{ marginTop: '-15px' }}>{credentials.follower_Count}</p>
                            </Col>
                            <Col>
                                <p>Takip</p>
                                <p style={{ marginTop: '-15px' }}>{credentials.following_Count}</p>
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </Card>
            <Card style={{ marginTop: '10px', backgroundColor: '#151515', borderRadius: '5px', color: 'white', height: '300px' }}>
                <CardBody style={{ overflow: 'auto' }}>
                    <Row>
                        {top20Users.map(user => (
                            <a key={user._id} href={`/profile/${user.username}`}>
                                <Col
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        color: "white",
                                        marginTop: "5px",
                                        marginLeft: "5px"
                                    }}
                                >
                                    <div>
                                        <img
                                            style={{ width: "35px", height: "35px" }}
                                            src={user.profile_photo}
                                            alt=""
                                        ></img>
                                    </div>
                                    <div style={{ marginLeft: "20px" }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                fontSize: "14px"
                                            }}
                                        >
                                            <p>{user.name}</p>
                                            <p style={{ marginTop: "-20px" }}>@{user.username}</p>
                                        </div>
                                    </div>
                                </Col>
                            </a>
                        ))}
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default SideCredentials;