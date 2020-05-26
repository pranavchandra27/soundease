import React from 'react';
import {
  TouchableNativeFeedback as Touchable,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {blue} from '../themes';

const ScreenWidth = Dimensions.get('window').width;

const ListItem = props => {
  const rippleColor = 'rgba(18, 18, 18, 0.2)';
  return (
    <Touchable
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      delayLongPress={props.delayLongPress}
      background={Touchable.Ripple(rippleColor, false)}>
      <View style={styles.wrapper}>
        <Icon
          name={props.iconName}
          size={28}
          style={styles.icon}
          color={blue.secondaryColor}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text>
          {props.subtitle && (
            <Text style={styles.subtitle}>{props.subtitle}</Text>
          )}
        </View>
        {props.rightElement && props.rightElement}
      </View>
    </Touchable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginVertical: 4,
  },
  icon: {
    padding: 5,
    marginHorizontal: 12,
  },
  textWrapper: {
    height: '85%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    width: ScreenWidth / 2,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#555',
  },
});
