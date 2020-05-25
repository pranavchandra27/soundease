const initState = {isPlaying: false};

export default function(state = initState, action) {
  switch (action.type) {
    case 'SET_PLAYBACK':
      return {...state, isPlaying: action.payload};
    default:
      return state;
  }
}
