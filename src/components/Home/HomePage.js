import React, {useContext} from 'react';
import { MDBContainer as Container } from 'mdbreact';

import Context from '../../utils/Context';

import HomeTabs from '../Tabs/HomeTabs';

const HomePage = (props) => {
    const {token} = useContext(Context);

    return (
        <Container className="page">
            {
                token ? 
                <HomeTabs />
                :
                <h1>hello</h1>
            }
        </Container>
    )
}

export default HomePage;