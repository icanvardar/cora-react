import React, {useState, Fragment, useEffect} from 'react';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBBtn as Btn} from 'mdbreact';
import classes from './ProfilePage.module.css';

const Credentials = (props) => {
    const [credentials, setCredentials] = useState({});
    const [param, setParam] = useState(props.param);

    useEffect(() => {
        const {...credentials} = props.credentials;
        setCredentials(credentials);
    }, [props.credentials])

    return (
        <Fragment>
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

                        {param === "me" &&
                            <Row center>
                                <Col>
                                    <Btn onClick={props.editProfile} color="white" type="submit" style={{textTransform: 'none', fontWeight: 'bold'}}>Profili Düzenle</Btn>
                                </Col>
                            </Row>
                        }

                    </div>
                </Col>
            </Row>
        </Fragment>
    )
    
}

export default Credentials