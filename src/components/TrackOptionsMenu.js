import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';
import {useNavigation, useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import InputDialog from './InputDialog';
import RenderToast from './RenderToast';
import ConfirmDialog from './ConfirmDialog';
import Icon from 'react-native-vector-icons/Entypo';

const OptionsMenu = props => {
  const menuRef = useRef(null);
  const [istDialogVisible, setDialogVisible] = useState(false);
  const [isRenameModalVisible, setRenameModal] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const {track, deleteTrack, renameTrack, playlistRemoveOption} = props;

  const onAddToPlaylist = () => {
    navigation.navigate('addToPlaylist', {song: track});
  };

  const onRemoveFromPlaylist = () => {
    props.removeFromPlaylist(route.params.title, track);
  };

  const onPressRename = newName => {
    if (newName !== track.title) {
      let index = newName.split('').indexOf('/');
      if (index === -1) {
        renameTrack(track, newName);
      } else {
        return RenderToast('Title should not contain "/"');
      }
    }
    setRenameModal(false);
  };

  const onDeleteConfirm = () => {
    setDialogVisible(false);
    deleteTrack(track);
  };

  const optionText = playlistRemoveOption
    ? 'Remove from playlist'
    : 'Add to playlist';

  const optionFunc = playlistRemoveOption
    ? onRemoveFromPlaylist
    : onAddToPlaylist;

  const button = (
    <TouchableOpacity
      style={{justifyContent: 'center', marginTop: 12}}
      onPress={() => menuRef.current.show()}>
      <Icon name="dots-two-horizontal" size={22} color={'darkgrey'} />
    </TouchableOpacity>
  );

  return (
    <View>
      <Menu ref={menuRef} button={button}>
        <MenuItem
          onPress={() => {
            optionFunc();
            menuRef.current.hide();
          }}>
          <Text style={styles.menuItem}>{optionText}</Text>
        </MenuItem>
        <MenuItem
          onPress={() => {
            setRenameModal(true);
            menuRef.current.hide();
          }}>
          <Text style={styles.menuItem}>Rename</Text>
        </MenuItem>
        <MenuItem
          onPress={() => {
            setDialogVisible(true);
            menuRef.current.hide();
          }}>
          <Text style={styles.menuItem}>Delete from phone</Text>
        </MenuItem>
      </Menu>
      <InputDialog
        isVisible={isRenameModalVisible}
        onPressCancel={() => setRenameModal(false)}
        onPressSave={onPressRename}
        title="Rename Track"
        name={track.title}
        saveButtonTitle="Rename"
        inputPlaceholder="New Title"
      />
      <ConfirmDialog
        isVisible={istDialogVisible}
        title="Confirm Delete"
        cancelButton
        description="Are you sure you want to delete this track?"
        onCancel={() => setDialogVisible(false)}
        onConfirm={onDeleteConfirm}
        buttonTitle="Delete"
      />
    </View>
  );
};

export default connect(
  null,
  actions,
)(OptionsMenu);

const styles = StyleSheet.create({
  menuItem: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});
