import { Input, Segment, Grid, Button } from 'semantic-ui-react';

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

export default function StaticMessageElement({label, message, onSend}) {
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