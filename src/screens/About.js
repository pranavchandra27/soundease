import React from 'react';
import {View, Text} from 'react-native';

export default function About() {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          padding: 15,
          paddingTop: 70,
          textTransform: 'capitalize',
          fontSize: 20,
        }}>
        Built with ❤ react native
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text style={{textAlign: 'center', fontSize: 16}}>
          All Copyrights © Right Reserved
        </Text>
      </View>
    </View>
  );
}
