import { useSelector, useDispatch } from 'react-redux';
import { Input, Menu, Button, Select, Sidebar } from 'semantic-ui-react';

import {GetServerUrl} from '../../store/selector/MenuSelector';
import {
    GetServers,
    GetConnectors,
} from '../../store/selector/ConfigSelector';

import { connect, disconnect, sendMessage } from "../../store/action/ConnectionAction";
import { setServerUrl } from "../../store/action/SettingsAction";

export default function TopMenu() {
    const serverList = useSelector(GetServers);
    const connectorList = useSelector(GetConnectors);
    const server = useSelector(GetServerUrl);
    const dispatch = useDispatch();
    
    const onServerChange = (event) => dispatch(setServerUrl(event.target.value));
    const onConnectClick = () => dispatch(connect(server));
    const onDisconnectClick = () => dispatch(disconnect());
   
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
