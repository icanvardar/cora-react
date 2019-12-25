import React, {useState, Fragment, useEffect} from 'react';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBBtn as Btn} from 'mdbreact';
import classes from './ProfilePage.module.css';

const CredentialsMobile = (props) => {
    const [credentials, setCredentials] = useState({...props.credentials});
    const [param, setParam] = useState(props.param);

    useEffect(() => {
        const {...credentials} = props.credentials;
        setCredentials(credentials);
    }, [props.credentials])

    return (
        <Fragment>
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
                        
                        {param === "me" &&
                            <Row center>
                                <Col>
                                    <Btn onClick={props.editProfile} color="white" size="sm" type="submit" style={{textTransform: 'none', width: '100%', fontWeight: 'bold'}}>Profili Düzenle</Btn>
                                </Col>
                            </Row>
                        }
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default CredentialsMobile;