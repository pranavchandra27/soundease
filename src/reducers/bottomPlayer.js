const initState = {footerVisible: true};

export default function(state = initState, action) {
  switch (action.type) {
    case 'SHOW_FOOTER':
      return {footerVisible: true};
    case 'HIDE_FOOTER':
      return {footerVisible: false};
    default:
      return state;
  }
}
