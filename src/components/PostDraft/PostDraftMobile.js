import React, {useEffect, useState} from 'react';
import {MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBIcon} from 'mdbreact';

import classes from './PostDraftMobile.module.css';

import JoinedUsersModal from '../Modal/JoinedUsersModal';

const PostDraftMobile = (props) => {
    const [credentials, setCredentials] = useState({...props.credentials});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(props.posts);
    }, [props.posts])

    return (
        <div>
            {posts.map(post => 
                <Row key={post._id} className={classes.container}>
                    <Col>
                        <Card className={classes.cardcontainer} style={{backgroundColor: '#151515'}}>
                            <CardBody>
                                <Row className={classes.cardheader}>
                                    <Col xs="1" className={classes.cardheaderphotodiv}><img className={classes.cardheaderphoto} src={!credentials ? credentials.profile_photo : post.user_id.profile_photo} alt=""/></Col>
                                    <Col xs="3" className={classes.cardheaderusername}><p>{`@${!credentials ? credentials.username : post.user_id.username}`}</p></Col>
                                    <Col xs="4" className={classes.cardheaderdate}><p>{post.cep_inf.date}</p></Col>
                                </Row>
                                <hr className={classes.cardhr}/>

                                
                                <Row>
                                    <Col className={classes.cardbodydiv}>
                                        <img className={classes.cardbodyphoto} src={post.cep_inf.event_photo || post.cep_inf.party_photo || post.cep_inf.musician_photo} alt=""/>
                                        <h5 className={classes.cardbodycepname}>{post.cep_inf.name}</h5>
                                        <p>{post.cep_inf.university}</p>
                                        <p className={classes.cardbodycepdate}>{post.cep_inf.date}</p>
                                    </Col>
                                </Row>
                                
                                <div className={classes.cardbottomdiv}>
                                    <div className={classes.cardbottombuttondiv} ><JoinedUsersModal post={post}/></div>
                                    <div className={classes.cardbottombuttondiv} ><MDBIcon className={classes.cardbottombutton} onClick={() => props.comment()}icon="comment" />{post.cep_inf.like_count}</div>
                                    <div><MDBIcon className={classes.cardbottombutton} onClick={() => props.like()} icon="heart" />{post.cep_inf.comment_count}</div>
                                </div>

                            </CardBody> 
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default PostDraftMobile;