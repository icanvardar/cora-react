import React, {useEffect, useState} from 'react';
import {MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBIcon} from 'mdbreact';

import classes from './PostDraft.module.css';

import JoinedUsersModal from '../Modal/JoinedUsersModal';

const PostDraft = (props) => {
    const [credentials, setCredentials] = useState({...props.credentials});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(props.posts);
    }, [props.posts])

    return (
        <Row>
            { posts.map(post => 
                <Col key={post._id} size="6">
                    <Card className={classes.cardcontainer} style={{backgroundColor: '#151515'}}>
                        <CardBody>
                            <Row className={classes.cardheader}>
                                <Col xs="1" className={classes.cardheaderphotodiv}><img className={classes.cardheaderphoto} src={!credentials ? credentials.profile_photo : post.user_id.profile_photo} alt=""/></Col>
                                <Col xs="3" className={classes.cardheaderusername}><p>{`@${!credentials ? credentials.username : post.user_id.username}`}</p></Col>
                                <Col xs="4" className={classes.cardheaderdate}><p>{post.cep_inf.date}</p></Col>
                            </Row>
                            <hr />

                            <Row center>
                                <Col xs="4" className={classes.cardbodyphotodiv}>
                                    <img className={classes.cardbodyphoto} src={post.cep_inf.event_photo || post.cep_inf.party_photo || post.cep_inf.musician_photo} alt=""/>
                                </Col>
                                <Col xs="6" className={classes.cardbodyinfodiv}>
                                    <h5 className={classes.cardbodycepname}>{post.cep_inf.name}</h5>
                                    <p>{post.cep_inf.university}</p>
                                    <p className={classes.cardbodycepdate}>{post.cep_inf.date}</p>
                                </Col>
                            </Row>
                            <hr className={classes.cardhr}/>
                            
                            <Row between className={classes.cardbottomdiv}>
                                <Col size="2"><JoinedUsersModal post={post}/></Col>
                                <Col onClick={() => props.comment()} size="2"><MDBIcon icon="comment" /><span className={classes.cardbottombutton}>{post.cep_inf.like_count}</span></Col>
                                <Col onClick={() => props.like()} size="2"><MDBIcon icon="heart" /><span className={classes.cardbottombutton}>{post.cep_inf.comment_count}</span></Col>
                            </Row>

                        </CardBody> 
                    </Card>
                </Col>
            )}
        </Row>
    )
}

export default PostDraft;