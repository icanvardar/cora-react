import React, { useState, useEffect } from 'react';
import classes from './LoginForm.module.css';
import { useCookies, withCookies } from 'react-cookie';
import {history} from '../../App';

import {loginUser} from '../../utils/apiRequests/user';

import {Link} from 'react-router-dom';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBBtn as Btn, MDBInput as Input, MDBCard as Card, MDBCardBody as CardBody } from 'mdbreact';

const LoginForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [cookies, setCookie] = useCookies();

    const submit = async (e) => {
        e.preventDefault();

        await loginUser({email, password}, 
          (res) => {
            setCookie('SESSION_ID', res.data.token, {path: '/'});
            setCookie('username', res.data.user.username, {path: '/'});
            history.push('/');
          }, 
          (err) => {
            console.log(err);
        });
        
    }

    return (
      <Container className={classes.form}>
        <Row center>
          <Col xs="2">
            <img src={require('../../assets/images/cora-logo.png')} className={`img-fluid ${classes.coralogo}`}></img>
          </Col>
        </Row>
        <Row center>
          <Col md="6">
            <Card color="black">
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
                    <Btn color="white" type="submit" style={{textTransform: 'none', width: '100%', display: 'block', fontWeight: 'bold'}}>Giriş</Btn>
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

export default withCookies(LoginForm);