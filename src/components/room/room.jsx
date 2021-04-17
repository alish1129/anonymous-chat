import React, {useEffect, useState} from 'react'
import { Row } from 'react-flexbox-grid';
import Footer from '../Footer/Footer';
import Participant from '../Participant/Participant';
import './Room.css'

const Room = (props) => {
    const [room, setstate] = useState(props.room)

    const [participants, setParticipants] = useState([]);

    console.log(room);

    useEffect(() => {
        const participantConnected = (participant) => {
            setParticipants((prevParticipants) => [...prevParticipants, participant]);
          };
      
          const participantDisconnected = (participant) => {
            setParticipants((prevParticipants) =>
              prevParticipants.filter((p) => p !== participant)
            );
          };

        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        room.participants.forEach(participantConnected);

        return () => {
        room.off("participantConnected", participantConnected);
        room.off("participantDisconnected", participantDisconnected);
        };
    }, [props.room])

    const remoteParticpants = participants.map((participant) => (
        <Participant className="remote-participant" key={participant.id} participant={participant} />
      ));

    return (
        <div className="room">
            <Row className="video-row">
                {room && (
                    <Participant className="local-participant" key={room.localParticipant.sid} participant={room.localParticipant} />
                )}
                {remoteParticpants}
            </Row>
            <Footer room={props.room} />
        </div>
    )
}

export default Room;