export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const connect = (server) => ({type: CONNECT, payload: {server}});
export const disconnect = () => ({type: DISCONNECT});
export const sendMessage = (message) => ({type: SEND_MESSAGE, payload: {message}});
