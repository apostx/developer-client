import {SET_DYNAMIC_MESSAGE} from '../action/MessageAction';

const initialState = {
    dynamicMessage: localStorage.getItem('dynamicMessage') || '',
}

const messageReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'SET_DYNAMIC_MESSAGE':
            localStorage.setItem('dynamicMessage', payload.dynamicMessage);

            return {
                ...state,
                ...payload,
            };

        default:
            return state;
    }
};

export default messageReducer;
