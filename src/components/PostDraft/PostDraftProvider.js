import React, {useContext} from 'react';

import PostDraft from './PostDraft';
import PostDraftMobile from './PostDraftMobile';

import {addLikes} from '../../utils/apiRequests/notification'

import Context from '../../utils/Context';

const PostDraftProvider = (props) => {
    const {token, username} = useContext(Context);

    const like = () => {
        console.log('Liked it!');
    }
    
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
                <div>
                    <div className="d-none d-md-block mt-2">
                        <PostDraft posts={props.posts} like={like} comment={comment} credentials={props.credentials}/>
                    </div>
                    <div className="d-md-none">
                        <PostDraftMobile posts={props.posts} like={like} comment={comment} credentials={props.credentials}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default PostDraftProvider;