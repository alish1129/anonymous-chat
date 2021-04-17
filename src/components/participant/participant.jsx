import React, {useState, useRef, useEffect} from 'react'
import { Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import './Participant.css'

const Participant = (props) => {

    console.log(props);
    const {key, participant, totalParticipant} = props;
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);
    const currentUser = props.username;

    const videoRef = useRef()
    const audioRef = useRef()

    const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);


    useEffect(() => {
        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        const trackSubscribed = (track) => {
        if (track.kind === "video") {
            setVideoTracks((videoTracks) => [...videoTracks, track]);
        } else if (track.kind === "audio") {
            setAudioTracks((audioTracks) => [...audioTracks, track]);
        }
        };

        const trackUnsubscribed = (track) => {
        if (track.kind === "video") {
            setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
        } else if (track.kind === "audio") {
            setAudioTracks((audioTracks) => videoTracks.filter((a) => a !== track));
        }
        };
        participant.on("trackSubscribed", trackSubscribed);
        participant.on("trackUnsubscribed", trackUnsubscribed);

        return () => {
        setVideoTracks([]);
        setAudioTracks([]);
        participant.removeAllListeners();
        };
    }, [participant]);

    useEffect(() => {
        const videoTrack = videoTracks[0];

        if (videoTrack) {
        videoTrack.attach(videoRef.current);
        return () => {
            videoTrack.detach();
        };
        }
    }, [videoTracks]);

    useEffect(() => {
        const audioTrack = audioTracks[0];

        if (audioTrack) {
        audioTrack.attach(videoRef.current);
        return () => {
            audioTrack.detach();
        };
        }
    }, [audioTracks]);


    return (
        <div className= {`${props.className} participant-video-container`}>
            <p className="participant-name">
                {participant.identity === currentUser
                    ? "You"
                    : participant.identity}
            </p>
            <video className="video" ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    username: state.options.username,
    muted: state.options
})

export default connect(mapStateToProps, {}) (Participant);