import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import TaskPage from '@/app/index/TaskPage';

const Stack = createStackNavigator();

console.log("Index.js is loaded");
console.log("New TaskPage", TaskPage);

const HomeStack = () => {
  return (
    <PaperProvider> 
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TaskPage" component={TaskPage} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default HomeStack;
