import React, {useState, useEffect, useContext} from 'react';

import Context from '../../utils/Context';

import {getAllData} from '../../utils/apiRequests/connectionUser/alldata';

import PostDraftProvider from '../PostDraft/PostDraftProvider';

const HomeTab = (props) => {
    const {token} = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);

    useEffect(() => {
        if (props.activeItem === "1") {
            getAllData(token, 
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

export default HomeTab;