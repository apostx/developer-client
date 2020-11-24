import { Header, Divider } from 'semantic-ui-react';

export default function SeparatorElement({children}) {
    return (<Divider horizontal><Header as='h4'>{children}</Header></Divider>);
}
