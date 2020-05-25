import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeStack from './HomeStack';
import Search from '../screens/Search';
import Icon from 'react-native-vector-icons/Ionicons';
import AddToPlaylist from '../screens/AddToPlaylist';
import {red} from '../themes';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Stack = createStackNavigator();

const MainStack = ({navigation}) => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        cardStyle: {opacity: 1},
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="home"
        component={HomeStack}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          headerTitle: 'Search',
          headerTitleAlign: 'center',

          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Poppins-Regular',
            color: '#fff',
          },
          headerStyle: {
            elevation: 0,
            backgroundColor: red.primaryColor,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 12}}
              onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-down" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="addToPlaylist"
        component={AddToPlaylist}
        options={{
          title: 'Add to playlist',
          headerStyle: {
            elevation: 0,
            backgroundColor: red.primaryColor,
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            color: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 12}}
              onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-down" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
