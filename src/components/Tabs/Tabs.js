import React, { useState, useEffect, useContext } from 'react';
import { MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBTabContent, MDBTabPane, MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBBtn as Btn } from "mdbreact";

import classes from './HomeTabs.module.css';

import { userInfToken, findUser, topTwenty } from '../../utils/apiRequests/userwithtoken';

import Context from '../../utils/Context';

import HomeTab from './HomeTab';
import EventTab from './EventTab';
import PartyTab from './PartyTab';

const Tabs = ({ location, match }) => {
    const [params, setParam] = useState(match.params);
    const { token } = useContext(Context);

    const [credentials, setCredentials] = useState({});
    const [credentialsLoading, setCredentialsLoading] = useState(true);

    // Holds top20 users
    const [top20Users, setTop20Users] = useState([]);

    useEffect(() => {
        topTwenty(
            token,
            res => {
                setTop20Users(res.data);
                console.log(res.data);
            },
            err => {
                console.log(err);
            }
        );

        userInfToken(token,
            (res) => {
                console.log(res.data);
                const { ...data } = res.data;
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
                    <Card style={{ marginTop: '10px', backgroundColor: '#151515', borderRadius: '5px', color: 'white' }}>
                        <CardBody>
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <img style={{ width: 'inherit', width: '75px', height: '75px', marginRight: '10px', borderRadius: '50%', objectFit: 'cover' }} src={credentials.profile_photo}></img>
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                                    <p>@{credentials.username}</p>
                                    <p style={{ marginTop: '-20px' }}>{`${credentials.name} ${credentials.surname}`}</p>
                                </div>
                            </div>
                            <hr></hr>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Btn href='/profile/me' style={{textTransform: 'none'}} size="sm" color="white">Profil</Btn>
                                    <Btn href='/settings' style={{textTransform: 'none'}} size="sm" color="white">Ayarlar</Btn>
                                </div>
                            <hr></hr>
                            <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '15px' }}>
                                <Row center>
                                    <Col>
                                        <p>Konser</p>
                                        <p style={{ marginTop: '-15px' }}>{credentials.concert_Count}</p>
                                    </Col>
                                    <Col>
                                        <p>Etkinlik</p>
                                        <p style={{ marginTop: '-15px' }}>{credentials.event_Count}</p>
                                    </Col>
                                    <Col>
                                        <p>Parti</p>
                                        <p style={{ marginTop: '-15px' }}>{credentials.party_Count}</p>
                                    </Col>
                                </Row>
                                <Row center style={{ marginTop: '-5px' }}>
                                    <Col>
                                        <p>Takipçi</p>
                                        <p style={{ marginTop: '-15px' }}>{credentials.follower_Count}</p>
                                    </Col>
                                    <Col>
                                        <p>Takip</p>
                                        <p style={{ marginTop: '-15px' }}>{credentials.following_Count}</p>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                    <Card style={{ marginTop: '10px', backgroundColor: '#151515', borderRadius: '5px', color: 'white', height: '300px'}}>
                        <CardBody style={{overflow: 'auto'}}>
                            <Row>
                                {top20Users.map(user => (
                                    <a key={user._id} href={`/profile/${user.username}`}>
                                        <Col
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                color: "white",
                                                marginTop: "5px",
                                                marginLeft: "5px"
                                            }}
                                        >
                                            <div>
                                                <img
                                                    style={{ width: "35px", height: "35px" }}
                                                    src={user.profile_photo}
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div style={{ marginLeft: "20px" }}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        fontSize: "14px"
                                                    }}
                                                >
                                                    <p>{user.name}</p>
                                                    <p style={{ marginTop: "-20px" }}>@{user.username}</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </a>
                                ))}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Tabs;