import { SHOW_ALERT_NOTIFICATION, DELETE_ALERT_NOTIFICATION } from "./index";
import {v4 as uuidv4} from 'uuid';

export const showAlert = (alertMessage, alertType) => dispatch => {
    const id = uuidv4();
    dispatch({type: SHOW_ALERT_NOTIFICATION, payload: {alertType, alertMessage, id}});

    setTimeout(
        () => dispatch({
            type: DELETE_ALERT_NOTIFICATION,
            payload: id
        }),
        3000
    );
}
