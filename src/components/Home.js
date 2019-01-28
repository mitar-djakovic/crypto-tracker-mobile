import React from "react";
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Search from "./Search";
import Favorites from "./Favorites";
  
const TabNavigator = createBottomTabNavigator({
    Search: Search,
    Favorites: Favorites,
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = MaterialCommunityIcons;
            let iconName;

            if (routeName === 'Search') {
                iconName = `view-list`;
            } else if (routeName === 'Favorites') {
                iconName = `heart`;
            }

            return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#009788',
        inactiveTintColor: 'gray',
    },
});

export default createAppContainer(TabNavigator);