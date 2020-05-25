import React, {useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import TrackItem from '../components/TrackItem';

const ShowPlaylistScreen = props => {
  useEffect(() => {
    let unsubscribe = props.navigation.addListener('focus', props.hideFooter);
    return unsubscribe;
  }, [props.navigation]);

  let listData = props.route.params.content;

  return listData.length > 0 ? (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={listData}
        keyExtractor={asset => asset.id.toString()}
        renderItem={({item}) => (
          <TrackItem
            track={item}
            navigation={props.navigation}
            playlistRemoveOption={true}
          />
        )}
      />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
        backgroundColor: '#fff',
      }}>
      <Text style={{fontFamily: 'Poppins-Regular', fontSize: 16}}>
        This playlist is empty
      </Text>
    </View>
  );
};

export default connect(
  null,
  actions,
)(ShowPlaylistScreen);
