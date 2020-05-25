import React from 'react';
import {View, StatusBar, StyleSheet, Image, Text} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#fff"
        translucent={true}
        barStyle="dark-content"
      />
      <Image
        style={styles.logo}
        source={require('../../assets/img/logo.png')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: 150,
    width: 150,
  },
});
