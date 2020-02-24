import React, { useState, useEffect, useContext } from 'react';
import { MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBTabContent, MDBTabPane, MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody } from "mdbreact";

import classes from './HomeTabs.module.css';

import {userInfToken, findUser} from '../../utils/apiRequests/userwithtoken';

import Context from '../../utils/Context';

import HomeTab from './HomeTab';
import EventTab from './EventTab';
import PartyTab from './PartyTab';

const Tabs = ({ location, match }) => {
    const [params, setParam] = useState(match.params);
    const { token } = useContext(Context);

    const [credentials, setCredentials] = useState({});
    const [credentialsLoading, setCredentialsLoading] = useState(true);

    useEffect(() => {
        userInfToken(token,
            (res) => {
                console.log(res.data);
                const {...data} = res.data;
                setCredentials(data);
                setCredentialsLoading(false);
            },
            (err) => {
                console.log(err);
            }
        );
    }, [])

    // Configure the active item by getting param values
    const [activeItem, setActiveItem] = useState(
        location.pathname === "/" ? "1"
            :
            location.pathname === "/events" ? "3"
                :
                location.pathname === "/parties" ? "4"
                    :
                    ""
    );

    // For styling selected items
    const receiveSelected = (tabName) => {
        if (activeItem === tabName) {
            if (tabName === '1') {
                return classes.tabselectedleft;
            } else if (tabName === '3') {
                return classes.tabselectedmiddle;
            } else if (tabName === '4') {
                return classes.tabselectedright;
            }
        }
    }

    const tabTextChanger = (tabName) => {
        if (activeItem === tabName) {
            return classes.tabtextselected;
        } else {
            return classes.tabtextdefault;
        }
    }

    return (
        <Container className="page">
            <Row>
                <Col md="9">
                    <MDBNav tabs className={`${classes.tabcontainer} nav-justified`}>
                        <MDBNavItem>
                            <MDBNavLink to="/" active className={receiveSelected('1')} role="tab" >
                                <div className={tabTextChanger('1')}>
                                    <MDBIcon icon="home" /> <p style={{ marginTop: '-5px', marginBottom: '-5px' }}>Anasayfa</p>
                                </div>
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/events" active className={receiveSelected('3')} role="tab" >
                                <div className={tabTextChanger('3')}>
                                    <MDBIcon icon="calendar-day" /> <p style={{ marginTop: '-5px', marginBottom: '-5px' }}>Etkinlik</p>
                                </div>
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/parties" active className={receiveSelected('4')} role="tab" >
                                <div className={tabTextChanger('4')}>
                                    <MDBIcon icon="glass-martini-alt" /> <p style={{ marginTop: '-5px', marginBottom: '-5px' }}>Parti</p>
                                </div>
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>

                    <MDBTabContent activeItem={activeItem} >
                        <MDBTabPane tabId="1" role="tabpanel">

                            {
                                token ?
                                    <HomeTab activeItem={activeItem} />
                                    :
                                    <h1>No content available due to bad login!</h1>
                            }

                        </MDBTabPane>
                        <MDBTabPane tabId="3" role="tabpanel">

                            {
                                token ?
                                    <EventTab activeItem={activeItem} />
                                    :
                                    <h1>No content available due to bad login!</h1>
                            }

                        </MDBTabPane>
                        <MDBTabPane tabId="4" role="tabpanel">

                            {
                                token ?
                                    <PartyTab activeItem={activeItem} />
                                    :
                                    <h1>No content available due to bad login!</h1>
                            }

                        </MDBTabPane>
                    </MDBTabContent>
                </Col>
                <Col md="3" className="d-none d-md-block mt-2">
                    <Card style={{marginTop: '15px', backgroundColor: '#151515', borderRadius: '5px', color: 'white'}}>
                        <CardBody>
                            <div>
                                <img style={{width: 'inherit'}} src={credentials.profile_photo}></img>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <p>@{credentials.username}</p>
                                <p>{`${credentials.name} ${credentials.surname}`}</p>
                            </div>
                            <Row center>
                                    <Col>
                                        <p>Konser</p>
                                        <p className={classes.fixedtext}>{credentials.concert_Count}</p>
                                    </Col>
                                    <Col>
                                        <p>Etkinlik</p>
                                        <p className={classes.fixedtext}>{credentials.event_Count}</p>
                                    </Col>
                                    <Col>
                                        <p>Parti</p>
                                        <p className={classes.fixedtext}>{credentials.party_Count}</p>
                                    </Col>
                                </Row>
                                <Row center>
                                    <Col>
                                        <p>Takipçi</p>
                                        <p className={classes.fixedtext}>{credentials.follower_Count}</p>
                                    </Col>
                                    <Col>
                                        <p>Takip</p>
                                        <p className={classes.fixedtext}>{credentials.following_Count}</p>
                                    </Col>
                                </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Tabs;