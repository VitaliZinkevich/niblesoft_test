import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import { inject, observer } from 'mobx-react';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default inject('observableStore') (observer ( 
  function BottomTabNavigator({observableStore}) {
    const colorScheme = observableStore.localTheme;
  
    return (
      <BottomTab.Navigator
        initialRouteName="Current"
        tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
        <BottomTab.Screen
          name="Current"
          component={TabOneNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="md-information-circle-outline" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="History"
          component={TabTwoNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="md-repeat" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    );
  }
))

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Current Data' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'History' }}
      />
    </TabTwoStack.Navigator>
  );
}
