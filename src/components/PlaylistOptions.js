import React, {useRef, useState} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, Text} from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';
import {connect} from 'react-redux';
import * as actions from '../actions';
import InputDialog from './InputDialog';
import RenderToast from './RenderToast';
import ConfirmDialog from './ConfirmDialog';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaylistOptions = props => {
  const menuRef = useRef(null);
  const [istDialogVisible, setDialogVisible] = useState(false);
  const [isRenameModalVisible, setRenameModal] = useState(false);

  const {selectedPlaylist} = props;

  const onPressRename = newName => {
    let playlistName = newName.trim();
    if (playlistName === selectedPlaylist) return setRenameModal(false);
    if (playlistName) {
      let keys = Object.keys(props.playlists);
      let index = keys.indexOf(playlistName);
      if (index === -1) {
        props.renamePlaylist(selectedPlaylist, playlistName);
        setRenameModal(false);
      } else {
        RenderToast('A playlist with the same name already exists');
      }
    } else {
      RenderToast('Playlist cannot be untitled');
    }
  };

  const onDeleteConfirm = () => {
    setDialogVisible(false);
    props.deletePlaylist(selectedPlaylist);
  };

  const button = (
    <Icon
      style={{padding: 15}}
      onPress={() => menuRef.current.show()}
      name="md-more"
      size={24}
    />
  );

  return (
    <>
      <Menu ref={menuRef} button={button}>
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
          <Text style={styles.menuItem}>Delete</Text>
        </MenuItem>
      </Menu>
      <InputDialog
        isVisible={isRenameModalVisible}
        onPressCancel={() => setRenameModal(false)}
        onPressSave={onPressRename}
        title="Rename Playlist"
        name={selectedPlaylist}
        saveButtonTitle="Rename"
        inputPlaceholder="New Title"
      />
      <ConfirmDialog
        isVisible={istDialogVisible}
        title="Confirm Delete"
        cancelButton
        description="Are you sure you want to delete this playlist?"
        onCancel={() => setDialogVisible(false)}
        onConfirm={onDeleteConfirm}
        buttonTitle="Delete"
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    playlists: state.playlists,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(PlaylistOptions);

const styles = StyleSheet.create({
  menuItem: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});
