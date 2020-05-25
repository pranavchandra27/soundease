import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SearchBar = props => {
  const {onFocus, onBlur, value, setSearchInput} = props;
  return (
    <View style={styles.searchBar}>
      <Icon style={styles.searchIcon} name="search" size={24} />
      <TextInput
        placeholder="Songs, Albums or Artists"
        allowFontScaling={false}
        clearButtonMode="while-editing"
        autoCorrect={false}
        returnKeyType="search"
        style={styles.searchInput}
        value={value}
        onChangeText={setSearchInput}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#aaa',
    borderRadius: 25,
    marginHorizontal: 20,
  },
  searchIcon: {
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333',
    alignItems: 'center',
    paddingRight: 30,
    backgroundColor: 'transparent',
  },
});
