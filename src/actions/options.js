import {TOGGLE_MIC, TOGGLE_VIDEO, SAVE_INFO} from '.';

export const toggleMic = () => dispatch => {
    dispatch({type: TOGGLE_MIC})
}
export const toggleVideo = () => dispatch => {
    dispatch({type: TOGGLE_VIDEO})
}
export const setRoomInfo = (username, roomname) => dispatch => {
    dispatch({type: SAVE_INFO, payload: {username, roomname}})
}

