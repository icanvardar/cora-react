import React, { useState, useContext } from "react";
import Context from "../../utils/Context";

import { MDBContainer as Container, MDBCol as Col , MDBRow as Row, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router, Link } from 'react-router-dom';

import {history} from '../../App';
import classes from './Navbar.module.css';
import { withCookies, useCookies } from "react-cookie";

const Navbar = (props) => {
  const {token} = useContext(Context);
  const [cookies, setCookie, removeCookie] = useCookies();

  const logOut = async () => {
    removeCookie('SESSION_ID');
    removeCookie('username');
    history.push('/');
  } 

  return (
    <Router>
      <MDBNavbar className={classes.navbar} color="black" dark expand="md">
        <Container>   
        <MDBNavbarBrand>
            <a href="/">
              <img className={classes.navbarbrand} src={require('../../assets/images/cora-logo.png')}></img>
            </a>
            </MDBNavbarBrand>
            
            
            <MDBNavbarNav right>
            { token ? 
              <Row>
              <Col size="6">
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

              <Col size="6">
              <MDBNavItem>
                <MDBDropdown>

                    <MDBDropdownToggle color="primary" nav>
                        <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    
                    <MDBDropdownMenu right basic className="dropdown-default">
                        <MDBDropdownItem href="/profile">Profil</MDBDropdownItem>
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