import React, {useState, useEffect} from 'react';
import Dialog from 'react-native-dialog';
import {StyleSheet} from 'react-native';

const InputDialog = props => {
  const [input, setInput] = useState(props.name);
  const {
    isVisible,
    inputPlaceholder,
    title,
    saveButtonTitle,
    onPressSave,
  } = props;

  const onCancel = () => {
    props.onPressCancel();
  };
  return (
    <Dialog.Container
      isVisible={isVisible}
      backdropColor="black"
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
      contentStyle={{backgroundColor: '#fff'}}>
      <Dialog.Title style={styles.title}>{title}</Dialog.Title>
      <Dialog.Input
        style={styles.input}
        autoCorrect={false}
        value={input}
        onChangeText={val => setInput(val)}
        placeholder={inputPlaceholder}
        autoFocus
      />
      <Dialog.Button label="Cancel" color="#333" onPress={onCancel} />
      <Dialog.Button
        label={saveButtonTitle}
        color="blue"
        onPress={() => {
          onPressSave(input.trim());
          setInput('');
        }}
      />
    </Dialog.Container>
  );
};

export default InputDialog;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
    fontSize: 13,
  },
  input: {
    fontFamily: 'Poppins-Medium',
    color: '#333',
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    height: 50,
  },
});
