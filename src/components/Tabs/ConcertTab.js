import React, {useState, useEffect, useContext} from 'react';

import Context from '../../utils/Context';

import PostDraftProvider from '../PostDraft/PostDraftProvider';

import {getConcerts} from '../../utils/apiRequests/concert';

const EventTab = (props) => {

    return (
        <PostDraftProvider activeItem={props.activeItem}/>
    )
}

export default EventTab;