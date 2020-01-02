// This PostDraft is for post which is in HomeTab or Profile Page...

import React, {useEffect, useState, useContext, Fragment} from 'react';
import {MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBIcon} from 'mdbreact';

import classes from './PostDraft.module.css';
import mobileClasses from './PostDraftMobile.module.css';

import {Link} from 'react-router-dom';

import JoinedUsersModal from '../Modal/JoinedUsersModal';

import {isIt, deleteLike} from '../../utils/apiRequests/connectionUser/like';

import Context from '../../utils/Context';

const PostDraft = (props) => {
    const {token, username} = useContext(Context);
    const [credentials, setCredentials] = useState({...props.credentials});
    const [post, setPost] = useState({...props.post});
    const [color, setColor] = useState('');
    const [likeCount, setLikeCount] = useState(post.like_count);

    useEffect(() => {
        isLiked(post._id);
    }, [])

    const isLiked = (ucAlldata_id) => {
        isIt(token, {ucAlldata_id},
            (res) => {
                if (res.data === true) {
                    setColor('red');
                } else {
                    setColor('white');
                }
            },
            (err) => {
                console.log(err);
            })
    }

    const likeSupervisor = (color) => {
        if (color === 'red') {
            setColor('white');
            setLikeCount(likeCount - 1);
        } else {
            setColor('red');
            setLikeCount(likeCount + 1);
        }
    }

    return (
        <Fragment>
            <Col className="d-none d-md-block mt-2" size="6">
                <Card className={classes.cardcontainer} style={{backgroundColor: '#151515'}}>
                    <CardBody>
                        <Row className={classes.cardheader}>
                            <Col xs="1" className={classes.cardheaderphotodiv}><a href={`/profile/${props.credentials ? credentials.username : post.user_id.username}`}><img className={classes.cardheaderphoto} src={props.credentials ? credentials.profile_photo : post.user_id.profile_photo} alt=""/></a></Col>
                            <Col xs="3" className={classes.cardheaderusername}><a href={`/profile/${props.credentials ? credentials.username : post.user_id.username}`}><p>{`@${props.credentials ? credentials.username : post.user_id.username}`}</p></a></Col>
                            <Col xs="4" className={classes.cardheaderdate}><p>{post.cep_inf.date}</p></Col>
                        </Row>
                        <hr />


                        <Link to={{
                            pathname: `/post/${post._id}`,
                            state: {
                                post
                            }
                        }}>
                            <Row center>
                                <Col xs="4" className={classes.cardbodyphotodiv}>
                                    <img className={classes.cardbodyphoto} src={post.cep_inf.event_photo || post.cep_inf.party_photo || post.cep_inf.musician_photo} alt=""/>
                                </Col>
                            </Row>
                            <Row center>
                                <Col xs="6" className={classes.cardbodyinfodiv}>
                                    <h5 className={classes.cardbodycepname}>{post.cep_inf.name}</h5>
                                    <p>{post.cep_inf.location}</p>
                                    <p className={classes.cardbodycepdate}>{post.cep_inf.date}</p>
                                </Col>
                            </Row>
                        </Link>
                        
                        <hr className={classes.cardhr}/>
                        
                        <Row between className={classes.cardbottomdiv}>
                            <Col size="2"><JoinedUsersModal post={post}/></Col>
                            <Col onClick={() => props.comment()} size="2"><MDBIcon icon="comment" /><span className={classes.cardbottombutton}>{post.comment_count}</span></Col>
                            <Col onClick={async () => {
                                if (credentials) {
                                    props.like(post._id, credentials.username, post.user_id, post.tur)
                                    likeSupervisor(color);
                                } else {
                                    props.like(post._id, post.user_id.username, post.user_id, post.tur)
                                    likeSupervisor(color);
                                }
                            }} size="2"><MDBIcon style={{color: color}} icon="heart" /><span className={classes.cardbottombutton}>{likeCount}</span></Col>
                        </Row>
                    </CardBody> 
                </Card>
            </Col>

            <Col className="d-md-none" size="12">
                <Card className={mobileClasses.cardcontainer} style={{backgroundColor: '#151515'}}>
                    <CardBody>
                        <Row className={mobileClasses.cardheader}>
                            <Col xs="1" className={mobileClasses.cardheaderphotodiv}><a href={`/profile/${props.credentials ? credentials.username : post.user_id.username}`}><img className={mobileClasses.cardheaderphoto} src={props.credentials ? credentials.profile_photo : post.user_id.profile_photo} alt=""/></a></Col>
                            <Col xs="3" className={mobileClasses.cardheaderusername}><a href={`/profile/${props.credentials ? credentials.username : post.user_id.username}`}><p>{`@${props.credentials ? credentials.username : post.user_id.username}`}</p></a></Col>
                            <Col xs="4" className={mobileClasses.cardheaderdate}><p>{post.cep_inf.date}</p></Col>
                        </Row>
                        <hr className={mobileClasses.cardhr}/>

                        <Link to={{
                            pathname: `/post/${post._id}`,
                            state: {
                                post
                            }
                        }}>
                            <Row>
                                <Col className={mobileClasses.cardbodydiv}>
                                    <img className={mobileClasses.cardbodyphoto} src={post.cep_inf.event_photo || post.cep_inf.party_photo || post.cep_inf.musician_photo} alt=""/>
                                    <h5 className={mobileClasses.cardbodycepname}>{post.cep_inf.name}</h5>
                                    <p>{post.cep_inf.location}</p>
                                    <p className={mobileClasses.cardbodycepdate}>{post.cep_inf.date}</p>
                                </Col>
                            </Row>
                        </Link>
                        
                        <div className={mobileClasses.cardbottomdiv}>
                            <div className={mobileClasses.cardbottombuttondiv} ><JoinedUsersModal post={post}/></div>
                            <div className={mobileClasses.cardbottombuttondiv} ><MDBIcon className={mobileClasses.cardbottombutton} onClick={() => props.comment()}icon="comment" />{post.comment_count}</div>
                            <div><MDBIcon style={{color: color}} className={mobileClasses.cardbottombutton} onClick={() => {
                                if (credentials) {
                                    props.like(post._id, credentials.username, post.user_id, post.tur)
                                    likeSupervisor(color);
                                } else {
                                    props.like(post._id, post.user_id.username, post.user_id._id, post.tur)
                                    likeSupervisor(color);
                                }
                            }} icon="heart" />{likeCount}</div>
                        </div>

                    </CardBody> 
                </Card>
            </Col>
        </Fragment>
    )
}

export default PostDraft;