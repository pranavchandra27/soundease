import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  StatusBar,
  TouchableNativeFeedback,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import ProgressSlider from '../components/Slider';
import PlaybackControls from '../components/PlaybackControls';
import defaultImg from '../../assets/img/default-artwork.png';
import {blue} from '../themes';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const PlayerScreen = props => {
  const {navigation, hideFooter, currentTrack} = props;

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', hideFooter);
    return unsubscribe;
  }, [navigation]);

  const cover = !currentTrack.artwork
    ? defaultImg
    : {uri: currentTrack.artwork};

  return (
    <ImageBackground source={cover} style={{flex: 1}} blurRadius={20}>
      <LinearGradient
        colors={['rgba(18,18,18,0.3)', 'rgba(40,40,40,0.8)']}
        style={{flex: 1}}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="light-content"
          animated
        />
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableNativeFeedback onPress={() => navigation.goBack()}>
              <Icon name="chevron-thin-left" size={20} color={blue.bgColor} />
            </TouchableNativeFeedback>
            <Text style={styles.topText}>Now Playing</Text>
            <TouchableNativeFeedback>
              <Icon name="dots-two-vertical" size={20} color={blue.bgColor} />
            </TouchableNativeFeedback>
          </View>
          <View style={styles.topCover}>
            <Image style={styles.coverImg} source={cover} />
          </View>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {currentTrack.title}
            </Text>
            <Text numberOfLines={1} style={styles.artist}>
              {currentTrack.artist}
            </Text>
          </View>
          <View style={styles.progressWrapper}>
            <ProgressSlider />
          </View>
          <View style={styles.controlsWrapper}>
            <PlaybackControls />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

function mapStateToProps(state) {
  return {
    currentTrack: state.playback.currentTrack,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(PlayerScreen);

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  topBar: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
  },
  topText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: blue.bgColor,
  },
  topCover: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 30,
  },
  coverImg: {
    width: 300,
    height: 280,
    resizeMode: 'contain',
  },

  titleContainer: {
    marginTop: 30,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: '#fff',
  },
  artist: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 13,
    marginTop: 2,
    color: '#ccc',
  },
  progressWrapper: {
    marginTop: 30,
  },
  controlsWrapper: {
    marginTop: 20,
  },
});
