import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';
import { Container, Placeholder } from 'semantic-ui-react';

import { GetMessages} from '../../store/selector/ConfigSelector';

import { sendMessage } from "../../store/action/ConnectionAction";

import DynamicMessageElement from './DynamicMessageElement';
import StaticMessageElement from './StaticMessageElement';

export default function Content() {
    const dispatch = useDispatch();

    const messageList = useSelector(GetMessages);

    const onSend = (message) => dispatch(sendMessage(message));
    
    const messages = messageList.map(({message, label}) => (<StaticMessageElement label={label} message={message} onSend={onSend}/>));
    
    return (
        <Container style={{ margin: 20 }}>
            {_.times(3, (i) => (<Placeholder key={i} />))}
            <DynamicMessageElement onSend={onSend} />
            {messages}
        </Container>
    );
}
