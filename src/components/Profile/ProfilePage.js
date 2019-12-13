import React, {useEffect, useContext, useState} from 'react';
import { withCookies } from 'react-cookie';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBBtn as Btn} from 'mdbreact';
import {findUser} from '../../utils/apiRequests/userwithtoken';
import Context from '../../utils/Context';
import classes from './ProfilePage.module.css';

const ProfilePage = (props) => {
    const {token} = useContext(Context);
    const username = props.cookies.cookies.username;
    const [credentials, setCredentials] = useState({});

    useEffect(() => {
        findUser(token, {username},
            (res) => {
                const {...data} = res.data[0];
                setCredentials(data);
            },
            (err) => {
                console.log(err);
            }
        );
    }, [])

    useEffect(() => {
        console.log(credentials)
    }, [credentials])

    return (
        <Container style={{paddingTop: '30px'}}>
            <Row center className={classes.credentials}>
                <Col>
                    <img className={classes.profilephoto} src={`${credentials.profile_photo}`}></img>
                    <div className="d-lg-none">
                        <Row center style={{marginTop: '20px', fontSize: '14px'}}>
                            <Col size="2"><img className={classes.universityphoto} src={`${credentials.university_photoUrl}`}></img></Col>
                            <Col size="6">
                                <p style={{marginTop: '10px'}}>{credentials.university}</p>
                                <p style={{marginTop: '-20px'}}>{credentials.department}</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="d-none d-lg-block">
                        <Row center style={{marginTop: '20px', fontSize: '14px'}}>
                            <Col size="2" style={{marginLeft: '50px',marginRight: '-75px'}}><img className={classes.universityphoto} src={`${credentials.university_photoUrl}`}></img></Col>
                            <Col size="6">
                                <p style={{marginTop: '10px'}}>{credentials.university}</p>
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
                                <Btn color="white" type="submit" style={{textTransform: 'none'}}>Profili Düzenle</Btn>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <hr style={{backgroundColor: 'white'}}/>
        </Container>
    )
}

export default withCookies(ProfilePage);