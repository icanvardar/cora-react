import React, {useEffect, useState, useContext, Fragment} from 'react';
import Context from '../../utils/Context';

import {MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBCardTitle as CardTitle, MDBCardText as CardText, MDBBtn as Btn, MDBIcon} from 'mdbreact';
import {getUserData} from '../../utils/apiRequests/connectionUser/alldata';

import classes from './UserPost.module.css';

const UserPostsMobile = (props) => {
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
                { posts.map(post => 
                <Row key={post.cep_inf._id} style={{marginTop: '20px'}}>
                
                    <Col>
                        <Card style={{backgroundColor: '#151515', height: '350px', width: 'auto'}}>
                            <CardBody>
                                <Row style={{color: 'white',fontSize: '12px', marginBottom: '-20px'}}>
                                    <Col xs="1" style={{marginLeft: '20px'}}><img style={{width: '30px', height: 'auto', borderRadius: '50%'}} src={credentials.profile_photo}/></Col>
                                    <Col xs="3" style={{marginTop: '4px',marginLeft: '5px', marginRight: '10px'}}><p>{`@${credentials.username}`}</p></Col>
                                    <Col xs="4" style={{marginTop: '4px'}}><p>{post.cep_inf.date}</p></Col>
                                </Row>
                                <hr style={{backgroundColor: 'grey'}}/>

                                
                                <Row>
                                    <Col style={{textAlign: 'center', color: 'white'}}>
                                        <img style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '20px'}} src={post.cep_inf.event_photo || post.cep_inf.party_photo || post.cep_inf.musician_photo}/>
                                        <h5 style={{color: '#6A86F4'}}>{post.cep_inf.name}</h5>
                                        <p>{post.cep_inf.university}</p>
                                        <p style={{marginTop: '-15px', fontSize: '10px'}}>{post.cep_inf.date}</p>
                                    </Col>
                                </Row>
                                
                                <div style={{color: 'white', padding: '10px', display: 'flex', position: 'absolute', bottom: '10px', justifyContent: 'space-between', width: '90%'}}>
                                    <div style={{marginRight: '-5px'}} ><MDBIcon style={{marginRight: '5px'}} onClick={() => props.joinedUsers(post.cep_id)} icon="users" />{post.cep_inf.user_Count}</div>
                                    <div style={{marginRight: '-5px'}} ><MDBIcon style={{marginRight: '5px'}} onClick={() => props.comment()}icon="comment" />{post.cep_inf.like_count}</div>
                                    <div><MDBIcon style={{marginRight: '5px'}} onClick={() => props.like(post.cep_id)} icon="heart" />{post.cep_inf.comment_count}</div>
                                </div>

                            </CardBody> 
                        </Card>
                    </Col>
                </Row>
            )}
            </div>
        </Fragment>
    )
}

export default UserPostsMobile;