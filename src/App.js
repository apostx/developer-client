import _ from 'lodash';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setConfig } from "./store/action/ConfigAction";

import TopMenu from './component/menu/Menu';
import RightSidebar from './component/sidebar/Sidebar';
import Content from './component/content/Content';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('config.json')
            .then(response => response.json())
            .then(config => dispatch(setConfig(config)));
    }, [dispatch]);

    return (
        <>
            <Content />
            <RightSidebar />
            <TopMenu />
        </>
    );
};

export default App;
