import React, {useState} from 'react'

const Participant = (key, participant, totalParticipant) => {
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);
    const currentUser 

    return (
        <div>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    username: state.options.username
})

export default Participant();