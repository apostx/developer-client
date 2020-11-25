export const ADD_LOG = 'ADD_LOG';

export const addLog = (type, message) => ({type: ADD_LOG, payload: {type, message}});
