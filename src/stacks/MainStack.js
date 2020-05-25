import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeStack from './HomeStack';
import Search from '../screens/Search';
import Icon from 'react-native-vector-icons/Ionicons';
import AddToPlaylist from '../screens/AddToPlaylist';

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
            fontSize: 25,
            fontFamily: 'Poppins-Medium',
          },
          headerStyle: {
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 12}}
              onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-down" size={24} />
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
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
