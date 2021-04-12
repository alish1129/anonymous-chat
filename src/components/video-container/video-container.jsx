import { FiberPinTwoTone } from '@material-ui/icons';
import React, {useState, useEffect} from 'react';
// eslint-disable-next-line
import {connect} from 'react-redux';
import Video from 'twilio-video';
import {showAlert} from '../../actions/alert';
import { getToken } from '../../actions/twilio';
import Room from "../room/room";
import './video-container.css';

const VideoContainer = (props) => {
    // eslint-disable-next-line
    const {roomname, username, videoOff, muteMic} = props.options
    const [room, setRoom] = useState({})
    console.log(props);
    useEffect(() => {
        
        getApiToken()
        
    }, [username])

    const getApiToken = () => {
        props.getToken(username, roomname).then(data => {
            Video.connect(data.token, { name: roomname, video: !videoOff, audio: !muteMic }).then(roomData => {
                setRoom(roomData);
                console.log(roomData);
                roomData.on('participantConnected', participant => {
                    let participantUsername = participant.identity.split("-")[0];
                    console.log(participantUsername);
                    props.showAlert( `A remote Participant connected: ${participantUsername}`, 'success')
                });
            }, error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            });
        })
    }

    const renderElement = () => {
        console.log("line" + room);
        return (
            room ? (<Room roomname={roomname} room={room} className="room" />):""
        )
    }

    return (
        <div>
            {renderElement}
        </div>
         
    )
}

const mapStateToProps = (state) => ({
    token: state.twilio.token,
    options: state.options
})

export default connect(mapStateToProps, {showAlert, getToken, showAlert})(VideoContainer);