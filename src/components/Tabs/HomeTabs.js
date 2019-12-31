import React, {useState, useEffect, useContext} from 'react';
import { MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBTabContent, MDBTabPane } from "mdbreact";

import Context from '../../utils/Context';

import ConcertTab from './ConcertTab';
import EventTab from './EventTab';
import PartyTab from './PartyTab';

import {getAllData} from '../../utils/apiRequests/connectionUser/alldata';

import classes from './HomeTabs.module.css';
import PostDraftProvider from '../PostDraft/PostDraftProvider';

const HomeTabs = () => {
    const {token} = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [activeItem, setActiveItem] = useState('1');

    const [postsLoading, setPostsLoading] = useState(true);

    useEffect(() => {
      getAllData(token, 
        (res) => {
            console.log(res.data);
            setPosts(res.data);
            setPostsLoading(false);
        },
        (err) => {
            console.log(err);
        })
    }, [])

    const toggle = (tabName) => {
        setActiveItem(tabName);
    }

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
        <div className="page">
            <MDBNav tabs className={`${classes.tabcontainer} nav-justified`}>
            <MDBNavItem>
                <MDBNavLink to="#" active className={receiveSelected('1')} onClick={(e) => {
                    e.preventDefault();
                    toggle('1');
                }} role="tab" >
                    <div className={tabTextChanger('1')}>
                        <MDBIcon icon="home" /> Anasayfa
                    </div>
                </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink to="#" active className={receiveSelected('2')} onClick={(e) => {
                    e.preventDefault();
                    toggle('2');
                }} role="tab">
                    <div className={tabTextChanger('2')}>
                        <MDBIcon icon="music" /> Konser
                    </div>
                </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink to="#" active className={receiveSelected('3')} onClick={(e) => {
                    e.preventDefault();
                    toggle('3');
                }} role="tab" >
                <div className={tabTextChanger('3')}>
                    <MDBIcon icon="calendar-day" /> Etkinlik
                </div>
                </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink to="#" active className={receiveSelected('4')} onClick={(e) => {
                    e.preventDefault();
                    toggle('4');
                }} role="tab" >
                <div className={tabTextChanger('4')}>
                    <MDBIcon icon="glass-martini-alt" /> Parti
                </div>
                </MDBNavLink>
            </MDBNavItem>
            </MDBNav>

            <MDBTabContent activeItem={activeItem} >
            <MDBTabPane tabId="1" role="tabpanel">
                
                <PostDraftProvider posts={posts} postsLoading={postsLoading}/>

            </MDBTabPane>
            <MDBTabPane tabId="2" role="tabpanel">
                
                <ConcertTab/>
                
            </MDBTabPane>
            <MDBTabPane tabId="3" role="tabpanel">
                
                <EventTab/>
            
            </MDBTabPane>
            <MDBTabPane tabId="4" role="tabpanel">
                
                <PartyTab/>
                
            </MDBTabPane>
            </MDBTabContent>
        </div>
    )
}

export default HomeTabs;