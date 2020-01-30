import React, { useState, useContext } from "react";
import Context from "../../utils/Context";

import { MDBContainer as Container, MDBCol as Col , MDBRow as Row, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBFormInline } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

import {history} from '../../App';
import classes from './Navbar.module.css';
import { withCookies, useCookies } from "react-cookie";

const Navbar = (props) => {
  const {token, username} = useContext(Context);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const logOut = async () => {
    removeCookie('SESSION_ID');
    removeCookie('USER_ID');
    removeCookie('username');
    history.push('/');
  } 

  return (
    <Router>
      <MDBNavbar className={classes.navbar} color="black" dark expand="md">
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
                        <div className="md-form my-0">
                          <input className="form-control mr-sm-2" type="text" placeholder="Ara" aria-label="Search" />
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
                          <div className={classes.notifications}>
                            <p>This isn't a notification!</p>
                            <p>This isn't a notification!</p>
                            <p>This isn't a notification!</p>
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
                          <MDBDropdownItem onClick={() => logOut()}>Çıkış Yap</MDBDropdownItem>
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

export default withCookies(Navbar);