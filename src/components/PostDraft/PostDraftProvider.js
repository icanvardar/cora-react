import React, { useContext, useState, useEffect } from "react";

import {
  MDBRow as Row,
  MDBCol as Col,
  MDBAlert as Alert,
  MDBBtn as Btn
} from "mdbreact";

import GeneralPostDraft from "./GeneralPostDraft";
import EPPostDraft from "./EPPostDraft";

import { addLikes } from "../../utils/apiRequests/notification";
import { isIt, deleteLike } from "../../utils/apiRequests/connectionUser/like";

// Tab API requests
import { getAllData } from "../../utils/apiRequests/connectionUser/alldata";
import { getEvents } from "../../utils/apiRequests/event";
import { getParties } from "../../utils/apiRequests/party";

import { getUserData } from "../../utils/apiRequests/connectionUser/alldata";

import Context from "../../utils/Context";

const PostDraftProvider = props => {
  const { token, username, userId } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [credentials, setCredentials] = useState({});
  const [postsLoading, setPostsLoading] = useState(true);
  const [buttonVisibility, setButtonVisibility] = useState("invisible");
  const [buttonMessage, setButtonMessage] = useState();

  const [pagNum, setPagNum] = useState(0);

  const [activeItem, setActiveItem] = useState(props.activeItem);

  // For discriminate tabs or profile
  const [renderedPage, setRenderedPage] = useState("");

  useEffect(() => {
    setCredentials({ ...props.credentials });
  }, [props.credentials]);

  useEffect(() => {
    // Profile Page
    if (props.id) {
      setRenderedPage("profile");
      getUserData(
        token,
        { _id: props.id, paginationNumber: pagNum },
        res => {
          console.log(res.data);
          if (res.data.length === 0) {
            setButtonVisibility("invisible");
            setPostsLoading(false);
            return setButtonMessage("Görüntülenecek içerik yok.");
          }
          setPosts(posts.concat(res.data));
          setPostsLoading(false);
          setButtonVisibility("visible");
        },
        err => {
          console.log(err);
        }
      );
    }
    // Home Tabs
    else {
      if (activeItem === "1") {
        setRenderedPage("home");
        getAllData(
          token,
          { pagination_number: pagNum },
          res => {
            // console.log(res.data);
            if (res.data.length === 0) {
              setButtonVisibility("invisible");
              setPostsLoading(false);
              return setButtonMessage("Görüntülenecek içerik yok.");
            }
            setPosts(posts.concat(res.data));
            setPostsLoading(false);
            setButtonVisibility("visible");
          },
          err => {
            console.log(err);
          }
        );
      } else if (activeItem === "3") {
        setRenderedPage("event");
        getEvents(
          token,
          { paginationNumber: pagNum, category: "" },
          res => {
            console.log(res.data);
            if (res.data.length === 0) {
              setButtonVisibility("invisible");
              setPostsLoading(false);
              return setButtonMessage("Görüntülenecek içerik yok.");
            }
            setPosts(posts.concat(res.data));
            setPostsLoading(false);
            setButtonVisibility("visible");
          },
          err => {
            console.log(err);
          }
        );
      } else if (activeItem === "4") {
        setRenderedPage("party");
        getParties(
          token,
          { paginationNumber: pagNum, category: "" },
          res => {
            // console.log(res.data);
            if (res.data.length === 0) {
              setButtonVisibility("invisible");
              setPostsLoading(false);
              return setButtonMessage("Görüntülenecek içerik yok.");
            }
            setPosts(posts.concat(res.data));
            setPostsLoading(false);
            setButtonVisibility("visible");
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }, [pagNum, props.id]);

  // Checks empty object
  const isEmpty = obj => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  // Loads rest of another 10 digits data
  const increasePageNum = () => {
    setPagNum(pagNum + 10);
    setPostsLoading(true);
    setButtonVisibility("invisible");
  };

  const like = (ucAlldata_id, username, ownpost_id, type_CEP) => {
    isIt(
      token,
      { ucAlldata_id },
      res => {
        console.log(res.data);
        if (res.data === true) {
          removeLike(ucAlldata_id);
        } else {
          addLike(ucAlldata_id, username, ownpost_id, type_CEP);
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  const addLike = (ucAlldata_id, username, ownpost_id, type_CEP) => {
    addLikes(
      token,
      { ucAlldata_id, firebaseToken: "1", username, ownpost_id, type_CEP },
      res => {
        console.log("like worked!");
      },
      err => {
        console.log(err);
      }
    );
  };

  const removeLike = ucAlldata_id => {
    deleteLike(
      token,
      { ucAlldata_id },
      res => {
        console.log("removeLike worked!");
      },
      err => {
        console.log(err);
      }
    );
  };

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <Row>
          {posts.map(post =>
            renderedPage === "profile" ? (
              // For profile posts
              <GeneralPostDraft
                key={post._id}
                post={post}
                like={like}
                credentials={props.credentials}
              />
            ) : renderedPage === "event" || renderedPage === "party" ? (
              // For event and party tab posts only
              <EPPostDraft key={post._id} post={post} like={like} />
            ) : (
              // For home tab posts
              <GeneralPostDraft key={post._id} post={post} like={like} />
            )
          )}
        </Row>
      </div>

      {postsLoading && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {buttonMessage && (
        <Row center>
          <Col md="4" style={{ textAlign: "center" }}>
            <Alert color="light">{buttonMessage}</Alert>
          </Col>
        </Row>
      )}
      {posts.length > 9 && (
        <div style={{ textAlign: "center" }}>
          <Btn
            className={buttonVisibility}
            onClick={() => increasePageNum()}
            style={{ textTransform: "none" }}
            size="sm"
            color="white"
          >
            Daha Fazla
          </Btn>
        </div>
      )}
    </div>
  );
};

export default PostDraftProvider;
