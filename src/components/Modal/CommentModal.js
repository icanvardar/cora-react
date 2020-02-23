import React, {useState, useEffect, useContext, Fragment} from 'react';
import { MDBContainer as Container, MDBBtn as Btn, MDBModal as Modal, MDBRow as Row, MDBCol as Col, MDBIcon as Icon, MDBInput, MDBAlert as Alert} from 'mdbreact';

import {addComments} from '../../utils/apiRequests/notification';
import {getComments, deleteComment} from '../../utils/apiRequests/connectionUser/comment';

import Context from '../../utils/Context';
import {history} from '../../App';

const EditProfileModal = (props) => {
    const {token, username, userId} = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState('');
    
    // For increasing pagination number
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [buttonVisibility, setButtonVisibility] = useState('invisible');
    const [buttonMessage, setButtonMessage] = useState();

    // Holds pagination number for loading more comments
    const [paginationNumber, setPaginationNumber] = useState(0);

    // Holds comments that belong to single post
    const [comments, setComments] = useState([]);

    // It detects fetched data count for solve the button message bug***
    const [fetchCount, setFetchCount] = useState(0);

    // To prevent the fetched count bug***
    useEffect(() => {
        if (isOpen === false) {
            setFetchCount(0);
            setComments([]);
            setCommentsLoading(true);
            setPaginationNumber(0);
        }
    }, [isOpen])

    useEffect(() => {
        if (props.isOpen) setIsOpen(props.isOpen);
    }, [props.isOpen])

    // useEffect(() => {
    //     console.log(comments);
    // }, [comments])

    useEffect(() => {
        if (isOpen === true) {
            getComments(token, {
                paginationNumber,
                ucAlldata_id: props.ucAlldata_id
            },
                (res) => {
                    if (res.data.length === 0 && fetchCount > 0) {
                        setButtonVisibility('invisible');
                        setButtonMessage('Daha fazla yorum bulunmamaktadır.')
                        return setCommentsLoading(false);
                    } else if (res.data.length === 0) {
                        setButtonVisibility('invisible');
                        setButtonMessage('Yorum bulunmamaktadır.')
                        return setCommentsLoading(false);
                    }
                    setComments(comments.concat(res.data));
                    if (res.data.length > 9) {
                        setButtonVisibility('visible');
                    }
                    setCommentsLoading(false);
                    setFetchCount(fetchCount + 1);
                },
                (err) => {
                    console.log(err);
            })
        }
    }, [paginationNumber, isOpen])

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const sendComment = (e) => {
        e.preventDefault();
        addComments(token, {
            ucAlldata_id: props.ucAlldata_id,
            comment,
            firebaseToken: "1",
            username,
            ownpost_id: props.ownpost_id,
            type_CEP: props.type_CEP
        },
            (res) => {
                console.log(res.data);
                history.push();
            },
            (err) => {
                console.log(err);
            })

        console.log('You have sent a comment!');
    }

    const removeComment = (e, comment) => {
        e.preventDefault();
        deleteComment(token, {
            ucAlldata_id: props.ucAlldata_id,
            comment,
            user_id: userId
        },
            (res) => {
                console.log(res.data);
                history.push();
            },
            (err) => {
                console.log(err);
            })

        console.log('You have deleted a comment!');
    }

    const increasePageNum = () => {
        setPaginationNumber(paginationNumber + 10);
        setCommentsLoading(true);
        setButtonVisibility('invisible');
    }

    const dateConverter = (dateVal) => {
        const date = new Date(dateVal);
        const year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        return dt + '.' + month + '.'+ year;
    }

    return (
        <Modal isOpen={isOpen}>
            <Row between style={{backgroundColor: '#151515', color: 'white', paddingTop: '10px', paddingRight: '20px', paddingLeft: '20px'}}>
                <Col xs="5" style={{marginLeft: '20px'}}>
                    <h1>Yorumlar</h1>
                </Col>
                <Col xs="3" onClick={() => toggle()} style={{marginRight: '20px'}}>
                    <Icon icon="times" />
                </Col>
            </Row>
            <Row style={{backgroundColor: '#151515', paddingRight: '20px', paddingLeft: '20px', paddingTop: '10px'}}>
                <Container style={{color: 'white'}}>
                    {
                        comments.map((comment) => (
                            <Fragment>
                                <Row between>
                                    <Col size="1" style={{marginRight: '-130px'}}>
                                        <img style={{width: '30px', height: '30px', borderRadius: '50%'}} src={`${comment.user_inf.profile_photo}`} alt=""/>
                                    </Col>
                                    <Col size="4">
                                        <a style={{fontSize: '14px'}} href={`/profile/${comment.user_inf.username}`}>@{comment.user_inf.username}</a>
                                    </Col>
                                    <Col size="3" style={{marginRight: '-10px'}}>
                                        <p style={{fontSize: '12px'}}>{dateConverter(comment.created_at)}</p>
                                    </Col>
                                </Row>
                                <Row between>
                                    <Col size="10">
                                        <p>{comment.comment}</p>
                                    </Col>
                                    {   
                                        userId === comment.user_inf._id &&
                                        <Col size="2">
                                            <p onClick={(e) => removeComment(e, comment.comment)} style={{color: 'cyan', fontSize: '10px', cursor: "pointer"}}>X</p>
                                        </Col>
                                    }
                                </Row>
                            </Fragment>
                        ))
                    }
                    {
                        commentsLoading &&
                            <div style={{textAlign: 'center', marginTop: '40px'}}>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                    }
                    {
                        buttonMessage && 
                        <Row center>
                            <Col md="8" style={{textAlign: 'center'}}>
                                <p>
                                    {buttonMessage}
                                </p>
                            </Col>
                        </Row>
                    }
                    <div style={{textAlign: 'center'}}>
                        <Btn className={buttonVisibility} onClick={() => increasePageNum()} style={{textTransform: 'none'}} size="sm" color="white">Daha Fazla</Btn>
                    </div>
                    <form onSubmit={(e) => sendComment(e)}>
                        <MDBInput style={{color: 'white'}} type="textarea" label="Yorumunuzu giriniz..." rows="2" onChange={(e) => {
                            setComment(e.target.value);
                        }} />
                        <Row style={{textAlign: 'center', marginTop: '10px', marginBottom: '25px'}}>
                            <Col>
                                <Btn color="white" type="submit" style={{textTransform: 'none', fontWeight: 'bold'}}>Gönder</Btn>
                            </Col>
                        </Row>
                    </form>
                </Container>
            </Row>
        </Modal>
    )
}

export default EditProfileModal;