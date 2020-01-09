import React, {useState, Fragment, useEffect, useContext} from 'react';
import { MDBRow as Row, MDBCol as Col, MDBBtn as Btn} from 'mdbreact';
import classes from './CredentialsMobile.module.css';

import Context from '../../utils/Context';

const CredentialsMobile = (props) => {
    const {username} = useContext(Context);
    const [credentials, setCredentials] = useState({...props.credentials});
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
                        <img className={classes.profilephotomobile} src={`${credentials.profile_photo}`} alt=""></img>
                        <div>
                            <Row center className={classes.leftsidecredentials}>
                                <Col size="2"><img className={classes.universityphotomobile} src={`${credentials.university_photoUrl}`} alt=""></img></Col>
                                <Col size="10">
                                    <p>{credentials.university}</p>
                                    <p className={classes.department}>{credentials.department}</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col>
                        <h5>{credentials.name + " " + credentials.surname}</h5>
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
                            
                            {param === "me" || param === username ?
                                <Row center>
                                    <Col>
                                        <Btn onClick={() => props.editProfile()} color="white" size="sm" type="submit" style={{textTransform: 'none', width: '100%', fontWeight: 'bold'}}>Profili Düzenle</Btn>
                                    </Col>
                                </Row>
                                :
                                <Row center>
                                    <Col>
                                        <Btn onClick={() => {
                                            if (!isFollowing) {
                                                props.follow(credentials._id, credentials.username);
                                                setSpinnerActive(true);
                                            } else if (isFollowing) {
                                                props.unfollow(credentials._id, credentials.username);
                                                setSpinnerActive(true);
                                            }
                                        }} color="white" size="sm" type="submit" style={{textTransform: 'none', width: '100%', fontWeight: 'bold'}}>
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

export default CredentialsMobile;