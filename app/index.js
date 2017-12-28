import React, {Component} from "react";
import {
    StackNavigator,
} from 'react-navigation';

import StartUp from './StartUp';
import Result from './Result';

const PageAScreen = ({ navigation }) => (
    <StartUp navigation={navigation} />
);
PageAScreen.navigationOptions = {
    title: 'PageA',
};

const PageBScreen = ({navigation}) => (
    <Result navigation={navigation} />
);
PageBScreen.navigationOptions = {
    title: 'Result',
};

const App = StackNavigator({
    PageA: {
        screen: PageAScreen,
    },
    PageB: {
        screen: PageBScreen,
    }
});

export default App;