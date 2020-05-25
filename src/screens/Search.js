import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import SearchBar from '../components/SearchBar';
import TrackItem from '../components/TrackItem';
import Icon from 'react-native-vector-icons/Feather';

const Search = props => {
  const [searchInput, setInput] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    let unsubscribe = props.navigation.addListener('blur', () => setInput(''));
    return unsubscribe;
  }, [props.navigation]);

  const listFilter = () => {
    if (searchInput) {
      return props.tracks.filter(item => {
        let itemData = ` ${item.title} ${item.artist}`.toUpperCase();
        let searchData = ' ' + searchInput.toUpperCase();
        return itemData.indexOf(searchData) > -1;
      });
    }
  };

  const renderSearch = () => {
    return isInputFocused || searchInput ? (
      <FlatList
        data={listFilter()}
        renderItem={({item}) => <TrackItem track={item} />}
        keyExtractor={asset => asset.id.toString()}
        style={styles.trackListWrapper}
      />
    ) : (
      <View style={styles.emptyView}>
        <Icon name="search" size={60} />
        <Text style={styles.emptyText}>Type something</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchInput}
          setSearchInput={setInput}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </View>
      <View style={{flex: 1}}>{renderSearch()}</View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    currentTrack: state.playback.currentTrack,
    tracks: state.tracks.trackList,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  trackListWrapper: {
    flex: 1,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333',
    marginTop: 20,
  },
});
