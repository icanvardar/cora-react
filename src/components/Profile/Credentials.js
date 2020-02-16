import React, {useState, Fragment, useEffect, useContext} from 'react';
import { MDBRow as Row, MDBCol as Col, MDBBtn as Btn} from 'mdbreact';
import classes from './Credentials.module.css';

import Context from '../../utils/Context';

const Credentials = (props) => {
    const {username} = useContext(Context);
    const [credentials, setCredentials] = useState({});
    const [param, setParam] = useState(props.param);
    const [isFollowing, setIsFollowing] = useState();
    const [spinnerActive, setSpinnerActive] = useState();

    useEffect(() => {
        const {...credentials} = props.credentials;
        setCredentials(credentials);
    }, [props.credentials])

    useEffect(() => {
        setIsFollowing(props.isFollowing);
        setSpinnerActive(false);
    }, [props.isFollowing])

    return (
        <Fragment>
            {
                props.credentialsLoading ?
                <div style={{textAlign: 'center', marginTop: '20px', paddingBottom: '25px'}}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <Row center className={classes.credentials}>
                    <Col>
                        <img className={classes.profilephoto} src={`${credentials.profile_photo}`} alt=""></img>
                        <div>
                            <Row center className={classes.leftsidecredentials}>
                                <Col size="2" className={classes.universityphotodiv}><img className={classes.universityphoto} src={`${credentials.university_photoUrl}`} alt=""></img></Col>
                                <Col size="5">
                                    <p>{credentials.university}</p>
                                    <p className={classes.department}>{credentials.department}</p>
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

                            {param === "me" || param === username ?
                                <Row center>
                                    <Col>
                                        <Btn onClick={() => props.editProfile()} color="white" type="submit" style={{textTransform: 'none', fontWeight: 'bold'}}>Profili Düzenle</Btn>
                                    </Col>
                                </Row>
                                :
                                <Row center>
                                    <Col>
                                        <Btn onClick={() => {
                                            if (!isFollowing) {
                                                props.follow(credentials._id, username);
                                                setSpinnerActive(true);
                                            } else if (isFollowing) {
                                                props.unfollow(credentials._id, username);
                                                setSpinnerActive(true);
                                            }
                                        }} color="white" type="submit" style={{textTransform: 'none', fontWeight: 'bold'}}>
                                        {
                                            spinnerActive ? 
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            :
                                            isFollowing ? 'Takipten Çık': 'Takip Et'
                                        }
                                        </Btn>
                                    </Col>
                                </Row>
                            }

                        </div>
                    </Col>
                </Row>
            }
        </Fragment>
    )
    
}

export default Credentials