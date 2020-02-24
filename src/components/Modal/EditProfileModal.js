import React, { useState, useEffect, useContext } from 'react';
import { MDBContainer as Container, MDBBtn as Btn, MDBModal as Modal, MDBRow as Row, MDBCol as Col, MDBIcon as Icon, MDBInput } from 'mdbreact';

import axios from 'axios';

import Context from '../../utils/Context';
import { history } from '../../App';

import ImageUploader from 'react-images-upload';

import { update } from '../../utils/apiRequests/userwithtoken';

const EditProfileModal = (props) => {
    const { token } = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState({});

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [spotifyUsername, setSpotifyUsername] = useState('');
    const [instagramUsername, setInstagramUsername] = useState('');
    const [twitterUsername, setTwitterUsername] = useState('');

    // For image uploading
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    useEffect(() => {
        if (props.isOpen === true) {
            setIsOpen(props.isOpen);
        }
    }, [props.isOpen])

    useEffect(() => {
        setUserData({ ...props.userData });
        console.log(userData);
    }, [props.userData])


    const fileChangedHandler = event => {
        setSelectedFile(event[0]);

        let reader = new FileReader();

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        }

        reader.readAsDataURL(event[0])

    }

    const submitPhoto = async () => {
        var fd = new FormData();

        fd.append('photo', selectedFile);

        let data = fd;

        await axios.post('https://cora-photo-server.herokuapp.com/images/upload', data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const editProfile = async () => {
        let data = {};

        if (selectedFile !== null) {
            await submitPhoto();
        } if (name.length !== 0) {
            data = { ...data, name: name }
        } if (surname.length !== 0) {
            data = { ...data, surname: surname }
        } if (username.length !== 0) {
            data = { ...data, username: username }
        } if (spotifyUsername.length !== 0) {
            data = { ...data, spotifyUsername: spotifyUsername }
        } if (instagramUsername.length !== 0) {
            data = { ...data, instagramUsername: instagramUsername }
        } if (twitterUsername.length !== 0) {
            data = { ...data, twitterUsername: twitterUsername }
        }

        if (data.length !== 0) {
            update(token, data,
                (res) => {
                    console.log(res.data);
                    history.push('/profile/me');
                },
                (err) => {
                    console.log(err);
                })
        }
    }

    return (
        <Modal isOpen={isOpen}>
            <Row between style={{ backgroundColor: '#151515', color: 'white', paddingTop: '10px', paddingRight: '20px', paddingLeft: '20px' }}>
                <Col xs="5" style={{ marginLeft: '20px' }}>
                    <h1>Profili Düzenle</h1>
                </Col>
                <Col xs="3" onClick={() => toggle()} style={{ marginRight: '20px', cursor: 'pointer'}}>
                    <Icon icon="times" />
                </Col>
            </Row>
            <Row style={{ backgroundColor: '#151515', paddingRight: '20px', paddingLeft: '20px', paddingTop: '10px' }}>
                <Container style={{ color: 'white' }}>
                    <Row>
                        <Col>
                            <ImageUploader
                                withIcon={true}
                                buttonText='Resim Seç'
                                onChange={(e) => fileChangedHandler(e)}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                withPreview={true}
                                label={null}
                                labelStyles={{ color: "black", fontWeight: "bold" }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MDBInput style={{ color: 'white' }} hint={`${userData.name}`} onChange={(e) => setName(e.target.value)} label="Ad" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MDBInput style={{ color: 'white' }} hint={`${userData.surname}`} onChange={(e) => setSurname(e.target.value)} label="Soyad" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MDBInput style={{ color: 'white' }} hint={`${userData.username}`} onChange={(e) => setUsername(e.target.value)} label="Kullanıcı Adı" />
                        </Col>
                    </Row>
                    <Row between style={{ textAlign: 'center' }}>
                        <Col size="2">
                            <img style={{ marginTop: '40px', width: '25px', height: '25px' }} src={require('../../assets/images/spotify.png')}></img>
                        </Col>
                        <Col size="4" style={{ marginTop: '40px' }}>
                            <p>open.spotify.com/user/</p>
                        </Col>
                        <Col size="4" style={{ marginLeft: '50px', marginTop: '2px' }}>
                            <MDBInput style={{ color: 'white' }} hint={`${userData.spotifyUsername}`} onChange={(e) => setSpotifyUsername(e.target.value)} label="Kullanıcı Adı" />
                        </Col>
                    </Row>
                    <Row between style={{ textAlign: 'center' }}>
                        <Col size="2">
                            <img style={{ marginTop: '40px', width: '25px', height: '25px' }} src={require('../../assets/images/instagram.png')}></img>
                        </Col>
                        <Col size="4" style={{ marginTop: '40px' }}>
                            <p>www.instagram.com/</p>
                        </Col>
                        <Col size="4" style={{ marginLeft: '50px', marginTop: '2px' }}>
                            <MDBInput style={{ color: 'white' }} hint={`${userData.instagramUsername}`} onChange={(e) => setInstagramUsername(e.target.value)} label="Kullanıcı Adı" />
                        </Col>
                    </Row>
                    <Row between style={{ textAlign: 'center' }}>
                        <Col size="2">
                            <img style={{ marginTop: '40px', width: '25px', height: '25px' }} src={require('../../assets/images/twitter.png')}></img>
                        </Col>
                        <Col size="4" style={{ marginTop: '40px' }}>
                            <p>www.twitter.com/</p>
                        </Col>
                        <Col size="4" style={{ marginLeft: '50px', marginTop: '2px' }}>
                            <MDBInput style={{ color: 'white' }} hint={`${userData.twitterUsername}`} onChange={(e) => setTwitterUsername(e.target.value)} label="Kullanıcı Adı" />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center', marginTop: '10px', marginBottom: '25px' }}>
                        <Col>
                            <Btn color="white" type="submit" onClick={() => editProfile()} style={{ textTransform: 'none', fontWeight: 'bold' }}>Kaydet</Btn>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Modal>
    )
}

export default EditProfileModal;