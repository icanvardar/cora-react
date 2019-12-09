import React, { useState } from 'react';
import classes from './LoginForm.module.css';

import {loginUser} from '../../utils/apiRequests/user';

import {Link} from 'react-router-dom';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBBtn as Btn, MDBInput as Input, MDBCard as Card, MDBCardBody as CardBody } from 'mdbreact';

export default () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submit = async (e) => {
        e.preventDefault();

        console.log(loginUser({email, password}));
    }

    return (
      <Container className={classes.form}>
        <Row center>
          <Col md="4">
            <img src={require('../../assets/images/cora-logo.png')} className={`img-fluid ${classes.coralogo}`}></img>
          </Col>
        </Row>
        <Row center>
          <Col md="6">
            <Card color="elegant-color-dark">
              <CardBody>
                <form onSubmit={submit}>
                  <div className="grey-text">
                    <Input style={{color: 'white'}}
                      label="Email"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      onChange={e => setEmail(e.target.value)}
                    />
                    <Input style={{color: 'white'}}
                      label="Şifre"
                      group
                      type="password"
                      validate
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <Btn color="white" type="submit" style={{textTransform: 'none', width: '100%', display: 'block', width: '100%'}}>Giriş</Btn>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <Link to='/register' className={classes.link}>Henüz hesabınız yok mu?</Link>
                    <br/>
                    <Link to='#' className={classes.link}>Şifremi unuttum</Link>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };