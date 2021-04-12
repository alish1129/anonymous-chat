import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import alertReducer from './alert.reducer';
import optionsReducer from './options.reducer';
import twilioReducer from './twilioReducer';

const rootReducer = combineReducers({
    form: formReducer,
    alert: alertReducer,
    twilio: twilioReducer,
    options: optionsReducer
});

export default rootReducer;
