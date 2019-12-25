import React, {useEffect, useState, useContext, Fragment} from 'react';
import Context from '../../utils/Context';

import {MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBCardTitle as CardTitle, MDBCardText as CardText, MDBBtn as Btn, MDBIcon} from 'mdbreact';
import {getUserData} from '../../utils/apiRequests/connectionUser/alldata';

import classes from './UserPost.module.css';

const UserPosts = (props) => {
    const {token} = useContext(Context);
    const [credentials, setCredentials] = useState({...props.credentials});
    const [posts, setPosts] = useState([]);
    const [param, setParam] = useState(props.param);

    useEffect(() => {
        const {...credentials} = props.credentials;
        setCredentials(credentials);
        // console.log(credentials);
    }, [props.credentials])

    useEffect(() => {
        setPosts(props.posts)
    }, [props.posts])

    return (
        <Fragment>
            <div>
            <Row style={{marginTop: '20px'}}>
            { posts.map(post => 
                <Col key={post.cep_inf._id}  size="6">
                    <Card style={{backgroundColor: '#151515', height: '330px', width: 'auto', marginBottom: '25px'}}>
                        <CardBody>
                            <Row style={{color: 'white',fontSize: '12px', marginBottom: '-20px'}}>
                                <Col xs="1" style={{marginLeft: '20px'}}><img style={{width: '30px', height: 'auto', borderRadius: '50%'}} src={credentials.profile_photo}/></Col>
                                <Col xs="3" style={{marginTop: '4px',marginLeft: '5px', marginRight: '10px'}}><p>{`@${credentials.username}`}</p></Col>
                                <Col xs="4" style={{marginTop: '4px'}}><p>{post.cep_inf.date}</p></Col>
                            </Row>
                            <hr style={{backgroundColor: 'grey'}}/>

                           
                            <Row center>
                                <Col xs="4" style={{textAlign: 'center'}}>
                                    <img style={{width: '93%', height: '100px', objectFit: 'cover'}} src={post.cep_inf.event_photo || post.cep_inf.party_photo || post.cep_inf.musician_photo}/>
                                </Col>
                                <Col xs="6" style={{color: 'white', wordWrap: 'break-word', textAlign: 'center', marginTop: '10px', marginBottom: '-15px'}}>
                                    <h5 style={{color: '#6A86F4'}}>{post.cep_inf.name}</h5>
                                    <p>{post.cep_inf.university}</p>
                                    <p style={{marginTop: '-15px'}}>{post.cep_inf.date}</p>
                                </Col>
                            </Row>
                            <hr style={{backgroundColor: 'grey'}}/>
                            
                            <Row between style={{textAlign: 'center', color: 'white'}}>
                                <Col onClick={() => props.joinedUsers(post.cep_id)} size="2"><MDBIcon icon="users" /><span style={{marginLeft: '5px'}}>{post.cep_inf.user_Count}</span></Col>
                                <Col onClick={() => props.comment()} size="2"><MDBIcon icon="comment" /><span style={{marginLeft: '5px'}}>{post.cep_inf.like_count}</span></Col>
                                <Col onClick={() => props.like(post.cep_id)} size="2"><MDBIcon icon="heart" /><span style={{marginLeft: '5px'}}>{post.cep_inf.comment_count}</span></Col>
                            </Row>

                        </CardBody> 
                    </Card>
                </Col>
                )}
            </Row>
            </div>

        </Fragment>
    )
}

export default UserPosts;