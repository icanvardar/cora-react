import React, { useState, useEffect, Fragment } from 'react';
import classes from './RegisterForm.module.css';
import axios from 'axios';
import validator from 'validator';

import {registerUser, sendVerification} from '../../utils/apiRequests/user';

import {dateFormatter} from '../../helper/dateFormatter';

import { withStyles } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import {Radio, Checkbox, FormControlLabel} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import {Link} from 'react-router-dom';
import { MDBContainer as Container, MDBRow as Row, MDBCol as Col, MDBBtn as Btn, MDBInput as Input, MDBCard as Card, MDBCardBody as CardBody, MDBAlert as Alert } from 'mdbreact';
import { history } from '../../App';

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const RedCheckbox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const UserRegisterForm = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [buttonWarning, setButtonWarning] = useState();

    const [dateChecked, setDateChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState('12/12/1950');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [warning, setWarning] = useState({
        usernameWarning: '',
        passwordWarning: '',
        matchingWarning: '',
        emailWarning: ''
    });

    // gets selected date and formats it via dateFormatter method
    useEffect(() => {
        setBirthdate(dateFormatter(selectedDate));
    }, [selectedDate])

    // username validator
    useEffect(() => {
        if (!username || username.length > 2) setWarning({...warning, usernameWarning: ''});
        else if (username.length < 3) setWarning({...warning, usernameWarning: 'En az 3 haneli olmalıdır.'});
    }, [username])

    // password validator
    useEffect(() => {
        if (!password || password.length > 5) setWarning({...warning, passwordWarning: ''})
        else if (password.length < 6) setWarning({...warning, passwordWarning: 'En az 6 haneli olmalıdır.'});
    }, [password])

    // matchs passwords
    useEffect(() => {
        if (!repeatPassword || password === repeatPassword) setWarning({...warning, matchingWarning: ''});
        else if (password !== repeatPassword) setWarning({...warning, matchingWarning: 'Şifreler eşleşmedi.'});
    }, [repeatPassword])

    // email validator
    useEffect(() => {
        if (!email || validator.isEmail(email)) setWarning({...warning, emailWarning: ''});
        else if (!validator.isEmail(email)) setWarning({...warning, emailWarning: 'Lütfen geçerli bir E-posta giriniz.'});
    }, [email])

    const submit = async (e) => {
        e.preventDefault();
        
        const data = {
          username,
          name,
          surname,
          email,
          password,
          gender,
          birthdate
        }

        // sendVerification(data, 
        //   (res) => {
        //     console.log(res);
        //   },
        //   (err) => {
        //     console.log(err);
        //   }
        //   )

        registerUser(data, 
          (res) => {
            history.push('/login');
          },
          (err) => {
            history.push('/register(user');
          }
          )
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
                  <h3 className={classes.stepheading}>Kişisel Bilgiler</h3>
                  <div className="grey-text">
                    <Input style={{color: 'white'}}
                      label="Ad:"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      onChange={e => setName(e.target.value)}
                    />
                    <Input style={{color: 'white'}}
                      label="Soyad:"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      onChange={e => setSurname(e.target.value)}
                    />
                    <span>Cinsiyet:</span>
                    <BlueRadio
                        checked={gender === 'E'}
                        value="E"
                        color="primary"
                        onChange={() => setGender('E')}
                    />
                    <span className={classes.radiotext}>Erkek</span>
                    <BlueRadio
                        checked={gender === 'K'}
                        value="K"
                        color="primary"
                        onChange={() => setGender('K')}
                    />
                    <span className={classes.radiotext}>Kadın</span>
                    <BlueRadio
                        checked={gender === 'D'}
                        value="D"
                        color="primary"
                        onChange={() => setGender('D')}
                    />
                    <span className={classes.radiotext}>Diğer</span>
                    
                    {
                        dateChecked !== true &&
                        <div className={classes.datepickerdiv}>
                            <span>Doğum Tarihi:</span>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <Grid container justify="start">
                                <KeyboardDatePicker className={classes.datepicker}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="dd/MM/yyyy"
                                    value={selectedDate}
                                    onChange={setSelectedDate}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    }}
                                    color="secondary"
                                    inputVariant="outlined"
                                />
                              </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                    }
                    
                    <FormControlLabel 
                      control={
                        <RedCheckbox
                        checked={dateChecked}
                        onChange={() => {
                          if (dateChecked === false) {
                            setDateChecked(true);
                            setBirthdate('');
                          } else {
                            setDateChecked(false);
                            setSelectedDate('11/11/1950');
                          }
                        }}
                        value="checkedA"
                        inputProps={{
                          'aria-label': 'primary checkbox',
                        }}
                      />
                      }
                      label="Doğum tarihimi belirtmek istemiyorum."
                    />

                    <hr />
                    <h3 className={classes.stepheading}>Kullanıcı Bilgileri</h3>
                    
                    <Input style={{color: 'white'}}
                      label="Kullanıcı Adı:"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      onChange={e => setUsername(e.target.value)}
                    />
                    {
                        warning.usernameWarning !== '' &&
                            <Fragment>
                                <Alert color="warning">{warning.usernameWarning}</Alert>
                            </Fragment> 
                    }

                    <Input style={{color: 'white'}}
                      label="Şifre"
                      group
                      type="password"
                      validate
                      onChange={e => setPassword(e.target.value)}
                    />
                    {
                        warning.passwordWarning !== '' &&
                            <Fragment>
                              <Alert color="warning">{warning.passwordWarning}</Alert>
                            </Fragment>
                    }

                    <Input style={{color: 'white'}}
                      label="Şifre Tekrar"
                      group
                      type="password"
                      validate
                      onChange={e => setRepeatPassword(e.target.value)}
                    />
                    {
                        warning.matchingWarning !== '' &&
                            <Fragment>
                              <Alert color="warning">{warning.matchingWarning}</Alert>
                            </Fragment>
                    }

                    <Input style={{color: 'white'}}
                      label="E-posta:"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      onChange={e => setEmail(e.target.value)}
                    />
                    {
                        warning.emailWarning !== '' &&
                            <Fragment>
                              <Alert color="warning">{warning.emailWarning}</Alert>
                            </Fragment>
                    }

                  </div>
                  
                  <div className="text-center">
                    <Btn color="white" type="submit" style={{textTransform: 'none', width: '100%', display: 'block', width: '100%'}}>Kayıt Ol</Btn>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <p style={{color: 'white'}}>Kaydolarak <a style={{color: '#6B84F4'}}>Gizlilik Sözleşmesi</a>'ni kabul etmiş olursun.</p>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

export default UserRegisterForm;