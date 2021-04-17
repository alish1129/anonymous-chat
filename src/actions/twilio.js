import { GET_TOKEN_KEY_SUCCESS } from ".";
import { showAlert } from "./alert";
import axios from 'axios';

export const getToken = (username, roomname) => async (dispatch) => {
    const response = await axios.post('api/video/get-token', {username, roomname})
        .then(res => res.data)
        .then(data => {
        dispatch({type: GET_TOKEN_KEY_SUCCESS, payload: {token: data, roomname, username}})
        return data;
    }).catch(err => {
        console.log(err.message);
        dispatch(showAlert("Could not fetch token.", "error"))
        return err
    })
    return response;
}

export const sendTextInvite = (phone, url) => async (dispatch) => {
    const response = await axios.post('api/sms/invite', ({phone, url}))
        .then(({data}) => data.message)
        .then((message) => {
            console.log(message);
            if (!message?.errorCode) {
                dispatch(showAlert("Invite sent", "success"))
            }
        })
    
}