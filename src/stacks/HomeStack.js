import React from 'react';
import {TouchableOpacity, StatusBar, Dimensions} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Tabs from './TabStack';
import ShowContent from '../screens/ShowContent';
import Icon from 'react-native-vector-icons/Feather';
import ShowPlaylistScreen from '../screens/ShowPlaylistScreen';
import PlayerScreen from '../screens/PlayerScreen';
import BottomPlayer from '../components/BottomPlayer';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  const headerOptions = ({route}) => ({
    title: route.params.title,
    headerTitleStyle: {
      fontFamily: 'Poppins-Medium',
      fontSize: 18,
      maxWidth: SCREEN_WIDTH / 1.7,
    },
    headerStyle: {
      elevation: 0,
    },
  });
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <Stack.Navigator
        screenOptions={{
          cardStyle: {opacity: 1},
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerStyle: {
              elevation: 0,
            },
            headerTitle: '',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{marginLeft: 12}}>
                <Icon name="menu" size={24} color="#333" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('search')}
                style={{marginRight: 12}}>
                <Icon name="search" size={24} color="#333" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="player"
          component={PlayerScreen}
          options={{
            headerTitle: 'Now Playing',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
            },
            headerStyle: {
              elevation: 0,
            },
            headerTransparent: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="content"
          component={ShowContent}
          options={headerOptions}
        />
        <Stack.Screen
          name="playlist"
          component={ShowPlaylistScreen}
          options={headerOptions}
        />
      </Stack.Navigator>
      <BottomPlayer navigation={navigation} />
    </>
  );
};

export default HomeStack;
