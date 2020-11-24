import {SET_CONFIG} from '../action/ConfigAction';

const initialState = {
    servers: [],
    connectors: [],
    messages: [],
}

const configReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_CONFIG:
            return {
                ...state,
                ...payload,
            };
    
        default:
            return state;
    }
};

export default configReducer;
