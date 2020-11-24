import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';
import { Container, Placeholder } from 'semantic-ui-react';

import { GetMessages} from '../../store/selector/ConfigSelector';

import { sendMessage } from "../../store/action/ConnectionAction";

import DynamicMessageElement from './DynamicMessageElement';
import StaticMessageElement from './StaticMessageElement';
import SeparatorElement from './SeparatorElement';

export default function Content() {
    const dispatch = useDispatch();

    const messageList = useSelector(GetMessages);

    const onSend = (message) => dispatch(sendMessage(message));
    
    const messages = messageList.map(({message, label}) => message ?
        (<StaticMessageElement label={label} message={message} onSend={onSend}/>) :
        (<SeparatorElement>{label}</SeparatorElement>)
    );
    
    return (
        <Container style={{ margin: 20 }}>
            {_.times(3, (i) => (<Placeholder key={i} />))}
            <DynamicMessageElement onSend={onSend} />
            {messages}
        </Container>
    );
}
