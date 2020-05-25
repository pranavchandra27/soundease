export const createPlaylist = title => {
  return {type: 'CREATE_PLAYLIST', payload: title};
};

export const addToPlaylist = (title, song) => {
  return {type: 'ADD_TO_PLAYLIST', payload: {title, song}};
};

export const renamePlaylist = (oldTitle, newTitle) => {
  return {type: 'RENAME_PLAYLIST', payload: {oldTitle, newTitle}};
};

export const deletePlaylist = title => {
  return {type: 'DELETE_PLAYLIST', payload: title};
};

export const removeFromPlaylist = (playlistTitle, {title, artist}) => {
  return {
    type: 'REMOVE_FROM_PLAYLIST',
    payload: {playlistTitle, title, artist},
  };
};
