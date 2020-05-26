import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import About from '../screens/About';
import MainStack from './MainStack';
import {blue} from '../themes';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{backgroundColor: blue.secondaryColor}}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#eee',
        labelStyle: {
          fontSize: 14,
          fontFamily: 'Poppins-Medium',
          letterSpacing: 1,
        },
      }}>
      <Drawer.Screen name="Home" component={MainStack} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
