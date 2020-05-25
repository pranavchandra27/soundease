import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import defaultImg from '../../assets/img/default-artwork.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const itemWidth = SCREEN_WIDTH / 2 - 25;
const itemHeight = itemWidth + itemHeight / 8;

const RenderTrackCategory = props => {
  const itemMargin =
    props.index % 2 === 0 ? {marginLeft: 10, marginRight: 10} : {};
  itemMargin.marginTop = 10;

  const albumCover = props.cover ? {uri: props.cover} : defaultImg;

  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.8}>
      <View
        style={{
          ...itemMargin,
          width: SCREEN_WIDTH / 2 - 15,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          elevation: 2,
        }}>
        <Image style={styles.albumCover} source={albumCover} />
        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.title}>
            {props.title}
          </Text>
          <Text style={styles.subtext}>
            {props.numOfTrack}
            {props.numOfTrack > 1 ? ' Tracks' : ' Track'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderTrackCategory;

const styles = StyleSheet.create({
  albumCover: {
    width: SCREEN_WIDTH / 2 - 15,
    height: SCREEN_WIDTH / 2 - 40,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  textWrapper: {
    height: 50,
    width: SCREEN_WIDTH / 2 - 15,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 10,
    color: '#333',
  },
  subtext: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginLeft: 11,
    color: '#555',
  },
});
