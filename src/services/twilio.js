import axios from 'axios';

export const getTokenService = async (username, roomName) => {
    return await axios.post('api/video/get-token', {username, roomName})
    .then(res => res)
    .catch(err => {throw err})
}

