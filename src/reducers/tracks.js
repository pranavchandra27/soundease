const initState = {trackList: [], tracksLoaded: false};

export default function(state = initState, action) {
  switch (action.type) {
    case 'GET_TRACKS':
      return {tracksLoaded: true, trackList: action.payload};
    case 'RENAME_TRACK': {
      let trackArray = [...state.trackList];
      let index = trackArray.findIndex(i => i.id === action.payload.id);
      if (index !== -1) trackArray[index] = action.payload;
      return {...state, trackList: trackArray};
    }
    case 'DELETE_TRACK': {
      let trackArray = [...state.trackList];
      let i = trackArray.findIndex(item => item.id === action.payload.id);
      if (i !== -1) {
        trackArray.splice(i, 1);
        trackArray = trackArray.map((val, i) => {
          return {...val, index: i};
        });
      }
      return {...state, trackList: trackArray};
    }
    default:
      return state;
  }
}
