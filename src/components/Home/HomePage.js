import React, {useContext} from 'react';
import { MDBContainer as Container } from 'mdbreact';

import Context from '../../utils/Context';

import Tabs from '../Tabs/Tabs';

const HomePage = (props) => {
    const {token} = useContext(Context);

    return (
        <Container className="page">
            {
                token ? 
                <Tabs />
                :
                <h1>hello</h1>
            }
        </Container>
    )
}

export default HomePage;