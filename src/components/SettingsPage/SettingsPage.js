import React, { Fragment, useState } from 'react';
import {MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBBtn as Btn} from 'mdbreact';

import ChangePassword from './ChangePassword';
import UniversityCredentials from './UniversityCredentials';
import BlockUser from './BlockUser';
import Contact from './Contact';

import {history} from '../../App';

import { withCookies, useCookies } from "react-cookie";

const SettingsPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [page, setPage] = useState(0);

    const pageChanger = (pageNum) => {
        setPage(pageNum)
    }

    const logOut = async () => {
        removeCookie('SESSION_ID');
        removeCookie('USER_ID');
        removeCookie('username');
        history.push('/');
      }     

    return (
        <Fragment>
            <Container className="page">
                <div className="d-none d-md-block mt-2" style={{marginTop: '20px'}}>
                    <Card style={{backgroundColor: '#151515', color: 'white', marginTop: '20px'}}>
                        <CardBody>
                            <Row>
                                <Col md="4" style={{borderRight: '0.5px solid white', textAlign: 'center'}}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Btn size="sm" color="white" style={{textTransform: 'none', fontWeight: 'bold'}} onClick={() => pageChanger(1)}>Şifre Değiştir</Btn>
                                        <Btn size="sm" color="white" style={{textTransform: 'none', fontWeight: 'bold'}} onClick={() => pageChanger(2)}>Üniversite Bilgileri</Btn>
                                        <Btn size="sm" color="white" style={{textTransform: 'none', fontWeight: 'bold'}} onClick={() => pageChanger(3)}>Hesap Engelle</Btn>
                                        <Btn size="sm" color="white" style={{textTransform: 'none', fontWeight: 'bold'}} onClick={() => pageChanger(4)}>İletişim</Btn>
                                        <Btn size="sm" color="white" onClick={() => logOut()} style={{textTransform: 'none', fontWeight: 'bold'}}>Çıkış Yap</Btn>
                                    </div>
                                </Col>
                                <Col md="5">
                                    {
                                        page === 1 ? <ChangePassword />
                                        :
                                        page === 2 ? <UniversityCredentials />
                                        :
                                        page === 3 ? <BlockUser />
                                        :
                                        page === 4 ? <Contact />
                                        :
                                        <h1>
                                            Welcome to the SettingsPage!
                                        </h1>
                                    }
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>

                <div className="d-md-none" style={{marginTop: '20px'}}>
                    <Card style={{backgroundColor: '#151515', color: 'white', marginTop: '20px'}}>
                        <CardBody>
                            <Row>
                                <Col md="4">
                                    {
                                        page === 1 ? <ChangePassword />
                                        :
                                        page === 2 ? <UniversityCredentials />
                                        :
                                        page === 3 ? <BlockUser />
                                        :
                                        page === 4 ? <Contact />
                                        :
                                        <h1>
                                            Welcome to the SettingsPage!
                                        </h1>
                                    }
                                </Col>
                                <Col md="3" style={{textAlign: 'center'}}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Btn size="sm" color="white" style={{textTransform: 'none', fontWeight: 'bold'}} onClick={() => pageChanger(1)}>Şifre Değiştir</Btn>
                                        <Btn size="sm" color="white" style={{textTransform: 'none', fontWeight: 'bold'}} onClick={() => pageChanger(2)}>Üniversite Bilgileri</Btn>
                                        <Btn size="sm" color="white" style={{textTransform: 'none', fontWeight: 'bold'}} onClick={() => pageChanger(3)}>Hesap Engelle</Btn>
                                        <Btn size="sm" color="white" style={{textTransform: 'none', fontWeight: 'bold'}} onClick={() => pageChanger(4)}>İletişim</Btn>
                                        <Btn size="sm" color="white" onClick={() => logOut()} style={{textTransform: 'none', fontWeight: 'bold'}}>Çıkış Yap</Btn>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </Container>
        </Fragment>
    )
}

export default withCookies(SettingsPage);