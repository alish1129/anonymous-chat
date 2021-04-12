import React, {useEffect} from 'react'

const Room = (props) => {
    console.log(props);
    useEffect(() => {
        console.log(props.room);
    }, [props.room])
    console.log(props);
    return (
        <div></div>
    )
}

export default Room;