import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {red} from '../themes';

const SearchBar = props => {
  const {onFocus, onBlur, value, setSearchInput} = props;
  return (
    <View style={styles.searchBar}>
      <Icon
        style={styles.searchIcon}
        name="search"
        size={24}
        color={red.primaryColor}
      />
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
    borderColor: red.primaryColor,
    borderWidth: 1,
    borderRadius: 25,
    marginHorizontal: 20,
  },
  searchIcon: {
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: red.primaryColor,
    alignItems: 'center',
    paddingRight: 30,
    backgroundColor: 'transparent',
  },
});
