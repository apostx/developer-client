import {ADD_LOG} from '../action/LogAction';

const initialState = {
    logs: [],
}

const logReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_LOG:
            const logs = [...state.logs];
            logs.push(payload);
    
            return {
                ...state,
                logs,
            };
    
        default:
            return state;
    }
};

export default logReducer;
