import React, { useState, useEffect, useContext } from 'react';

import { history } from '../../App';

import { MDBInput as Input, MDBIcon, MDBRow as Row, MDBCol as Col, MDBBtn as Btn, MDBIcon as Icon, MDBModal as Modal, MDBModalHeader as ModalHeader, MDBModalBody as ModalBody } from 'mdbreact';

const BlockFeedbackModal = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [blockedUserUsername, setBlockedUserUsername] = useState();

    useEffect(() => {
        setIsOpen(props.isOpen);
    }, [props.isOpen])

    useEffect(() => {
        setBlockedUserUsername(props.blockedUserUsername);
    }, [props.blockedUserUsername])

    return (
        <Modal isOpen={isOpen} style={{ backgroundColor: 'black' }} centered>
            <ModalHeader style={{ backgroundColor: '#151515', height: '60px', color: 'white' }} toggle={() => history.push('/settings')}>Onay</ModalHeader>
            <ModalBody style={{ backgroundColor: '#151515' }}>
                <p style={{marginLeft: '10px'}}>{`@${props.blockedUserUsername} adlı kullanıcıyı engellediniz. Artık bu kullanıcının profilini göremeyecek ve bildirimlerini almayacaksınız.`}</p>
                <div style={{textAlign: 'center'}}>
                    <Btn size="sm" color="success" onClick={() => history.push('/settings')}>Tamam</Btn>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default BlockFeedbackModal;