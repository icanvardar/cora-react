import React, {useEffect, useContext, useState, Fragment} from 'react';
import { withCookies } from 'react-cookie';
import { MDBContainer as Container } from 'mdbreact';

import {userInfToken, findUser} from '../../utils/apiRequests/userwithtoken';
import {getUserData} from '../../utils/apiRequests/connectionUser/alldata';
import {addFollowings, quitFollowings} from '../../utils/apiRequests/notification';
import {isItFollowing} from '../../utils/apiRequests/connectionUser/followings';

import Context from '../../utils/Context';
import classes from './ProfilePage.module.css';
import {history} from '../../App';

import Credentials from './Credentials';
import CredentialsMobile from './CredentialsMobile';
import PostDraftProvider from '../PostDraft/PostDraftProvider';

const ProfilePage = ({match, location}) => {
    const {token} = useContext(Context);
    const [credentials, setCredentials] = useState({});
    const [param, setParam] = useState(match.params.id);
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState();

    const [credentialsLoading, setCredentialsLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);

    useEffect(() => {
        const searchType = match.params.id;

        !token && searchType === "me" && history.push('/login')
    }, [])

    // Gets user's credentials
    useEffect(() => {
        if (param === "me") {
            userInfToken(token,
                (res) => {
                    const {...data} = res.data;
                    setCredentials(data);
                    setCredentialsLoading(false);
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
                    setCredentialsLoading(false);
                },
                (err) => {
                    console.log(err);
                }
            )
        }
    }, [])

    // Checks current user follows or not
    useEffect(() => {
        isItFollowing(token, {user_id: credentials._id},
            (res) => {
                setIsFollowing(res.data);
            },
            (err) => {
                console.log(err);
            }
        )
    }, [credentials])

    // Gets user's posts on profile
    useEffect(() => {
        getUserData(token, {_id: credentials._id, paginationNumber: "0"},
            (res) => { 
                setPosts(res.data);
                setPostsLoading(false);
            },
            (err) => {
                console.log(err);
            }
        )
    }, [credentials])

    // Makes user follow
    const follow = (follower_id, username) => {
        addFollowings(token, {follower_id, username, firebaseToken: "1"}, 
            (res) => {
                setIsFollowing(true);

                // After following gets new counts from user's credentials
                findUser(token, {username: param},
                    (res) => {
                        const {...data} = res.data[0];
                        setCredentials(data);
                    },
                    (err) => {
                        console.log(err);
                    }
                )
            },
            (err) => {
                console.log(err);
            }
        )
    }

    // Makes user unfollow
    const unfollow = (follower_id, username) => {
        quitFollowings(token, {follower_id, username, firebaseToken: "1"}, 
            (res) => {
                setIsFollowing(false);

                // After unfollowing gets new counts from user's credentials
                findUser(token, {username: param},
                    (res) => {
                        const {...data} = res.data[0];
                        setCredentials(data);
                    },
                    (err) => {
                        console.log(err);
                    }
                )
            },
            (err) => {
                console.log(err);
            }
        )
    }

    const editProfile = () => {
        console.log('You just clicked edit button!');
    }

    const comment = () => {
        console.log('You clicked comment button!')
    }

    const like = (postId) => {
        console.log('liked');
    }

    return (
        <Container className={classes.container}>
            <Fragment>
                <div className="d-none d-lg-block">
                    <Credentials editProfile={editProfile} follow={follow} unfollow={unfollow} isFollowing={isFollowing} param={param} credentials={{...credentials}} credentialsLoading={credentialsLoading}/>
                </div>
                <div className="d-lg-none">
                    <CredentialsMobile editProfile={editProfile} follow={follow} unfollow={unfollow} isFollowing={isFollowing} param={param} credentials={{...credentials}} credentialsLoading={credentialsLoading}/>
                </div>
                
                <hr/>
                
                <PostDraftProvider posts={posts} param={param} credentials={{...credentials}} postsLoading={postsLoading} />
                
            </Fragment>
        </Container>
    )
}

export default withCookies(ProfilePage);