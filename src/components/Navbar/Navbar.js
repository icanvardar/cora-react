import React, { Component } from "react";
import { MDBContainer as Container, MDBCol as Col , MDBRow as Row, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router, Link } from 'react-router-dom';

import classes from './Navbar.module.css';

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar style={{borderBottom: '1px solid #6A86F4'}} color="black" dark expand="md">
        <Container>   
        <MDBNavbarBrand>
            <a href="/">
              <img style={{height: '40px', width: 'auto'}} src={require('../../assets/images/cora-logo.png')}></img>
            </a>
            </MDBNavbarBrand>
            
            
            <MDBNavbarNav right>
            <Row>
                  <Col size="5">
                  <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle color="primary" nav>
                            <MDBIcon icon="bell" />
                        </MDBDropdownToggle>
                        
                        <MDBDropdownMenu right basic className="dropdown-default">
                            <div style={{textAlign: 'center', padding: '10px'}}>
                              <p>This isn't a notification!</p>
                              <p>This isn't a notification!</p>
                              <p>This isn't a notification!</p>
                            </div>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                  </Col>

                  <Col size="5">
                  <MDBNavItem>
                    <MDBDropdown>

                        <MDBDropdownToggle color="primary" nav>
                            <MDBIcon icon="user" />
                        </MDBDropdownToggle>
                        
                        <MDBDropdownMenu right basic className="dropdown-default">
                            <MDBDropdownItem href="#!">Profil</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Çıkış Yap</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                  </Col>
                  </Row>
            </MDBNavbarNav>
            
            </Container>
      </MDBNavbar>
    </Router>
    );
  }
}

export default NavbarPage;