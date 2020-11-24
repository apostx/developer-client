const GetServers = (state) => state.configReducer.servers;
const GetConnectors = (state) => state.configReducer.connectors;
const GetMessages = (state) => state.configReducer.messages;

export {
    GetServers,
    GetConnectors,
    GetMessages,
};
