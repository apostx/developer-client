import _ from 'lodash';
import 'semantic-ui-css/semantic.min.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Input, Segment, Grid, Menu, Placeholder, Button, Select, Message, Sidebar, Icon } from 'semantic-ui-react';

import {GetDynamicMessage} from './store/selector/MessageSelector';
import {GetLogs} from './store/selector/LogSelector';
import {GetServer} from './store/selector/MenuSelector';
import {
    GetServers,
    GetConnectors,
    GetMessages,
} from './store/selector/ConfigSelector';

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function DynamicMessageElement({onSend}) {
    const message = useSelector(GetDynamicMessage);
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

        default:
    }
    
    return (
        <Menu.Item><Message style={{ overflow: 'auto', userSelect: true, maxHeight: '50vh' }} color={conf.color} floating><Icon name={conf.icon}/>{children}</Message></Menu.Item>
    );
}

function TopMenu() {
    const serverList = useSelector(GetServers);
    const connectorList = useSelector(GetConnectors);
    const server = useSelector(GetServer);
    const dispatch = useDispatch();
    
    const onServerChange = (event) => dispatch({type: 'SERVER_CHANGED', payload: {server: event.target.value}});
    const onConnectClick = () => dispatch({type: 'CONNECT', payload: {server}});
    const onDisconnectClick = () => dispatch({type: 'DISCONNECT', payload: {server}});
   
    const servers = serverList.map(server => (<option value={server}>{server}</option>));
    const connectors = connectorList.map(connector => ({key: connector, value: connector, text: connector}));
    const defaultConnector = connectorList.length > 0 ? connectorList[0] : '';
    
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
    const logs = useSelector(GetLogs);
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

    const messageList = useSelector(GetMessages);

    const onSend = (message) => dispatch({type: 'SEND_MESSAGE', payload: {message}});
    
    const messages = messageList.map(({message, label}) => (<StaticMessageElement label={label} message={message} onSend={onSend}/>));
    
    return (
        <Container style={{ margin: 20 }}>
            {_.times(3, (i) => (<Placeholder key={i} />))}
            <DynamicMessageElement onSend={onSend} />
            {messages}
        </Container>
    );
}

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('config.json')
            .then(response => response.json())
            .then(config => dispatch({type: 'CONFIG_CHANGED', payload: config}));
    }, [dispatch]);

    return (
        <>
            <Content />
            <RightMenu />
            <TopMenu />
        </>
    );
};

export default App;
