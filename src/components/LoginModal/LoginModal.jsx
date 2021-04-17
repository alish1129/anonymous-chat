import React, {useEffect,useState} from 'react'

import { Button, ButtonGroup, IconButton, TextField, Grid, Card, CardContent } from '@material-ui/core';
import { createLocalVideoTrack } from 'twilio-video';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';
import './LoginModal.css';
import { showAlert } from '../../actions/alert';
import { getToken } from '../../actions/twilio';
import { toggleMic, toggleVideo, setRoomInfo } from '../../actions/options';
import { connect } from 'react-redux';
import {v4 as uuidv4} from 'uuid';

const LoginModal = (props) => {
    const roomnameThroughInvite = props.match?.params.roomname;
    const [roomId, setRoomId] = useState(roomnameThroughInvite ? roomnameThroughInvite: uuidv4()); 
    const [buttonTitle, setButtonTitle] = useState(roomnameThroughInvite ? "Accept Invite": "Start new call"); 
    
    const [username, setUsername] = useState('');

    useEffect(() => {

        createLocalVideoTrack().then(track => {
            const localMediaContainer = document.getElementById('local-preview');
            if (!localMediaContainer.firstChild) {
                localMediaContainer.appendChild(track.attach());
            }
        })
    }, [])

    const onFormSubmit = () => {
        if (username && roomId) {
            props.setRoomInfo(username, roomId);
            props.history.push('/video/' + roomId);
        } else {
            
        }
    }
    
    return (
        <main className="main">

            <Card variant="outlined" className="login-container">
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <div id="local-preview"></div>
                        </Grid>
                        <div className="form-options">
                            <div className="row">
                                <div className="col">
                                    <TextField id="username" label="Username" onChange={(e) => {setUsername(e.target.value)}} />
                                </div>
                                <div className="col">
                                        <ButtonGroup>
                                            {props.options.muteMic? 
                                            (<IconButton aria-label="Unmute" onClick={props.toggleMic}>
                                                <MicOffRoundedIcon className="muted-mic" />
                                            </IconButton>) :
                                            <IconButton aria-label="Mute" onClick={props.toggleMic}>
                                                <MicRoundedIcon className="unmuted-mic" />
                                            </IconButton>}
                                            {props.options.videoOff? 
                                            (<IconButton aria-label="Unmute" onClick={props.toggleVideo}>
                                                <VideocamOffRoundedIcon className="muted-mic" />
                                            </IconButton>) :
                                            <IconButton aria-label="Mute" onClick={props.toggleVideo}>
                                                <VideocamRoundedIcon className="unmuted-mic" />
                                            </IconButton>}
                                        </ButtonGroup>                
                                    </div>
                                <div className="col">
                                    <TextField id="roomname" label="Room Id" value={roomId} />
                                </div>
                            </div>
                            <div className="row" >
                                <ButtonGroup className="start-button-container">
                                    <Button variant="contained" color="primary" onClick={onFormSubmit}>{buttonTitle}</Button>
                                </ButtonGroup>
                            </div>
                        </div>   
                    </Grid>
                </CardContent>
            </Card>
        </main>

    ) 
}

const mapStateToProps = (state) => ({
    options: state.options,
});

export default connect(mapStateToProps, {showAlert, getToken, toggleMic, toggleVideo, setRoomInfo}) (LoginModal);