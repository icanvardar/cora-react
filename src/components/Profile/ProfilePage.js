import React, {useEffect, useContext, useState} from 'react';
import { withCookies } from 'react-cookie';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col} from 'mdbreact';
import {findUser} from '../../utils/apiRequests/userwithtoken';
import Context from '../../utils/Context';

const ProfilePage = (props) => {
    const {token} = useContext(Context);
    const username = props.cookies.cookies.username;
    const [credentials, setCredentials] = useState({});

    useEffect(() => {
        findUser(token, {username},
            (res) => {
                const data = res.data;
                setCredentials(data);
            },
            (err) => {
                console.log(err);
            }
        );
    }, [])

    useEffect(() => {
        console.log("you've changed credentials")
        console.log(credentials[0]);
    }, [credentials])

    return (
        <Container>
            <Row center style={{textAlign: 'center'}}>
                <Col md="6">
                    <h1></h1>
                </Col>
                <Col md="6">
                    <h1>qwe</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default withCookies(ProfilePage);