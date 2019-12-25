import React, {useEffect, useContext, useState, Fragment} from 'react';
import { withCookies } from 'react-cookie';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBBtn as Btn} from 'mdbreact';

import {userInfToken, userInfSearch, findUser} from '../../utils/apiRequests/userwithtoken';
import {getUserData, getUsers} from '../../utils/apiRequests/connectionUser/alldata';
import {addLikes, countLikes} from '../../utils/apiRequests/connectionUser/like';

import Context from '../../utils/Context';
import classes from './ProfilePage.module.css';
import {history} from '../../App';

import Credentials from './Credentials';
import CredentialsMobile from './CredentialsMobile';
import UserPosts from './UserPosts';
import UserPostsMobile from './UserPostsMobile';

const ProfilePage = ({match, location}) => {
    const {token} = useContext(Context);
    const [credentials, setCredentials] = useState({});
    const [param, setParam] = useState(match.params.id);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const searchType = match.params.id;

        !token && searchType === "me" && history.push('/login')
    }, [])

    useEffect(() => {
        if (param === "me") {
            userInfToken(token,
                (res) => {
                    const {...data} = res.data;
                    setCredentials(data);
                },
                (err) => {
                    console.log(err);
                }
            );
        } else {
            findUser(token, {username: param},
                (res) => {
                    const {...data} = res.data[0];
                    setCredentials(data);
                    console.log(res);
                },
                (err) => {
                    console.log(err);
                }
            )
        }
    }, [])

    useEffect(() => {
        getUserData(token, {_id: credentials._id, paginationNumber: "0"},
            (res) => {
                console.log(res.data);
                setPosts(res.data);
            },
            (err) => {
                console.log(err);
            }
        )
    }, [credentials])

    const editProfile = () => {
        console.log('You just clicked edit button!');
    }

    const joinedUsers = (cep_id) => {
        getUsers(token, {paginationNumber: "0", cep_id},
            (res) => {
                console.log(res.data);
            },
            (err) => {
                console.log(err);
            }
        )
    }

    const comment = () => {
        console.log('You clicked comment button!')
    }

    const like = (postId) => {
        const userId = credentials._id;
        addLikes(token, {user_id: userId, ucAlldata_id: postId},
            (res) => {
                console.log(res);
            },
            (err) => {
                console.log(err);
            }
        )
    }

    return (
        <Container style={{paddingTop: '30px', paddingBottom: '20px'}}>
            <Fragment>
                <div className="d-none d-lg-block">
                    <Credentials editProfile={editProfile} param={param} credentials={{...credentials}}/>
                </div>
                <div className="d-lg-none">
                    <CredentialsMobile editProfile={editProfile} param={param} credentials={{...credentials}}/>
                </div>
                
                <hr style={{backgroundColor: 'white'}}/>
                
                

                {
                    posts.length === 0 || !posts ? 
                        <h1>There is no post!</h1>
                    :
                    <div>
                        <div className="d-none d-lg-block">
                            <UserPosts posts={posts} joinedUsers={joinedUsers} comment={comment} like={like} param={param} credentials={{...credentials}}/>
                        </div>

                        <div className="d-lg-none">
                            <UserPostsMobile posts={posts} joinedUsers={joinedUsers} comment={comment} like={like} param={param} credentials={{...credentials}}/>
                        </div>
                    </div>
                }
            </Fragment>
        </Container>
    )
}

export default withCookies(ProfilePage);