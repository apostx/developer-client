import _ from 'lodash';

import { useSelector } from 'react-redux';
import { Menu, Placeholder, Sidebar } from 'semantic-ui-react';

import { GetLogs } from '../../store/selector/LogSelector';

import LogItem from './LogItem';

export default function RightSidebar() {
    const logs = useSelector(GetLogs);
    const logElements = logs.map(({type, message}) => (<LogItem type={type}>{message}</LogItem>));
    
    return (
        <Sidebar as={Menu} direction='right' vertical visible width='wide'>
            {_.times(3, (i) => (<Menu.Item><Placeholder key={i} /></Menu.Item>))}
            {logElements}
        </Sidebar>
    );
}