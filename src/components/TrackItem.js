import React, {memo} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableNativeFeedback as Touchable,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import defaultImg from '../../assets/img/default-artwork.png';
import TrackOptionsMenu from './TrackOptionsMenu';

const TrackItem = props => {
  const {
    navigation,
    track,
    currentTrack,
    setCurrentTrack,
    playlistRemoveOption,
  } = props;

  const onTrackPress = () => {
    if (track.id !== currentTrack.id) setCurrentTrack(track);
  };

  // if album cover empty replace it with default Image
  const cover = !track.artwork ? defaultImg : {uri: track.artwork};

  const rippleColor = 'rgba(18, 18, 20, 0.2)';

  return (
    <Touchable
      background={Touchable.Ripple(rippleColor, false)}
      onPress={onTrackPress}>
      <View
        style={{
          ...styles.container,
          backgroundColor:
            track.id === currentTrack.id ? 'rgba(80,80,80,0.1)' : '#fff',
        }}>
        <View style={styles.coverContainer}>
          <Image source={cover} style={styles.cover} />
        </View>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            style={{
              color: '#111',
              fontFamily: 'Poppins-Medium',
              marginRight: 20,
              fontSize: 13,
            }}>
            {track.title}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {track.artist}
          </Text>
        </View>
        <TrackOptionsMenu
          track={track}
          navigation={navigation}
          playlistRemoveOption={playlistRemoveOption}
        />
      </View>
    </Touchable>
  );
};

const mapStateToProps = state => {
  return {
    currentTrack: state.playback.currentTrack,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(memo(TrackItem));

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignContent: 'center',
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  coverContainer: {
    width: 50,
    height: 50,
    elevation: 2,
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  artist: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#777',
  },
});
