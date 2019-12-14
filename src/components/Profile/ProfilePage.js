import React, {useEffect, useContext, useState} from 'react';
import { withCookies } from 'react-cookie';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBBtn as Btn} from 'mdbreact';
import {userInfToken} from '../../utils/apiRequests/userwithtoken';
import {getUserData} from '../../utils/apiRequests/connectionUser/alldata';
import Context from '../../utils/Context';
import classes from './ProfilePage.module.css';

const ProfilePage = (props) => {
    const {token} = useContext(Context);
    const [credentials, setCredentials] = useState({});

    useEffect(() => {
        userInfToken(token,
            (res) => {
                const {...data} = res.data;
                setCredentials(data);
                console.log(res.data)
                console.log(token)
            },
            (err) => {
                console.log(err);
            }
        );

        getUserData(token, {user_id: '5dea7ce12874672658eb82a9', paginationNumber: "0"},
            (res) => {
                console.log(res);
            },
            (err) => {
                console.log(err);
            }
        )
    }, [])

    useEffect(() => {
    }, [credentials])

    return (
        <Container style={{paddingTop: '30px'}}>
            <div className="d-none d-lg-block">
                <Row center className={classes.credentials}>
                    <Col>
                        <img className={classes.profilephoto} src={`${credentials.profile_photo}`}></img>
                        <div>
                            <Row center style={{marginTop: '20px', fontSize: '14px'}}>
                                <Col size="2" style={{marginLeft: '50px',marginRight: '-75px'}}><img className={classes.universityphoto} src={`${credentials.university_photoUrl}`}></img></Col>
                                <Col size="5">
                                    <p>{credentials.university}</p>
                                    <p style={{marginTop: '-20px'}}>{credentials.department}</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col>
                        <h2>{credentials.name + " " + credentials.surname}</h2>
                        <div className={classes.userinfo}>
                            <Row center>
                                <Col>
                                    <p>Konser</p>
                                    <p className={classes.fixedtext}>{credentials.concert_Count}</p>
                                </Col>
                                <Col>
                                    <p>Etkinlik</p>
                                    <p className={classes.fixedtext}>{credentials.event_Count}</p>
                                </Col>
                                <Col>
                                    <p>Parti</p>
                                    <p className={classes.fixedtext}>{credentials.party_Count}</p>
                                </Col>
                            </Row>
                            <Row center>
                                <Col>
                                    <p>Takipçi</p>
                                    <p className={classes.fixedtext}>{credentials.follower_Count}</p>
                                </Col>
                                <Col>
                                    <p>Takip</p>
                                    <p className={classes.fixedtext}>{credentials.following_Count}</p>
                                </Col>
                            </Row>
                            <Row center>
                                <Col>
                                    <Btn color="white" type="submit" style={{textTransform: 'none', fontWeight: 'bold'}}>Profili Düzenle</Btn>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="d-lg-none">
                <Row center className={classes.credentials}>
                    <Col>
                        <img className={classes.profilephotomobile} src={`${credentials.profile_photo}`}></img>
                        <div>
                            <Row center style={{marginTop: '20px', fontSize: '13px'}}>
                                <Col size="2"><img className={classes.universityphotomobile} src={`${credentials.university_photoUrl}`}></img></Col>
                                <Col size="10">
                                    <p>{credentials.university}</p>
                                    <p style={{marginTop: '-20px'}}>{credentials.department}</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col>
                        <h4>{credentials.name + " " + credentials.surname}</h4>
                        <div className={classes.userinfo}>
                            <Row center>
                                <Col size="4">
                                    <p>Konser</p>
                                    <p className={classes.fixedtext}>{credentials.concert_Count}</p>
                                </Col>
                                <Col size="4">
                                    <p>Etkinlik</p>
                                    <p className={classes.fixedtext}>{credentials.event_Count}</p>
                                </Col>
                                <Col size="4">
                                    <p>Parti</p>
                                    <p className={classes.fixedtext}>{credentials.party_Count}</p>
                                </Col>
                            </Row>
                            <Row center>
                                <Col size="4">
                                    <p>Takipçi</p>
                                    <p className={classes.fixedtext}>{credentials.follower_Count}</p>
                                </Col>
                                <Col size="4">
                                    <p>Takip</p>
                                    <p className={classes.fixedtext}>{credentials.following_Count}</p>
                                </Col>
                            </Row>
                            <Row center>
                                <Col>
                                    <Btn color="white" size="sm" type="submit" style={{textTransform: 'none', width: '100%', fontWeight: 'bold'}}>Profili Düzenle</Btn>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
            <hr style={{backgroundColor: 'white'}}/>
        </Container>
    )
}

export default withCookies(ProfilePage);