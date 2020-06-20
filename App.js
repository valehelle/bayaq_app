import { AppLoading, Linking } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { configureStore } from '@reduxjs/toolkit'
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-facebook';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()



const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(mySaga)
async function logIn() {
  console.log('fffff')
  const helo = await Facebook.initializeAsync('593490678184542')
  console.log(helo)

}
export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const _handleRedirect = event => {
    if (Constants.platform.ios) {
      WebBrowser.dismissBrowser();
    } else {
      this._removeLinkingListener();
    }

    let data = Linking.parse(event.url);
  };
  Linking.addEventListener('url', _handleRedirect);
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar style="light" />}
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </View>
    );
  }
}



async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);


}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
