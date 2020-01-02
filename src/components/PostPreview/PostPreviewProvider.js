import React, {useState, useEffect, Fragment} from 'react';

import HomeTabPostPreview from '../PostPreview/HomeTabPostPreview';
import PartyTabPostPreview from '../PostPreview/PartyTabPostPreview';

const PostPreviewProvider = ({match, location}) => {
    const [post, setPost] = useState({...location.state.post});

    return (
        <Fragment>
            {
                // Detects if post comes from home tab
                post.cep_inf &&
                    <HomeTabPostPreview post={post} />
            }
            {
                // Detects if post comes from party tab
                post.produced_id &&
                    <PartyTabPostPreview post={post}/>
            }
        </Fragment>
    )
}

export default PostPreviewProvider;