import React, {useEffect} from 'react';
import {View, Text, FlatList, Animated} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import TrackItem from '../components/TrackItem';
import TrackPlayer from 'react-native-track-player';
import setupPlayer from '../services/SetupPlayer';
import ActivityLoadingIndicator from '../components/ActivityIndicator';

const TrackList = props => {
  const {currentTrack, tracks, tracksLoaded, showFooter, navigation} = props;

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', showFooter);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    props.getTracks();
    setupPlayer().then(
      () => currentTrack.id !== '000' && TrackPlayer.add(currentTrack),
    );
  }, []);

  if (tracksLoaded) {
    if (tracks.length > 0) {
      return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={tracks}
            renderItem={({item}) => (
              <TrackItem navigation={navigation} track={item} />
            )}
            scrollEventThrottle={16}
            needsOffscreenAlphaCompositing={false}
            initialNumToRender={10}
            disableScrollViewPanResponder
          />
        </View>
      );
    }
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
        }}>
        <Text style={{fontSize: 30}}>
          Couldn't find any audio on your device
        </Text>
      </View>
    );
  }

  return <ActivityLoadingIndicator text="Loading Tracks..." />;
};

const mapStateToProps = state => {
  return {
    currentTrack: state.playback.currentTrack,
    tracks: state.tracks.trackList,
    tracksLoaded: state.tracks.tracksLoaded,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(TrackList);
