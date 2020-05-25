import React, {useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import defaultImg from '../../assets/img/default-artwork.png';
import TrackItem from '../components/TrackItem';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ShowContent = ({navigation, route, showFooter}) => {
  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', showFooter);
    return unsubscribe;
  }, [navigation]);

  const cover = !route.params.data[0].artwork
    ? defaultImg
    : {uri: route.params.data[0].artwork};

  const tracks = route.params.data;
  return (
    <ScrollView>
      <View>
        <Image source={cover} style={styles.cover} />
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.albumTitle}>
            {route.params.data[0].artist}
          </Text>
        </View>
        <View>
          {tracks.map(track => (
            <TrackItem navigation={navigation} key={track.id} track={track} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default connect(
  null,
  actions,
)(ShowContent);

const styles = StyleSheet.create({
  cover: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  titleContainer: {
    height: SCREEN_HEIGHT / 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: {width: 3, height: 3},
    shadowColor: '#333',
    shadowOpacity: 0.6,
  },
  albumTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    maxWidth: SCREEN_WIDTH / 2,
    color: '#777',
  },
});
