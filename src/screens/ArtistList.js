import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import * as action from '../actions';
import _ from 'underscore';
import RenderTrackCategory from '../components/RenderTrackCategory';
import {flatListCardLayout} from '../utils/FlatListLayout';

const ArtistList = props => {
  const {tracks, tracksLoaded, showFooter, navigation} = props;

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', showFooter);
    return unsubscribe;
  }, [navigation]);

  const onArtistPress = (title, data) => {
    props.navigation.navigate('content', {title, data});
  };

  const renderArtists = ({item, index}) => {
    if (item.empty) return <View style={{backgroundColor: 'transparent'}} />;
    let songsWithCover = item.data.filter(song => song.artwork !== 'cover');
    let cover =
      songsWithCover.length === 0 ? 'cover' : songsWithCover[0].artwork;
    return (
      <RenderTrackCategory
        title={item.title}
        cover={cover}
        index={index}
        numOfTrack={item.data.length}
        onPress={() => onArtistPress(item.title, item.data)}
      />
    );
  };

  const artistList = () => {
    let sectionsData = [];
    let data = _.groupBy(tracks, 'artist');
    let titles = Object.keys(data);
    titles.forEach(title => {
      sectionsData.push({
        title,
        data: data[title],
      });
    });

    let sortedData = _.sortBy(sectionsData, 'title');
    // console.log(sortedData);
    return sortedData;
  };

  return !tracksLoaded ? (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <Text style={{fontSize: 30}}>Loading...</Text>
    </View>
  ) : (
    <View style={{backgroundColor: '#fff'}}>
      <FlatList
        data={artistList()}
        renderItem={renderArtists}
        numColumns={2}
        getItemLayout={flatListCardLayout}
        keyExtractor={asset => asset.title.toString()}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    tracks: state.tracks.trackList,
    tracksLoaded: state.tracks.tracksLoaded,
    currentTrack: state.playback.currentTrack,
  };
};

export default connect(
  mapStateToProps,
  action,
)(ArtistList);
