import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import RenderToast from '../components/RenderToast';
import CreatePlaylistButton from '../components/CreatePlaylistButton';
import InputDialog from '../components/InputDialog';
import ListItem from '../components/ListItem';
import PlaylistOptions from '../components/PlaylistOptions';

const PlaylistScreen = props => {
  const [isModalVisible, setModal] = useState(false);

  useEffect(() => {
    let unsubscribe = props.navigation.addListener('focus', props.showFooter);
    return unsubscribe;
  }, [props.navigation]);

  const onPressSave = playlistName => {
    if (playlistName) {
      let keys = Object.keys(props.playlists);
      let index = keys.indexOf(playlistName);
      if (index === -1) {
        props.createPlaylist(playlistName);
        setModal(false);
      } else {
        RenderToast('A playlist with the same name already exists');
      }
    } else {
      RenderToast('Playlist cannot be untitled');
    }
  };

  const onListItemPress = (title, content) => {
    props.navigation.navigate('playlist', {title, content});
  };

  const onOptionsPress = name => {
    return name;
  };

  const {playlists} = props;

  let keys = Object.keys(playlists);

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <CreatePlaylistButton onPress={() => setModal(true)} />
      <InputDialog
        isVisible={isModalVisible}
        onPressSave={onPressSave}
        onPressCancel={() => setModal(false)}
        inputPlaceholder="Give your playlist a name"
        saveButtonTitle="Create"
        title="Create playlist"
      />

      <ScrollView>
        {keys.map((key, index) => (
          <ListItem
            title={key}
            subtitle={`${playlists[key].length} tracks`}
            key={String(key + index)}
            onPress={() => onListItemPress(key, playlists[key])}
            iconName="music"
            rightElement={<PlaylistOptions selectedPlaylist={key} />}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    playlists: state.playlists,
    currentTrack: state.playback.currentTrack,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(PlaylistScreen);
