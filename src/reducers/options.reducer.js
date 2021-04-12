import {TOGGLE_MIC, TOGGLE_VIDEO, SAVE_INFO} from '../actions'

const INITIAL_STATE = {
    muteMic: true,
    videoOff: false
}

export default (state = INITIAL_STATE, {type, payload}) => {
    switch(type) {
        case TOGGLE_MIC:
            return {...state, muteMic: !state.muteMic}
        case TOGGLE_VIDEO:
            return {...state, videoOff: !state.videoOff}
        case SAVE_INFO:
            return {...state, username: payload.username, roomname: payload.roomname}
        default: 
            return state;
    }
}