const initialState = {
    server: localStorage.getItem('serverUrl') || '',
}

const menuReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'SERVER_CHANGED':
            localStorage.setItem('serverUrl', payload.server);

            return {
                ...state,
                ...payload,
            };
    
        default:
            return state;
    }
};

export default menuReducer;
