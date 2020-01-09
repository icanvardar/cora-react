import React, {useState, useEffect, useContext, Fragment} from 'react';

import PostDraftProvider from '../PostDraft/PostDraftProvider';

const EventTab = (props) => {

    return (
        <Fragment>
            <PostDraftProvider activeItem={props.activeItem}/>
        </Fragment>
    )
}

export default EventTab;