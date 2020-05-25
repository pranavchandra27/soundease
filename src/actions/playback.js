import TrackPlayer from 'react-native-track-player';

export const setCurrentTrack = currentTrack => async dispatch => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(currentTrack);
    dispatch({type: 'CURRENT_TRACK', payload: currentTrack});
    TrackPlayer.play();
    dispatch({type: 'SET_PLAYBACK', payload: true});
  } catch (error) {
    console.warn(error);
  }
};

export const setPlayback = isPlaying => {
  isPlaying ? TrackPlayer.play() : TrackPlayer.pause();
  return {type: 'SET_PLAYBACK', payload: isPlaying};
};

export const setLoop = isLoop => {
  return {type: 'SET_LOOP', payload: isLoop};
};

export const setShuffle = isShuffle => {
  return {type: 'SET_SHUFFLE', payload: isShuffle};
};
