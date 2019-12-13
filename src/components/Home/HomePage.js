import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col} from 'mdbreact';

const HomePage = (props) => {
    useEffect(() => {
        const token = props.cookies.cookies.SESSION_ID;
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Hello this is home HomePage</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default withCookies(HomePage);