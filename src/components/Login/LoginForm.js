import React, { useState, useEffect } from "react";
import classes from "./LoginForm.module.css";
import { useCookies, withCookies } from "react-cookie";
import { history } from "../../App";

import { loginUser } from "../../utils/apiRequests/user";
import {
  forgottenpassword1,
  forgottenpassword2,
  forgottenpassword3
} from "../../utils/apiRequests/user";

import { Link } from "react-router-dom";
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBBtn as Btn,
  MDBInput as Input,
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBAlert as Alert,
  MDBModal as Modal,
  MDBModalBody as ModalBody
} from "mdbreact";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // For forgotten password call
  const [forgotttenPasswordModal1, setForgottenPasswordModal1] = useState(
    false
  );
  const [forgotttenPasswordModal2, setForgottenPasswordModal2] = useState(
    false
  );
  const [forgotttenPasswordModal3, setForgottenPasswordModal3] = useState(
    false
  );
  // That hold new password
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  // That hold email that belongs user for new password
  const [emailForValidation, setEmailForValidation] = useState("");
  // That holds validation code that comes from email
  const [validationKey, setValidationKey] = useState("");
  // If any error occurs while sending, this emerges to user a message
  const [badRequestMessage, setBadRequestMessage] = useState("");
  // If changing of new password is succeeded, this message is shown
  const [newPasswordSuccessMessage, setNewPasswordSuccessMessage] = useState("");
  // Pairing new passwords
  const [newPasswordsMatched, setNewPasswordsMatched] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    if (newPassword && newPasswordRepeat) {
      if (newPassword === newPasswordRepeat) {
        setNewPasswordsMatched(true);
      } else if (newPassword !== newPasswordRepeat) {
        setNewPasswordsMatched(false);
      }
    } 
  }, [newPassword, newPasswordRepeat])

  const submit = async e => {
    e.preventDefault();

    await loginUser(
      { email, password },
      res => {
        if (!res.data.token) {
          return setErrorMessage("Mail veya şifreniz yanlış!");
        }
        setCookie("SESSION_ID", res.data.token, { path: "/" });
        setCookie("username", res.data.user.username, { path: "/" });
        setCookie("USER_ID", res.data.user._id, { path: "/" });
        history.push("/");
      },
      err => {
        console.log(err);
      }
    );
  };

  const sendValidationCode = (e) => {
    e.preventDefault();
    forgottenpassword1(
      { email: emailForValidation },
      res => {
        // console.log(res.data);
        if (res.data === false) {
          setForgottenPasswordModal1(false);
          setForgottenPasswordModal2(true);
          setBadRequestMessage("");
        } else {
          setBadRequestMessage(
            "Doğrulama kodu yollanırken bir hata meydana geldi."
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  const checkValidationCode = (e) => {
    e.preventDefault();
    forgottenpassword2(
      { email: emailForValidation, key: validationKey },
      res => {
        if (res.data === true) {
          setForgottenPasswordModal2(false);
          setForgottenPasswordModal3(true);
          setBadRequestMessage("");
        } else {
          setBadRequestMessage("Girdiğiniz doğrulama kodu yanlış.");
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  const setNewPasswordReq = (e) => {
    e.preventDefault();
    forgottenpassword3(
      { newPassword, email: emailForValidation, key: validationKey },
      res => {
        if(res.data === true) {
          setNewPasswordSuccessMessage('Şifreniz başarıyla değiştirildi.');
          setTimeout(() => {
            history.push('/login');
          }, 1500)
        } else {
          setBadRequestMessage('Şifre değiştirilirken bir hata meydana geldi.');
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  return (
    <Container className={classes.form}>
      <Row center>
        <Col xs="2">
          <img
            src={require("../../assets/images/cora-logo.png")}
            className={`img-fluid ${classes.coralogo}`}
            alt=""
          ></img>
        </Col>
      </Row>
      <Row center>
        <Col md="6">
          <Card style={{ backgroundColor: "transparent" }}>
            <CardBody>
              <form onSubmit={submit}>
                <div className="grey-text">
                  <Input
                    style={{ color: "white" }}
                    label="Email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Input
                    style={{ color: "white" }}
                    label="Şifre"
                    group
                    type="password"
                    validate
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                {errorMessage && (
                  <Alert
                    dismiss
                    onClose={() => setErrorMessage("")}
                    color="danger"
                  >
                    {errorMessage}
                  </Alert>
                )}
                <div className="text-center">
                  <Btn
                    color="white"
                    type="submit"
                    style={{
                      textTransform: "none",
                      width: "100%",
                      marginLeft: "0px",
                      display: "block",
                      fontWeight: "bold",
                      marginBottom: "20px"
                    }}
                  >
                    Giriş
                  </Btn>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Link to="/register" className={classes.link}>
                    Henüz hesabınız yok mu?
                  </Link>
                  <br />
                  <a
                    style={{ color: "grey" }}
                    onClick={() => setForgottenPasswordModal1(true)}
                    to="#"
                    className={classes.link}
                  >
                    Şifremi unuttum
                  </a>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal size="md" isOpen={forgotttenPasswordModal1} centered>
        <ModalBody className={classes.forgottenpasswordmodal}>
          <div>
            <form onSubmit={(e) => sendValidationCode(e)}>
              <Input
                style={{ color: "white" }}
                label="Email"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                onChange={e => setEmailForValidation(e.target.value)}
              />
              <Alert color="warning" dismiss>
                Yeni şifre için lütfen eposta adresinizi giriniz.
              </Alert>
              {badRequestMessage && (
                <Alert color="danger" dismiss>
                  {badRequestMessage}
                </Alert>
              )}
              <div className={classes.modalbuttongroup}>
                <Btn
                  style={{ textTransform: "none" }}
                  color="danger"
                  size="sm"
                  onClick={() => setForgottenPasswordModal1(false)}
                >
                  İptal
                </Btn>
                <Btn
                  style={{ textTransform: "none" }}
                  color="success"
                  size="sm"
                  type="submit"
                >
                  İleri
                </Btn>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>

      <Modal size="md" isOpen={forgotttenPasswordModal2} centered>
        <ModalBody className={classes.forgottenpasswordmodal}>
          <div onSubmit={(e) => checkValidationCode(e)}>
            <form>
              <Input
                style={{ color: "white" }}
                label="Doğrulama Kodu"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={e => setValidationKey(e.target.value)}
              />
              <Alert color="warning" dismiss>
                Epostanıza doğrulama kodu başarıyla gönderildi. Lütfen gelen
                kodu giriniz.
              </Alert>
              {badRequestMessage && (
                <Alert color="danger" dismiss>
                  {badRequestMessage}
                </Alert>
              )}
              <div className={classes.modalbuttongroup}>
                <Btn
                  style={{ textTransform: "none" }}
                  color="danger"
                  size="sm"
                  onClick={() => setForgottenPasswordModal2(false)}
                >
                  İptal
                </Btn>
                <Btn
                  style={{ textTransform: "none" }}
                  color="success"
                  size="sm"
                  type="submit"
                >
                  Gönder
                </Btn>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>

      <Modal size="md" isOpen={forgotttenPasswordModal3} centered>
        <ModalBody className={classes.forgottenpasswordmodal}>
          <div>
            <form onSubmit={(e) => setNewPasswordReq(e)}>
              <Input
                style={{ color: "white" }}
                label="Yeni Şifre"
                group
                type="password"
                validate
                error="wrong"
                success="right"
                onChange={e => setNewPassword(e.target.value)}
              />
              <Input
                style={{ color: "white" }}
                label="Yeni Şifre Tekrar"
                group
                type="password"
                validate
                error="wrong"
                success="right"
                onChange={e => setNewPasswordRepeat(e.target.value)}
              />
              {badRequestMessage && (
                <Alert color="danger" dismiss>
                  {badRequestMessage}
                </Alert>
              )}
              {/* Checks whether passwords are matched or not */}
              {newPassword && newPasswordRepeat && (
                newPasswordsMatched === false ? 
                <Alert color="danger" dismiss>
                  Şifreler eşleşmedi.
                </Alert> : null
              )}
              {
                newPasswordSuccessMessage &&
                <Alert color="info">
                  {newPasswordSuccessMessage}
                </Alert>
              }
              <div className={classes.modalbuttongroup}>
                <Btn
                  style={{ textTransform: "none" }}
                  color="danger"
                  size="sm"
                  onClick={() => setForgottenPasswordModal3(false)}
                >
                  İptal
                </Btn>
                <Btn
                  style={{ textTransform: "none" }}
                  color="success"
                  size="sm"
                  type="submit"
                  disabled={!newPasswordsMatched}
                >
                  Gönder
                </Btn>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default withCookies(LoginForm);
