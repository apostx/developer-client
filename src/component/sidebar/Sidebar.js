import _ from 'lodash';

import { useSelector } from 'react-redux';
import { Menu, Placeholder, Sidebar } from 'semantic-ui-react';

import { GetLogs } from '../../store/selector/LogSelector';

import LogItem from './LogItem';

export default function RightSidebar() {
    const logs = useSelector(GetLogs);
    const logElements = logs.map(({type, message}, index) => (<Menu.Item key={index + 3}><LogItem type={type}>{message}</LogItem></Menu.Item>));
    
    return (
        <Sidebar as={Menu} direction='right' vertical visible width='wide'>
            {_.times(3, (index) => (<Menu.Item key={index}><Placeholder /></Menu.Item>))}
            {logElements}
        </Sidebar>
    );
}
