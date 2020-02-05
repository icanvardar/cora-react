import React from 'react';

import {MDBContainer, MDBRow as Row, MDBCol as Col, MDBFooter} from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter className="fixed-bottom" color="black" style={{borderTop: '1px solid #6A86F4'}} className="font-small pt-4 mt-4">
          <MDBContainer fluid className="text-center text-md-left">
            <Row center style={{textAlign: 'center'}}>
                <Col className="d-none d-md-block mt-2" md="2">
                    <h1>Cora</h1>
                    <ul>
                        <li className="list-unstyled">
                            <a href="#!">Footer Link</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Footer Link</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Footer Link</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Footer Link</a>
                        </li>
                    </ul>
                </Col>
                <Col md="2">
                    <img src={require('../../assets/images/cora-logo.png')} alt="cora-logo"></img>
                </Col>
                <Col className="d-none d-md-block mt-2" md="2">
                    <h1>Cora</h1>
                    <ul>
                        <li className="list-unstyled">
                            <a href="#!">Footer Link</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Footer Link</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Footer Link</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Footer Link</a>
                        </li>
                    </ul>
                </Col>
            </Row>
          </MDBContainer>
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} <a href="#"> Cora </a>
            </MDBContainer>
          </div>
        </MDBFooter>
      );
}

export default Footer;