import MusicFiles, {Constants} from 'react-native-get-music-files-v3dev-test';
import {
  checkStoragePermissions,
  getStoragePermission,
} from '../utils/Permissions';
import cleanTrack from '../utils/CleanTrack';

const options = {
  cover: true,
  batchSize: 0,
  batchNumber: 0,
  sortBy: Constants.SortBy.Title,
  sortOrder: Constants.SortOrder.Ascending,
};

export const getTracks = () => async dispatch => {
  try {
    const granted = await checkStoragePermissions();
    if (!granted) await getStoragePermission();
    const {results} = await MusicFiles.getAll(options);
    const tracks = cleanTrack(results);
    dispatch({type: 'GET_TRACKS', payload: tracks});
  } catch (error) {
    console.warn(error);
  }
};
