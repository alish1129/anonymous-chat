import { Fab, Button, ButtonGroup, TextareaAutosize, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';
import { connect } from 'react-redux';

import {toggleMic, toggleVideo} from '../../actions/options';
import {sendTextInvite} from '../../actions/twilio';
import "./Footer.css";
import { Col, Row } from 'react-flexbox-grid';

const Footer = (props) => {
    const {room, username, roomname, options} = props;

    const [phoneNumber, setPhoneNumber] = useState()
    const [url, setUrl] = useState(`http://localhost:3000/#/acceptInvite/` + options.roomname)

    const muteMic = () => {
        console.log(room);
        room.localParticipant.audioTracks.forEach(publication => {
            publication.track.disable()
        });
        props.toggleMic()
    }

    const unmuteMic = () => {
        console.log(room);
        room.localParticipant.audioTracks.forEach(publication => {
            publication.track.enable()
        });
        props.toggleMic()
    }

    const turnOffCamera = () => {
        console.log(room);
        room.localParticipant.videoTracks.forEach(publication => {
            publication.track.disable()
        });
        props.toggleVideo()

    }

    const turnOnCamera = () => {
        console.log(room);
        room.localParticipant.videoTracks.forEach(publication => {
            publication.track.enable()
        });
        props.toggleVideo()

    }

    const sendInvite = () => {
        props.sendTextInvite(phoneNumber, url)
    }

    const disconnect = () => {

    }

    return (
        <div className="footer" >
            <Row>
                <Col md={4}>
                    <TextField disabled className="invite-url-box" label="Invite Url" variant="outlined" value={url} />
                </Col>
                <Col md={4}>
                    <div className="control-buttons col"
                    >
                        {options.muteMic ? (<Fab label="Mic muted" size="large" onClick={unmuteMic} > <MicOffRoundedIcon className="muted-mic"  /></Fab> ): (<Fab size="large"  label="Mute Mic" onClick={muteMic}  children={<MicRoundedIcon className="unmuted-mic" />}/>)}
                        <Fab size="large"  label="End Call" children={<CallEndRoundedIcon className="muted-mic" />} onClick={disconnect} />
                        {options.videoOff ? (<Fab size="large"  label="Video Turned Off" children={<VideocamOffRoundedIcon className="muted-mic" />} onClick={turnOnCamera} />): (<Fab size="large"  label="Video Turned On" children={<VideocamRoundedIcon className="unmuted-mic" onClick={turnOffCamera} />} />)}
                    </div>
                </Col>
                <Col md={4}>
                    <TextField className="phone-invite" placeholder="" label="Send Invite" variant="outlined" helperText="Enter a phone number to invite" onChange={(e) => setPhoneNumber(e.target.value)} />
                    <Button className="invite-button" variant="contained" color="primary" onClick={() => {sendInvite()}}> Invite </Button>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({
    options: state.options
})

export default connect(mapStateToProps, {toggleMic, toggleVideo, sendTextInvite}) (Footer);