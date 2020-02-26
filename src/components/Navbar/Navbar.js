import React, { useState, useContext, useEffect } from "react";
import Context from "../../utils/Context";

import { MDBContainer as Container, MDBCol as Col , MDBRow as Row, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBFormInline } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

import {history} from '../../App';
import classes from './Navbar.module.css';

import { findUser } from '../../utils/apiRequests/userwithtoken';
import { findNotification } from '../../utils/apiRequests/notification';

const Navbar = (props) => {
  const {token, username, userId} = useContext(Context);
  const [searchOpen, setSearchOpen] = useState(false);

  // Adjusts when fetching happens
  const [letterCounter, setLetterCounter] = useState(0);
  // Gets the search text
  const [userSearchText, setUserSearchText] = useState('');
  // Search results
  const [searchResult, setSearchResult] = useState([]);
  // Search box click listener
  const [searchBoxClicked, setSearchBoxClicked] = useState(false);
  // For holding notifications
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    findNotification(token, {
      user_id: userId
    },
    (res) => {
      setNotifications(res.data);
      console.log(res.data);
    },
    (err) => {
      console.log(err);
    })
  }, [])

  useEffect(() => {
    if (searchOpen) {
      setLetterCounter(letterCounter + 1);
      if (letterCounter % 3 === 0) {
        findUser(token, {
          username: userSearchText
        },
        (res) => {
          setSearchResult(res.data);
        },
        (err) => {
          console.log(err);
        })
      }
    }
  }, [ userSearchText ])
  
  return (
    <Router>
      <MDBNavbar fixed="top" className={classes.navbar} color="black" dark expand="md">
        <Container>   
            <MDBNavbarBrand>
              <a href="/">
                <img className={classes.navbarbrand} src={require('../../assets/images/cora-logo.png')} alt="nav-logo"></img>
              </a>
            </MDBNavbarBrand>
            
            <MDBNavbarNav right>
            { token ? 
              <Row>
                  {searchOpen === false ?
                    <Col xs="2">
                      <MDBNavItem>
                      <MDBDropdown>
                        <MDBDropdownToggle color="primary" nav>
                          <MDBIcon onClick={(e) => {
                            e.preventDefault();
                            setSearchOpen(true);
                          }} icon="search" />
                        </MDBDropdownToggle>
                      </MDBDropdown>
                      </MDBNavItem>
                    </Col>
                    :
                    <Col xs="6">
                      <MDBFormInline>
                        <div className="md-form my-0" onClick={() => setSearchBoxClicked(true)} onMouseLeave={() => setSearchBoxClicked(false)} >
                          <input className="form-control mr-sm-2" type="text" placeholder="Ara" aria-label="Search" onChange={(e) => setUserSearchText(e.target.value)} />
                          {
                            userSearchText && searchBoxClicked === true && 
                            <div style={{position: 'absolute', backgroundColor: 'white', overflow: 'auto', zIndex: '1000', borderRadius: '5px', width: '200px', height: '180px', padding: '5px'}}>
                              
                              {
                                searchResult.length === 0 ?
                                <p style={{marginLeft: '5px'}}>Kullanıcı bulunamadı.</p>
                                :
                                <div>
                                  <h5 style={{marginLeft: '5px'}}>Sonuçlar</h5>
                                  {
                                    searchResult.map((user) =>
                                    <a key={user._id} href={`/profile/${user.username}`}>
                                      <div style={{display: 'flex', flexDirection: 'row', color: 'black', marginTop: '5px', marginLeft: '5px'}}>
                                        <div>
                                          <img style={{width: '35px', height: '35px'}} src={user.profile_photo} alt=""></img>
                                        </div>
                                        <div style={{marginLeft: '20px'}}>
                                          <div style={{display: 'flex', flexDirection: 'column', fontSize: '14px'}}>
                                            <p>{user.name}</p>
                                            <p style={{marginTop: '-20px'}}>@{user.username}</p>
                                          </div>
                                        </div>
                                      </div>
                                      <hr style={{marginTop: '-10px'}}></hr>
                                    </a>
                                    ) 
                                  }
                                  <a href={`/find/${userSearchText}`} style={{fontSize: '12px', marginLeft: '10px', paddingBottom: '5px', marginTop: '-5px'}}>Daha fazla sonuç için tıklayınız.</a>
                                </div>
                              }
                            </div>
                          }
                        </div>
                      </MDBFormInline>
                    </Col>
                  }

                <Col xs="2">
                <MDBNavItem>
                  <MDBDropdown>
                      <MDBDropdownToggle color="primary" nav>
                          <MDBIcon icon="bell" />
                      </MDBDropdownToggle>
                      
                      <MDBDropdownMenu right basic className="dropdown-default">
                          <div style={{width: '300px', height: '200px', overflow: 'auto'}} className={classes.notifications}>
                            <div style={{display: 'flex', justifyContent: 'start', marginBottom: '-15px'}}>
                              <h5>Bildirimler</h5>
                            </div>
                            <div>
                            {
                              notifications.map(notification => {
                                if (notification.notification_username !== username) {
                                  return (
                                    <a key={notification._id} href={`/profile/${notification.notification_username}`}>
                                      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '-20px'}}>
                                        <div>
                                          <img style={{width: '25px', height: '25px', marginRight: '10px'}} src={notification.notification_photo_url} alt=""></img>
                                        </div>
                                        <div style={{textAlign: 'start'}}>
                                          <p>{`@${notification.notification_username} ${notification.notification}`}</p>
                                        </div>
                                      </div>
                                    </a>
                                  )
                                }
                              })
                            }
                            </div>
                          </div>
                      </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                </Col>

                <Col xs="2">
                <MDBNavItem>
                  <MDBDropdown>

                      <MDBDropdownToggle color="primary" nav>
                          <MDBIcon icon="user" />
                      </MDBDropdownToggle>
                      
                      <MDBDropdownMenu right basic className="dropdown-default">
                          <MDBDropdownItem href="/profile/me">Profil</MDBDropdownItem>
                          <MDBDropdownItem href={`/settings`}>Ayarlar</MDBDropdownItem>
                          {/* <MDBDropdownItem onClick={() => logOut()}>Çıkış Yap</MDBDropdownItem> */}
                      </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                </Col>
              </Row> 
              
              : 
              

              <Row>
              <Col size="6">
                <MDBNavItem>
                  <a href="/register" className={classes.navlink}>
                    <MDBIcon icon="user-plus" />
                  </a>
                </MDBNavItem>
              </Col>

              <Col size="6">
                <MDBNavItem>
                  <a href="/login" className={classes.navlink}>
                    <MDBIcon icon="sign-in-alt" />
                  </a>
                </MDBNavItem>
              </Col>
              </Row> 
            }
            </MDBNavbarNav>
            
            </Container>
      </MDBNavbar>
    </Router>
    );
  
}

export default Navbar;