import { Menu, Message, Icon } from 'semantic-ui-react';

export default function LogItem({type, children}) {
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