import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { store } from './src/store/index';

import AppLayout from './src/components/AppLayout';
import Diagram from './src/components/Diagram';

const MainNavigator = createSwitchNavigator(
    {
        Home: { screen: AppLayout },
        Diagram: { screen: Diagram },
    }, {
        initialRouteName: 'Home'
    }
);

const Application = createAppContainer(MainNavigator);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Application />
            </Provider>
        );
    }
}