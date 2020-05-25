import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const CreatePlaylistButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={props.onPress}>
      <View style={styles.wrapper}>
        <Icon style={styles.icon} name="playlist-add" size={20} />
        <Text style={styles.text}>Create new playlist</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CreatePlaylistButton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    height: 50,
    width: width - 40,
    borderRadius: 4,
    backgroundColor: '#eee',
    elevation: 2,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    marginRight: 25,
  },
  icon: {
    marginRight: 28,
    marginTop: 1,
  },
});
