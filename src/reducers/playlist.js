const initState = {Favorites: []};

export default function(state = initState, action) {
  switch (action.type) {
    case 'CREATE_PLAYLIST':
      return {...state, [action.payload]: []};
    case 'ADD_TO_PLAYLIST': {
      let {title, song} = action.payload;
      let updatedList = {...state};
      updatedList[title].push(song);
      return {...updatedList};
    }
    case 'REMOVE_FROM_PLAYLIST': {
      let playlists = {...state};
      let {playlistTitle} = action.payload;
      let index = playlists[playlistTitle].findIndex(
        item =>
          item.title === action.payload.title &&
          item.artist === action.payload.artist,
      );
      if (index !== -1) playlists[playlistTitle].splice(index, 1);
      return {...playlists};
    }
    case 'RENAME_PLAYLIST': {
      let {oldTitle, newTitle} = action.payload;
      let newList = {...state};
      newList[newTitle] = newList[oldTitle];
      delete newList[oldTitle];
      return {...newList};
    }
    case 'DELETE_PLAYLIST': {
      let listCopy = {...state};
      delete listCopy[action.payload];
      return {...listCopy};
    }
    default:
      return state;
  }
}
