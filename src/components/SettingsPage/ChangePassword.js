import React, { useContext, useState, useEffect } from "react";
import {
  MDBRow as Row,
  MDBCol as Col,
  MDBInput,
  MDBBtn as Btn
} from "mdbreact";

import {history} from '../../App';

import { changePassword } from "../../utils/apiRequests/userwithtoken";

import Context from "../../utils/Context";

const ChangePassword = () => {
  const { token, userId } = useContext(Context);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRep, setNewPasswordRep] = useState("");
  const [matchingWarning, setMatchingWarning] = useState("");

  // to check new password inputs are equal and not empty
  const [newInputs, setNewInputs] = useState(false);

  // to set button disabled or not
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // checks if submit is true or wrong
  const [submitText, setSubmitText] = useState("");

  useEffect(() => {
    if (newPassword === "" || !newPassword) {
      setMatchingWarning("");
      setNewInputs(false);
    } else if (newPassword === newPasswordRep) {
      setMatchingWarning("");
      setNewInputs(true);
    } else if (newPassword !== newPasswordRep) {
      setMatchingWarning("Şifreler eşleşmedi");
      setNewInputs(false);
    }
  }, [newPassword, newPasswordRep]);

  useEffect(() => {
    if (newInputs && currentPassword) {
      setButtonDisabled(false);
    }
  }, [currentPassword, newInputs]);

  const changePass = (e) => {
    e.preventDefault();
    changePassword(
      token,
      {
        oldPassword: currentPassword,
        newPassword,
        user_id: userId
      },
      res => {
        // console.log(res.data);
        setSubmitText("Şifre değişiminiz başarılı!");
        setTimeout(() => history.push('/') , 1000);
      },
      err => {
        // console.log(err);
        setSubmitText("Eski şifreniz yanlış!");
      }
    );
  };

  return (
    <form onSubmit={(e) => changePass(e)}>
      <MDBInput
        style={{ color: "white" }}
        type="password"
        label="Şifre"
        rows="2"
        onChange={e => setCurrentPassword(e.target.value)}
      />
      <MDBInput
        style={{ color: "white" }}
        type="password"
        label="Yeni Şifre"
        rows="2"
        onChange={e => setNewPassword(e.target.value)}
      />
      <MDBInput
        style={{ color: "white" }}
        type="password"
        label="Yeni Şifre Tekrar"
        rows="2"
        onChange={e => setNewPasswordRep(e.target.value)}
      />
      {matchingWarning && <p>{matchingWarning}</p>}
      <Row
        style={{ textAlign: "center", marginTop: "10px", marginBottom: "25px" }}
      >
        <Col>
          {submitText && <p>{submitText}</p>}
          <Btn
            color="white"
            disabled={buttonDisabled}
            size="sm"
            type="submit"
            style={{ textTransform: "none", fontWeight: "bold" }}
          >
            Kaydet
          </Btn>
        </Col>
      </Row>
    </form>
  );
};

export default ChangePassword;
