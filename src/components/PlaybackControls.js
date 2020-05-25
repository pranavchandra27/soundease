import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import RenderToast from '../components/RenderToast';
import Icon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {getRandomNumber} from '../utils';

const PlaybackControls = props => {
  const {loop, shuffle, isPlaying, setPlayback, currentTrack, tracks} = props;

  function onShufflePress() {
    RenderToast(`Shuffle: ${shuffle ? 'Off' : 'On'}`);
    props.setShuffle(!shuffle);
  }

  function onLoopPress() {
    RenderToast(`Loop ${loop ? 'all tracks' : 'this track'}`);
    props.setLoop(!loop);
  }

  const skipForward = () => {
    let nextTrack = shuffle
      ? tracks[getRandomNumber(0, tracks.length)]
      : currentTrack.index === tracks.length - 1
      ? tracks[0]
      : tracks[currentTrack.index + 1];
    props.setCurrentTrack(nextTrack);
  };

  const skipBackward = () => {
    let nextTrack = shuffle
      ? tracks[getRandomNumber(0, tracks.length)]
      : currentTrack.index === 0
      ? tracks[tracks.length - 1]
      : tracks[currentTrack.index - 1];
    props.setCurrentTrack(nextTrack);
  };

  return (
    <View style={styles.playbackControls}>
      <TouchableOpacity activeOpacity={0.5} onPress={onLoopPress}>
        <Icon name="repeat" size={22} color={loop ? '#fff' : '#aaa'} />
      </TouchableOpacity>
      <View style={styles.controlsContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={skipBackward}>
          <Ionicon name="md-rewind" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pause_play_container}
          activeOpacity={0.5}
          onPress={() => setPlayback(!isPlaying)}>
          <Ionicon
            name={isPlaying ? 'md-pause' : 'md-play'}
            size={40}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={skipForward}>
          <Ionicon name="md-fastforward" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={onShufflePress}>
        <Icon name="shuffle" size={22} color={shuffle ? '#fff' : '#aaa'} />
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    isPlaying: state.player.isPlaying,
    tracks: state.tracks.trackList,
    loop: state.playback.loop,
    shuffle: state.playback.shuffle,
    currentTrack: state.playback.currentTrack,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(PlaybackControls);

const styles = StyleSheet.create({
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginVertical: 0,
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pause_play_container: {
    marginHorizontal: 40,
  },
});
