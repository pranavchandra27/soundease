import React, {useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import RenderToast from '../components/RenderToast';
import ListItem from '../components/ListItem';

const AddToPlaylist = props => {
  const {navigation, route, playlists} = props;

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', props.hideFooter);
    return unsubscribe;
  }, [navigation]);

  const addSong = (playlistTitle, song) => {
    props.addToPlaylist(playlistTitle, song);
    RenderToast('Track was added to playlist');
    navigation.goBack();
  };

  const onPlaylistPress = playlistName => {
    let {song} = route.params;
    let filtered = playlists[playlistName].filter(file => file.id === song.id);
    if (filtered.length > 0) {
      RenderToast('This track is already in this playlist');
    } else {
      addSong(playlistName, song);
    }
  };

  const keys = Object.keys(playlists);
  if (keys.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 80,
          backgroundColor: '#fff',
        }}>
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16}}>
          You don't have any playlists yet
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {keys.map((key, index) => (
        <ListItem
          title={key}
          subtitle={`${playlists[key].length} tracks`}
          onPress={() => onPlaylistPress(key)}
          key={(key + index).toString()}
          iconName="playlist-music-outline"
        />
      ))}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    playlists: state.playlists,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(AddToPlaylist);
