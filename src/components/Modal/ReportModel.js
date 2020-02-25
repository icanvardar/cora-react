import React, { useState, useEffect, useContext } from 'react';

import { MDBModal, MDBModalBody, MDBModalHeader, MDBRow as Row, MDBCol as Col, MDBIcon, MDBBtn as Btn } from 'mdbreact';

import { addReport } from '../../utils/apiRequests/connectionUser/complaint';

import Context from '../../utils/Context';

const ReportModal = (props) => {
    const { token } = useContext(Context);
    const [modal, setModal] = useState(props.isOpen);

    const [complaintType, setComplaintType] = useState('');

    // To navigate modal to other page
    const [nextPage, setNextPage] = useState(false);

    const [apiMessage, setApiMessage] = useState('');

    useEffect(() => {
        if (props.isOpen === true) {
            setModal(props.isOpen);
        }
    }, [props.isOpen])

    const toggle = () => {
        setModal(!modal);
        clearAllCachedStates();
    }

    const clearAllCachedStates = () => {
        setComplaintType('');
        setNextPage(false);
    }

    const report = () => {
        addReport(token, {
            complaint_type: complaintType,
            ucAlldata_id: props.ucAlldata_id
        },
            (res => {
                console.log(res.data);
                if (res.data === true) {
                    setApiMessage('Şikayetiniz başarıyla iletildi.')
                } else if(res.data === null) {
                    setApiMessage('Şikayetiniz iletilirken bir hata meydana geldi.')
                }
            }),
            (err => {
                console.log(err);
            })
        )
    }

    return (
        <div>
            <MDBModal size="sm" isOpen={modal} toggle={() => toggle()} centered>
                <MDBModalHeader style={{ backgroundColor: '#151515', height: '60px', color: 'white' }} toggle={() => toggle()}>Şikayet Et</MDBModalHeader>
                <MDBModalBody style={{ backgroundColor: '#151515', fontSize: '10px', color: 'white' }}>
                    {
                        nextPage === false && !apiMessage && 
                            <div style={{ fontSize: '15px' }}>
                                <div onClick={() => setComplaintType('Uygunsuz')} style={{ cursor: 'pointer' }}>
                                    {
                                        complaintType === "Uygunsuz" ? <li>Uygunsuz</li> : <p>Uygunsuz</p>
                                    }
                                </div>
                                <div onClick={() => setComplaintType('Spam')} style={{ cursor: 'pointer' }}>
                                    {
                                        complaintType === "Spam" ? <li>Spam</li> : <p>Spam</p>
                                    }
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Btn size="sm" color="white" style={{ textTransform: 'none' }} onClick={() => setNextPage(true)}>İleri</Btn>
                                </div>
                            </div>
                    }
                    {   
                        nextPage === true && !apiMessage && 
                            <div>
                                <p style={{fontSize: '15px'}}>Şikayet Etmek istediğinize emin misiniz?</p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Btn size="sm" color="danger" style={{ textTransform: 'none' }} onClick={() => toggle()}>Hayır</Btn>
                                    <Btn size="sm" color="success" style={{ textTransform: 'none' }} onClick={() => report()}>Evet</Btn>
                                </div>
                            </div>
                    }
                    {
                        apiMessage &&
                            <div>
                                <p style={{fontSize: '15px'}}>{apiMessage}</p>
                            </div>
                    }
                </MDBModalBody>
            </MDBModal>
        </div>
    )
}

export default ReportModal;