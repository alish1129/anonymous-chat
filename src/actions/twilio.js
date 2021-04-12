import { GET_TOKEN_KEY_SUCCESS } from ".";
import {getTokenService} from '../services/twilio';
import { showAlert } from "./alert";

export const getToken = (username, roomname) => dispatch => {
    return getTokenService(username, roomname).then(res => {
        dispatch({type: GET_TOKEN_KEY_SUCCESS, payload: {token: res.data, roomname, username}})
        return res.data;
    }).catch(err => {
        console.log(err.message);
        dispatch(showAlert("Could not fetch token.", "error"))
        return err
    })
}