import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TrackList from '../screens/TrackList';
import AlbumList from '../screens/AlbumList';
import ArtistList from '../screens/ArtistList';
import PlaylistScreen from '../screens/PlaylistScreen';
import {blue} from '../themes';

const TabBar = createMaterialTopTabNavigator();

const Tabs = ({navigation}) => {
  return (
    <>
      <TabBar.Navigator
        tabBarOptions={{
          style: {
            elevation: 2,
            width: 'auto',
            backgroundColor: blue.secondaryColor,
          },
          scrollEnabled: true,
          tabStyle: {
            height: 50,
            width: 90,
          },
          activeTintColor: '#fff',
          inactiveTintColor: '#eee',
          labelStyle: {
            fontSize: 12,
            fontFamily: 'Poppins-Medium',
            textTransform: 'uppercase',
          },
          indicatorStyle: {height: 3, backgroundColor: blue.contrstColor},
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
