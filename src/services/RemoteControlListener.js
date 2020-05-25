import TrackPlayer from 'react-native-track-player';
import {store} from '../store';
import {getRandomNumber} from '../utils';

let flag = false;

const backgroundPlayback = async track => {
  if (flag) return;
  flag = true;
  setTimeout(() => (flag = false), 250);
  await TrackPlayer.reset();
  await TrackPlayer.add(track);
  store.dispatch({type: 'CURRENT_TRACK', payload: track});
  TrackPlayer.play();
  store.dispatch({type: 'SET_PLAYBACK', payload: true});
};

module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
    store.dispatch({type: 'SET_PLAYBACK', payload: true});
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
    store.dispatch({type: 'SET_PLAYBACK', payload: false});
  });

  TrackPlayer.addEventListener('remote-next', () => {
    let {playback, tracks} = store.getState();
    let {currentTrack, shuffle} = playback;
    let {trackList} = tracks;
    backgroundPlayback(
      shuffle
        ? trackList[getRandomNumber(0, trackList.length)]
        : currentTrack.index === trackList.length - 1
        ? trackList[0]
        : trackList[currentTrack.index + 1],
    );
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    let {playback, tracks} = store.getState();
    let {currentTrack, shuffle} = playback;
    let {trackList} = tracks;
    backgroundPlayback(
      shuffle
        ? trackList[getRandomNumber(0, trackList.length)]
        : currentTrack.index === 0
        ? trackList[trackList.length - 1]
        : trackList[currentTrack.index - 1],
    );
  });

  TrackPlayer.addEventListener('playback-queue-ended', ({position}) => {
    let {playback, tracks} = store.getState();
    let {currentTrack, shuffle, loop} = playback;
    let {trackList} = tracks;
    if (position > 0) {
      if (loop) {
        backgroundPlayback(currentTrack);
      } else {
        backgroundPlayback(
          shuffle
            ? trackList[getRandomNumber(0, trackList.length)]
            : currentTrack.index === trackList.length - 1
            ? trackList[0]
            : trackList[currentTrack.index + 1],
        );
      }
    }
  });
};
