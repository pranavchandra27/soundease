import React from 'react';
import Dialog from 'react-native-dialog';
import {StyleSheet} from 'react-native';

const ConfirmDialog = props => {
  const {
    isVisible,
    title,
    description,
    onCancel,
    onConfirm,
    cancelButton,
    buttonTitle,
  } = props;

  return (
    <Dialog.Container
      visible={isVisible}
      backdropColor="black"
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
      contentStyle={{backgroundColor: '#fff'}}>
      <Dialog.Title style={styles.title} numberOfLines={2}>
        {title}
      </Dialog.Title>
      <Dialog.Description style={styles.description}>
        {description}
      </Dialog.Description>
      {cancelButton ? (
        <Dialog.Button label="Cancel" color="#333" onPress={onCancel} />
      ) : null}
      <Dialog.Button label={buttonTitle} color="crimson" onPress={onConfirm} />
    </Dialog.Container>
  );
};

export default ConfirmDialog;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'crimson',
  },
});
