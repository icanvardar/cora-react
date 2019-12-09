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
                    <Col md="2">
                        <img src={require('../../assets/images/cora-logo.png')} className={`img-fluid ${classes.coralogo}`}></img>
                    </Col>
                </Row>
                <h4 className={classes.cardsheading}>Oluşturmak istediğiniz hesap türünü seçiniz.</h4>
                <Row center>
                    <Col md="3">
                        <Link to="/login">
                            <Card className={classes.card1} style={{backgroundColor: '#3692BB', borderRadius: '30px', marginTop: '20px'}}>
                                <CardBody>
                                    <h2 className={classes.cardsheading}>Kişisel Hesap</h2>
                                    <div className={classes.card1info}>
                                        <p className={classes.card1text}>Uygulama içerisinde Konser, Etkinlik ve Partilere katılabilir, parti oluşturabilirsiniz.</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md="3">
                        <Link to="#">
                            <Card className={classes.card2} style={{backgroundColor: '#6A3AB2', borderRadius: '30px', marginTop: '20px'}}>
                                <CardBody>
                                    <h2 className={classes.cardsheading}>Üniversite Kulüp Hesabı</h2>
                                    <div className={classes.card2info}>
                                        <p className={classes.card2text}>Etkinlik oluşturabilir, tüm üniversitelilere duyurabilirsiniz!</p>
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