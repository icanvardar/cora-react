import React, { Fragment } from "react";

import { MDBRow as Row, MDBCol as Col, MDBIcon } from "mdbreact";

const Contact = () => {
  return (
    <Fragment>
      <div
        className="d-none d-md-block mt-2"
        style={{ textAlign: "center", marginLeft: "200px" }}
      >
        <h3>İstek ve Şikayet Hattı</h3>
        <p>
          <MDBIcon far icon="envelope" /> cora.destek@gmail.com
        </p>
        <p>Sosyal Medya</p>
        <Row center>
          <a href="https://www.instagram.com/cora.app/">
            <img
              style={{ marginTop: "-7px", height: "45px", width: "45px" }}
              src={require("../../assets/images/insta-logo.png")}
            ></img>
          </a>
          <a href="#">
            <img
              style={{ borderRadius: "5px", height: "30px", width: "30px" }}
              src={require("../../assets/images/twitter-logo.png")}
            ></img>
          </a>
          <a href="https://www.youtube.com/channel/UCIrazfyznf-io0mWbsdvpQQ">
            <img
              style={{
                marginTop: "2px",
                height: "25px",
                width: "auto",
                marginLeft: "7px"
              }}
              src={require("../../assets/images/youtube-logo.png")}
            ></img>
          </a>
        </Row>
      </div>

      <div className="d-md-none" style={{ textAlign: "center" }}>
        <h3>İstek ve Şikayet Hattı</h3>
        <p>
          <MDBIcon far icon="envelope" /> cora.destek@gmail.com
        </p>
        <p>Sosyal Medya</p>
        <Row center>
          <a href="https://www.instagram.com/cora.app/">
            <img
              style={{ marginTop: "-7px", height: "45px", width: "45px" }}
              src={require("../../assets/images/insta-logo.png")}
            ></img>
          </a>
          <a href="#">
            <img
              style={{ borderRadius: "5px", height: "30px", width: "30px" }}
              src={require("../../assets/images/twitter-logo.png")}
            ></img>
          </a>
          <a href="https://www.youtube.com/channel/UCIrazfyznf-io0mWbsdvpQQ">
            <img
              style={{
                marginTop: "2px",
                height: "25px",
                width: "auto",
                marginLeft: "7px"
              }}
              src={require("../../assets/images/youtube-logo.png")}
            ></img>
          </a>
        </Row>
      </div>
    </Fragment>
  );
};

export default Contact;
