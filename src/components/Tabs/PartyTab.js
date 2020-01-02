import React, {useState, useEffect, useContext} from 'react';

import Context from '../../utils/Context';

import PostDraftProvider from '../PostDraft/PostDraftProvider';

import {getParties} from '../../utils/apiRequests/party';

const PartyTab = (props) => {
    const {token} = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);

    useEffect(() => {
        if (props.activeItem === "4") {
            getParties(token, {paginationNumber: "0"},
                (res) => {
                    setPosts(res.data);
                    setPostsLoading(false);
                },
                (err) => {
                    console.log(err);
                })
        } else {
            setPostsLoading(true);
            setPosts([]);
        }
    }, [props.activeItem])

    return (
        <PostDraftProvider posts={posts} postsLoading={postsLoading}/>
    )
}

export default PartyTab;