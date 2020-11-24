const initialState = {
    servers: [],
    connectors: [],
    messages: [],
}

const configReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'CONFIG_CHANGED':
            return {
                ...state,
                ...payload,
            };
    
        default:
            return state;
    }
};

export default configReducer;
