import React, {useState, useEffect, useContext, Fragment} from 'react';

import PostDraftProvider from '../PostDraft/PostDraftProvider';

const PartyTab = (props) => {

    return (
        <Fragment>
            <PostDraftProvider activeItem={props.activeItem}/>
        </Fragment>
    )
}

export default PartyTab;