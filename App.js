import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootStack from './src/stacks/RootStack';
import {store, persistor} from './src/store';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    setTimeout(() => setTimePassed(true), 750);
    store.dispatch({type: 'SET_PLAYBACK', payload: false});
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    console.disableYellowBox = true;
  }, []);

  const renderApp = isReady => {
    if (isReady && timePassed) {
      return <RootStack />;
    }
    return <SplashScreen />;
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{renderApp}</PersistGate>
    </Provider>
  );
};

export default App;
