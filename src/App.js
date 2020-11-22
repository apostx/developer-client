import config from './config.json';
import _ from 'lodash';
import 'semantic-ui-css/semantic.min.css';
import { useEffect, useRef } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Container, Input, List, Segment, Grid, Header, Menu, Ref, Sticky, Rail, Placeholder, Button, Dropdown, Select, Message, Sidebar, Icon } from 'semantic-ui-react';

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function DynamicMessageElement({onSend}) {
    const message = useSelector((state) => state.dynamicMessage);
    const dispatch = useDispatch();
    const onChange = (event) => dispatch({type: 'DYNAMIC_MESSAGE_CHANGED', payload: {dynamicMessage: event.target.value}});
    
    return (
        <Segment>
            <Grid>
                <Grid.Column width={16}><Input fluid value={message} onChange={onChange} action={{color: 'teal',content: 'Send', onClick: () => onSend(message)}} placeholder='Message...' /></Grid.Column>
            </Grid>
        </Segment>
    );
}

function StaticMessageElement({label, message, onSend}) {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={3} ><Input disabled value={label} fluid /></Grid.Column>
                <Grid.Column width={11}><Input value={message} fluid action={{color: 'teal', icon: 'copy', onClick: () => copyToClipboard(message)}} /></Grid.Column>
                <Grid.Column textAlign='right' width={2} ><Button basic color='teal' content='Send' onClick={() => onSend(message)} /></Grid.Column>
            </Grid>
        </Segment>
    );
}

function LogElement({type, children}) {
    let conf = {color: 'brown', icon: 'computer'};
    switch (type) {
        case 'outgoing':
            conf = {color: 'orange', icon: 'arrow up'};
            break;
        case 'incoming':
            conf = {color: 'yellow', icon: 'arrow down'};
            break;
    }
    
    return (
        <Menu.Item><Message style={{ overflow: 'auto', userSelect: true, maxHeight: '50vh' }} color={conf.color} floating><Icon name={conf.icon}/>{children}</Message></Menu.Item>
    );
}

function TopMenu() {
    const server = useSelector((state) => state.server);
    const dispatch = useDispatch();
    
    const onServerChange = (event) => dispatch({type: 'SERVER_CHANGED', payload: {server: event.target.value}});
    const onConnectClick = () => dispatch({type: 'CONNECT', payload: {server}});
    const onDisconnectClick = () => dispatch({type: 'DISCONNECT', payload: {server}});
   
    const servers = config.servers.map(server => (<option value={server}>{server}</option>));
    const connectors = config.connectors.map(connector => ({key: connector, value: connector, text: connector}));
    const defaultConnector = config.connectors.length > 0 ? config.connectors[0] : '';
    
    return (
        <Sidebar as={Menu} direction='top' visible>
            <Menu.Item position="left"></Menu.Item>
            <Menu.Item header><Button content='Connect' onClick={onConnectClick} /></Menu.Item>
            <Menu.Item header><Button content='Disconnect' onClick={onDisconnectClick} /></Menu.Item>
            <Menu.Item header>
                <Input icon='rss' value={server} onChange={onServerChange} placeholder='Choose a server address...' list='serverAdressList' />
                <datalist id='serverAdressList'>{servers}</datalist>
            </Menu.Item>
            <Menu.Item header><Select value={defaultConnector} options={connectors} /></Menu.Item>
            <Menu.Item position="right"></Menu.Item>
        </Sidebar>
    );
}

function RightMenu() {
    const logs = useSelector((state) => state.logs);
    const logElements = logs.map(({type, message}) => (<LogElement type={type}>{message}</LogElement>));
    
    return (
        <Sidebar as={Menu} direction='right' vertical visible width='wide'>
            {_.times(3, (i) => (<Menu.Item><Placeholder key={i} /></Menu.Item>))}
            {logElements}
        </Sidebar>
    );
}

function Content() {
    const dispatch = useDispatch();
    const onSend = (message) => dispatch({type: 'SEND_MESSAGE', payload: {message}});
    
    const messages = config.messages.map(({message, label}) => (<StaticMessageElement label={label} message={message} onSend={onSend}/>));
    
    return (
        <Container style={{ margin: 20 }}>
            {_.times(3, (i) => (<Placeholder key={i} />))}
            <DynamicMessageElement onSend={onSend} />
            {messages}
        </Container>
    );
}

function App() {
    return (
        <>
            <Content />
            <RightMenu />
            <TopMenu />
        </>
    );
};

let websocket = null;

const websocketMiddleWare = ({dispatch}) => (next) => (action) => {
    switch (action.type) {
        case 'CONNECT':
            if (!websocket) {
                websocket = new WebSocket(action.payload.server);
                
                websocket.onopen = () => dispatch({type: 'LOG', payload: {type: 'system', message: 'CONNECTED'}});
                websocket.onclose = () => dispatch({type: 'LOG', payload: {type: 'system', message: 'DISCONNECTED'}});
                websocket.onmessage = (event) => dispatch({type: 'LOG', payload: {type: 'incoming', message: event.data}});
                websocket.onerror = (event) => dispatch({type: 'LOG', payload: {type: 'system', message: event.data}});
            }
            break;
        case 'DISCONNECT':
            if (websocket) {
                websocket.close();
                websocket = null;
                //dispatch({type: 'LOG', payload: {type: 'system', message: 'DISCONNECTED'}});
            }
        case 'SEND_MESSAGE':
            if (websocket) {
                const message = action.payload.message;
                websocket.send(message);
                dispatch({type: 'LOG', payload: {type: 'outgoing', message}});
            }
    }

    next(action);
};

const messageReducer = (state = {logs: [], dynamicMessage: '', server: ''}, action) => {
    switch (action.type) {
        case 'DYNAMIC_MESSAGE_CHANGED':
            return {
                ...state,
                ...action.payload,
            };
        case 'SERVER_CHANGED':
            return {
                ...state,
                ...action.payload,
            };
        case 'LOG':
            const logs = [...state.logs];
            logs.push(action.payload);

            return {
                ...state,
                logs,
            };

        default:
            return state;
    }
};

const store = createStore(
    messageReducer,
    applyMiddleware(websocketMiddleWare),
);

function App2() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default App2;
