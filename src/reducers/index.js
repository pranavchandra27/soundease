import {combineReducers} from 'redux';
import tracks from './tracks';
import playback from './playback';
import footer from './bottomPlayer';
import player from './setPlayback';
import playlists from './playlist';

export default combineReducers({
  tracks,
  playback,
  footer,
  player,
  playlists,
});
