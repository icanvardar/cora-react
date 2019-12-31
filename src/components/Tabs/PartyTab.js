import React, {useState, useEffect, useContext} from 'react';

import Context from '../../utils/Context';

import PostDraftProvider from '../PostDraft/PostDraftProvider';

import {getParties} from '../../utils/apiRequests/party';

const EventTab = () => {
    const {token} = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);
    
    useEffect(() => {
        getParties(token, {paginationNumber: "0"},
            (res) => {
                setPosts(res.data);
                setPostsLoading(false);
            },
            (err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        console.log(posts);
    }, [posts])

    return (
        <PostDraftProvider posts={posts} postsLoading={postsLoading}/>
    )
}

export default EventTab;