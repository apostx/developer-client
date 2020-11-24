let websocket = null;

const websocketMiddleware = ({dispatch}) => (next) => (action) => {
    switch (action.type) {
        case 'CONNECT':
            if (!websocket) {
                try {
                    websocket = new WebSocket(action.payload.server);
                } catch(error) {
                    dispatch({type: 'LOG', payload: {type: 'system', message: error.message}});
                    break;
                }
                
                websocket.onopen = () => dispatch({type: 'LOG', payload: {type: 'system', message: 'CONNECTED'}});
                
                websocket.onmessage = (event) => dispatch({type: 'LOG', payload: {type: 'incoming', message: event.data}});
                
                websocket.onerror = (event) => {
                    websocket = null;
                    dispatch({type: 'LOG', payload: {type: 'system', message: event}});
                }

                websocket.onclose = () => {
                    websocket = null;
                    dispatch({type: 'LOG', payload: {type: 'system', message: 'DISCONNECTED'}});
                }
            }
            break;
        case 'DISCONNECT':
            if (websocket) {
                websocket.close();
                websocket = null;
                //dispatch({type: 'LOG', payload: {type: 'system', message: 'DISCONNECTED'}});
            }
            break;
        case 'SEND_MESSAGE':
            if (websocket) {
                const message = action.payload.message;
                websocket.send(message);
                dispatch({type: 'LOG', payload: {type: 'outgoing', message}});
            }
            break;
        default:
    }

    next(action);
};

export default websocketMiddleware;
