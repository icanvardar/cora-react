import React, {useContext, useState, useEffect} from 'react';

import {MDBRow as Row} from 'mdbreact';

import PostDraft from './PostDraft';

import {addLikes} from '../../utils/apiRequests/notification'
import {isIt, deleteLike} from '../../utils/apiRequests/connectionUser/like';

import Context from '../../utils/Context';

const PostDraftProvider = (props) => {
    const {token, username} = useContext(Context);
    // const [color, setColor] = useState({});

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(props.posts);
    }, [props.posts])

    const like = (ucAlldata_id, username, ownpost_id, type_CEP) => {
        isIt(token, {ucAlldata_id},
            (res) => {
                console.log('isLiked worked!')
                if (res.data === true) {
                    removeLike(ucAlldata_id);
                } else {
                    addLike(ucAlldata_id, username, ownpost_id, type_CEP);
                }
            },
            (err) => {
                console.log(err);
            })
    }

    const addLike = (ucAlldata_id, username, ownpost_id, type_CEP) => {
        addLikes(token, {ucAlldata_id, firebaseToken: '1', username, ownpost_id, type_CEP},
            (res) => {
                console.log('like worked!');
            },
            (err) => {
                console.log(err);
            })
    }

    const removeLike = (ucAlldata_id) => {
        deleteLike(token, {ucAlldata_id},
            (res) => {
                console.log('removeLike worked!');
            },
            (err) => {
                console.log(err);
            })
    }

    // const isLiked = (ucAlldata_id) => {
    //     isIt(token, {ucAlldata_id},
    //         (res) => {
    //             if (res.data === true) {
    //                 setColor({color: 'red'});
    //             } else {
    //                 setColor({color: 'white'});
    //             }
    //         },
    //         (err) => {
    //             console.log(err);
    //         })
    // }
    
    const comment = () => {
        console.log('Comment it out!');
    }

    return (
        <div>
            {props.postsLoading ? 
                <div style={{textAlign: 'center', marginTop: '40px'}}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div style={{marginTop: '20px'}}>
                    <Row>
                    {
                        posts.map(post => 
                            props.credentials ?
                                <PostDraft key={post._id} post={post} like={like} comment={comment} credentials={props.credentials}/>
                            :
                                <PostDraft key={post._id} post={post} like={like} comment={comment}/>
                            )
                    }
                    </Row>
                </div>
            }
        </div>
    )
}

export default PostDraftProvider;