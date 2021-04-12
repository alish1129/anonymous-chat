import { SHOW_ALERT_NOTIFICATION, DELETE_ALERT_NOTIFICATION } from "../actions";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
    switch(type) {
        case SHOW_ALERT_NOTIFICATION:
            return [...state, payload];
        case DELETE_ALERT_NOTIFICATION:
            return state.filter(alert => alert.id !== payload)
        default: 
            return state;
    }
}