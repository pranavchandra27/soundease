import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TrackList from '../screens/TrackList';
import AlbumList from '../screens/AlbumList';
import ArtistList from '../screens/ArtistList';
import PlaylistScreen from '../screens/PlaylistScreen';

const TabBar = createMaterialTopTabNavigator();

const Tabs = ({navigation}) => {
  return (
    <>
      <TabBar.Navigator
        tabBarOptions={{
          style: {
            elevation: 3,
            width: 'auto',
          },
          scrollEnabled: true,
          tabStyle: {
            height: 40,
            width: 100,
          },
          activeTintColor: '#222',
          inactiveTintColor: '#aaa',
          labelStyle: {
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
            textTransform: 'capitalize',
          },
          indicatorStyle: {height: 0},
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
