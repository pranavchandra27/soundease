import React from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import Icon from 'react-native-vector-icons/Feather';
import ProgressBar from './ProgressBar';
import placeholder from '../../assets/img/default-artwork.png';
import {red} from '../themes';

const SCREEN_WIDTH = Dimensions.get('window').width;

const BottomPlayer = props => {
  const {isPlaying, renderFooter, currentTrack, navigation} = props;
  const {position, duration} = useTrackPlayerProgress(100);

  const togglePlayback = () => {
    props.setPlayback(!isPlaying);
  };

  const progress = position / duration;
  const cover = currentTrack.artwork
    ? {uri: currentTrack.artwork}
    : placeholder;

  return renderFooter && currentTrack.id !== '000' ? (
    <TouchableOpacity
      onPress={() => navigation.navigate('player')}
      activeOpacity={0.9}>
      <View style={styles.progress}>
        <ProgressBar
          progress={isNaN(progress) ? 0 : +progress.toFixed(3)}
          color={red.primaryColor}
          style={styles.ProgressBar}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.coverContainer}>
          <Image source={cover} style={styles.coverImg} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title || 'Unknown'}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artist || 'Unknown'}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={togglePlayback}
          style={styles.playBtn}>
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={30}
            color={red.secondaryColor}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ) : null;
};

const matStateToProps = state => {
  return {
    renderFooter: state.footer.footerVisible,
    currentTrack: state.playback.currentTrack,
    isPlaying: state.player.isPlaying,
  };
};

export default connect(
  matStateToProps,
  actions,
)(BottomPlayer);

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  coverContainer: {
    height: 45,
    width: 45,
    marginHorizontal: 15,
    elevation: 4,
  },
  coverImg: {
    height: 45,
    width: 45,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#bbb',
    marginRight: 20,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  artist: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#777',
  },
  playBtn: {
    paddingHorizontal: 15,
  },
  progress: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  ProgressBar: {
    width: SCREEN_WIDTH,
    backgroundColor: '#ddd',
    height: 2,
  },
});
