import React, {useState, useEffect, useContext} from 'react';
import { MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBTabContent, MDBTabPane, MDBContainer as Container } from "mdbreact";

import classes from './HomeTabs.module.css';

import Context from '../../utils/Context';

import HomeTab from './HomeTab';
import ConcertTab from './ConcertTab';
import EventTab from './EventTab';
import PartyTab from './PartyTab';

const Tabs = ({location, match}) => {
    const [params, setParam] = useState(match.params);
    const {token} = useContext(Context);

    // Configure the active item by getting param values
    const [activeItem, setActiveItem] = useState(
        location.pathname === "/" ? "1"
        :
        params.posts === "concerts" ? "2"
        :
        params.posts === "events" ? "3"
        :
        params.posts = "parties" ? "4"
        :
        ""
    );

    // For styling selected items
    const receiveSelected = (tabName) => {
        if (activeItem === tabName) {
            if (tabName === '1') {
                return classes.tabselectedleft;
            } else if (tabName === '2') {
                return classes.tabselectedmiddle;
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
            <MDBNav tabs className={`${classes.tabcontainer} nav-justified`}>
            <MDBNavItem>
                <MDBNavLink to="/" active className={receiveSelected('1')} role="tab" >
                        <div className={tabTextChanger('1')}>
                            <MDBIcon icon="home" /> <p style={{marginTop: '-5px', marginBottom: '-5px'}}>Anasayfa</p>
                        </div>
                </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink to="/concerts" active className={receiveSelected('2')} role="tab">
                        <div className={tabTextChanger('2')}>
                            <MDBIcon icon="music" /> <p style={{marginTop: '-5px', marginBottom: '-5px'}}>Konser</p>
                        </div>
                </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink to="/events" active className={receiveSelected('3')} role="tab" >
                    <div className={tabTextChanger('3')}>
                        <MDBIcon icon="calendar-day" /> <p style={{marginTop: '-5px', marginBottom: '-5px'}}>Etkinlik</p>
                    </div>
                </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink to="/parties" active className={receiveSelected('4')} role="tab" >
                    <div className={tabTextChanger('4')}>
                        <MDBIcon icon="glass-martini-alt" /> <p style={{marginTop: '-5px', marginBottom: '-5px'}}>Parti</p>
                    </div>
                </MDBNavLink>
            </MDBNavItem>
            </MDBNav>

            <MDBTabContent activeItem={activeItem} >
                <MDBTabPane tabId="1" role="tabpanel">
                    
                    {
                        token ? 
                        <HomeTab activeItem={activeItem}/>
                        :
                        <h1>No content available due to bad login!</h1>
                    }

                </MDBTabPane>
                <MDBTabPane tabId="2" role="tabpanel">
                    
                    {
                        token ? 
                        <ConcertTab activeItem={activeItem}/>
                        :
                        <h1>No content available due to bad login!</h1>
                    }
                    
                </MDBTabPane>
                <MDBTabPane tabId="3" role="tabpanel">
                    
                    {
                        token ? 
                        <EventTab activeItem={activeItem}/>
                        :
                        <h1>No content available due to bad login!</h1>
                    }
                
                </MDBTabPane>
                <MDBTabPane tabId="4" role="tabpanel">
                    
                    {
                        token ? 
                        <PartyTab activeItem={activeItem}/>
                        :
                        <h1>No content available due to bad login!</h1>
                    }
                    
                </MDBTabPane>
            </MDBTabContent>
        </Container>
    )
}

export default Tabs;