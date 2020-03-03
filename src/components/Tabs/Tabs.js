import React, { useState, useEffect, useContext } from 'react';
import { MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBTabContent, MDBTabPane, MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBBtn as Btn } from "mdbreact";

import classes from './HomeTabs.module.css';

import { userInfToken, findUser, topTwenty } from '../../utils/apiRequests/userwithtoken';

import {history} from '../../App';
import Context from '../../utils/Context';

import HomeTab from './HomeTab';
import EventTab from './EventTab';
import PartyTab from './PartyTab';
import SideCredentials from '../SideCredentials/SideCredentials';

const Tabs = ({ location, match }) => {
    const [params, setParam] = useState(match.params);
    const { token } = useContext(Context);

    const [credentials, setCredentials] = useState({});
    const [credentialsLoading, setCredentialsLoading] = useState(true);

    // Holds top20 users
    const [top20Users, setTop20Users] = useState([]);

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

    // Checks if user have account
    useEffect(() => {
        if (!token) {
            history.push('/login');
        }
    }, [])

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
                    {/* Renders side credentials that is located at homepage right side */}
                    <SideCredentials credentials={credentials} top20Users={top20Users} />
                </Col>
            </Row>
        </Container>
    )
}

export default Tabs;