import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from './types';

import { Home, Quizzes, Results } from '../screens';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="Quizzes"
          options={{ headerShown: false }}
          component={Quizzes}
        />
        <Stack.Screen
          name="Results"
          options={{ headerShown: false }}
          component={Results}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
