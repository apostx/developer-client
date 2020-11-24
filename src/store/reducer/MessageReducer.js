const initialState = {
    dynamicMessage: localStorage.getItem('customMessage') || '',
}

const messageReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'DYNAMIC_MESSAGE_CHANGED':
            localStorage.setItem('customMessage', payload.dynamicMessage);

            return {
                ...state,
                ...payload,
            };

        default:
            return state;
    }
};

export default messageReducer;
