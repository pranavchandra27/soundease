const initState = {
  currentTrack: {
    id: '000',
    title: 'Unknown Title',
    artist: 'Unknown Artist',
    duration: 0,
    artwork: 'cover',
  },
  loop: false,
  shuffle: false,
};

export default function(state = initState, action) {
  switch (action.type) {
    case 'CURRENT_TRACK':
      return {...state, currentTrack: action.payload};
    case 'SET_LOOP':
      return {...state, loop: action.payload};
    case 'SET_SHUFFLE':
      return {...state, shuffle: action.payload};
    default:
      return state;
  }
}
