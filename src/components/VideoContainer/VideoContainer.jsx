import React, {useState, useEffect} from 'react';
// eslint-disable-next-line
import {connect} from 'react-redux';
import Video from 'twilio-video';
import {showAlert} from '../../actions/alert';
import { getToken } from '../../actions/twilio';
import Room from "../Room/Room";
import './VideoContainer.css';

const VideoContainer = (props) => {
    console.log("Video Container");
    // eslint-disable-next-line
    const {roomname, username, videoOff, muteMic} = props.options
    const [room, setRoom] = useState()
    useEffect(() => {  
        props.getToken(username, roomname).then(data => {
            
            Video.connect(data.token, { name: roomname, video: !videoOff, audio: !muteMic }).then(roomData => {
                console.log(roomData);
                setRoom(roomData);
                roomData.on('participantConnected', participant => {
                    let participantUsername = participant.identity.split("-")[0];
                    props.showAlert( `A remote Participant connected: ${participantUsername}`, 'success')
                });
            }, error => {
                console.error(`Unable to connect to Room: ${error.message}`);
                props.showAlert(`Unable to connect to Room: ${error.message}`, 'error');
                props.history.push('/start-new');
            });
        })
    }, [username, roomname])

    const renderElement = () => {

        let elementToRender;

        if (room) {
            elementToRender = (<Room roomname={roomname} room={room} className="room" />);
        } else {
            elementToRender = (<div>Please wait. Fetching room</div>)
        }

        return elementToRender;
    }

    return (
        <>
            {renderElement()}
        </>
         
    )
}

const mapStateToProps = (state) => ({
    token: state.twilio.token,
    options: state.options
})

export default connect(mapStateToProps, {showAlert, getToken, showAlert})(VideoContainer);