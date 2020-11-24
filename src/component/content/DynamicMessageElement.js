import { useSelector, useDispatch } from 'react-redux';
import { Input, Segment, Grid } from 'semantic-ui-react';

import { GetDynamicMessage} from '../../store/selector/MessageSelector';

import { setDynamicMessage } from "../../store/action/MessageAction";

export default function DynamicMessageElement({onSend}) {
    const message = useSelector(GetDynamicMessage);
    const dispatch = useDispatch();
    const onChange = (event) => dispatch(setDynamicMessage(event.target.value));
    
    return (
        <Segment>
            <Grid>
                <Grid.Column width={16}><Input fluid value={message} onChange={onChange} action={{color: 'teal',content: 'Send', onClick: () => onSend(message)}} placeholder='Message...' /></Grid.Column>
            </Grid>
        </Segment>
    );
}
