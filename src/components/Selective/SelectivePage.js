import React from 'react';
import {Link} from 'react-router-dom';
import classes from './SelectivePage.module.css';

import {MDBContainer as Container, MDBRow as Row, MDBCol as Col,MDBCard as Card, MDBCardBody as CardBody} from 'mdbreact';
import {history} from '../../App';

export default () => {
    return (
        <div className="page">
            <Container className={classes.container}>
                <Row center>
                    <Col md="4">
                        <img src={require('../../assets/images/cora-logo.png')} className={`img-fluid ${classes.coralogo}`}></img>
                    </Col>
                </Row>
                <h2>Oluşturmak istediğiniz hesap türünü seçiniz.</h2>
                <Row center>
                    <Col md="4">
                        <Link to="/login">
                            <Card className={classes.card1} style={{backgroundColor: '#3692BB', borderRadius: '30px', marginTop: '20px'}}>
                                <CardBody>
                                    <h2>Kişisel Hesap</h2>
                                    <div className={classes.cardinfo1}>
                                        <h2>Uygulama içerisinde Konser, Etkinlik ve Partilere katılabilir, parti oluşturabilirsiniz.</h2>
                                    </div>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md="4">
                        <Link to="#">
                            <Card className={classes.card2} style={{backgroundColor: '#6A3AB2', borderRadius: '30px', marginTop: '20px'}}>
                                <CardBody>
                                    <h2>Üniversite Kulüp Hesabı</h2>
                                    <div className={classes.cardinfo2}>
                                        <h2>Etkinlik oluşturabilir, tüm üniversitelilere duyurabilirsiniz!</h2>
                                    </div>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
        
    )
}