import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerStack from './DrawerStack';

const RootStack = () => {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
};

export default RootStack;
