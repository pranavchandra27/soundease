import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {connect} from 'react-redux';
import * as action from '../actions';

class ProgressSlider extends ProgressComponent {
  msToSec(ms) {
    return parseInt(ms / 1000, 10);
  }

  secToTime(secs) {
    if (secs < 0) {
      return '0:00';
    }
    let minutes = Math.floor(secs / 60);
    let seconds = Math.floor(secs % 60);
    return seconds <= 9 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  timePassed(duration) {
    return this.secToTime(this.getProgress() * this.msToSec(duration));
  }

  sliderVal(duration) {
    return this.getProgress() * this.msToSec(duration);
  }

  secToTimeDuration(duration) {
    let timeInSeconds = this.msToSec(duration);
    return this.secToTime(timeInSeconds);
  }

  seekTo = value => {
    TrackPlayer.seekTo(value);
  };

  render() {
    const {currentTrack} = this.props;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.sliderContainer}>
          <Slider
            value={this.sliderVal(currentTrack.duration)}
            minimumValue={0}
            maximumValue={this.msToSec(currentTrack.duration)}
            minimumTrackTintColor="#fff"
            thumbTintColor="transparent"
            maximumTrackTintColor="#fff"
            onValueChange={this.seekTo}
            step={1}
          />
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.duration}>
            {this.timePassed(currentTrack.duration)}
          </Text>
          <Text style={styles.duration}>
            {this.secToTimeDuration(currentTrack.duration)}
          </Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps({playback}) {
  return {currentTrack: playback.currentTrack};
}

export default connect(
  mapStateToProps,
  action,
)(ProgressSlider);

const styles = StyleSheet.create({
  sliderContainer: {
    marginHorizontal: -16,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  duration: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#ddd',
    letterSpacing: 1,
  },
});
