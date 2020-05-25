import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';

const ActivityLoadingIndicator = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#333" style={{marginBottom: 15}} />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default ActivityLoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
  },
});
