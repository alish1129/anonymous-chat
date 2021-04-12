import {GET_TOKEN_KEY_SUCCESS, DELETE_TOKEN_KEY} from '../actions'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, {type, payload }) => {
    switch(type) {
        case GET_TOKEN_KEY_SUCCESS:
            return {...state, token: payload.token.token, username: payload.username, roomname: payload.roomname};
        case DELETE_TOKEN_KEY:
            return {...state, token: null}
        default: 
            return state;
    }
}