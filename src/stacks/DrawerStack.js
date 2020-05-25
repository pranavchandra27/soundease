import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import About from '../screens/About';
import MainStack from './MainStack';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MainStack} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
