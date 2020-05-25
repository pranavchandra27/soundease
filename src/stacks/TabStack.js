import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TrackList from '../screens/TrackList';
import AlbumList from '../screens/AlbumList';
import ArtistList from '../screens/ArtistList';
import PlaylistScreen from '../screens/PlaylistScreen';
import {red} from '../themes';

const TabBar = createMaterialTopTabNavigator();

const Tabs = ({navigation}) => {
  return (
    <>
      <TabBar.Navigator
        tabBarOptions={{
          style: {
            elevation: 2,
            width: 'auto',
            backgroundColor: red.primaryColor,
          },
          scrollEnabled: true,
          tabStyle: {
            height: 50,
            width: 100,
          },
          activeTintColor: '#fff',
          inactiveTintColor: '#eee',
          labelStyle: {
            fontSize: 14,
            fontFamily: 'Poppins-Regular',
            textTransform: 'uppercase',
          },
          indicatorStyle: {height: 3, backgroundColor: red.secondaryColor},
          allowFontScaling: false,
        }}>
        <TabBar.Screen name="Tracks" component={TrackList} />
        <TabBar.Screen name="Albums" component={AlbumList} />
        <TabBar.Screen name="Artist" component={ArtistList} />
        <TabBar.Screen name="Playlists" component={PlaylistScreen} />
      </TabBar.Navigator>
    </>
  );
};

export default Tabs;
