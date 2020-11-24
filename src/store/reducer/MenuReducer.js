import {SET_SERVER_URL} from '../action/SettingsAction';

const initialState = {
    serverUrl: localStorage.getItem('serverUrl') || '',
}

const menuReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_SERVER_URL:
            localStorage.setItem('serverUrl', payload.serverUrl);

            return {
                ...state,
                ...payload,
            };
    
        default:
            return state;
    }
};

export default menuReducer;
