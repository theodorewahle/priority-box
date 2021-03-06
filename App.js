import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import NativeTachyons, { styles as s } from 'react-native-style-tachyons';

import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store';
import Colors from './constants/Colors';
import Layout from './constants/Layout';
import firebase from 'firebase';

NativeTachyons.build(
  {
    /* REM parameter is optional, default is 16 */
    rem: Layout.isSmallDevice ? 16 : 18,
    colors: {
      palette: {
        primary: Colors.primary,
        darkPrimary: Colors.darkPrimary,
        lightPrimary: Colors.lightPrimary,
        accent: Colors.accent,
        black: Colors.black,
        grey: Colors.grey,
        lightGrey: Colors.lightGrey,
        white: Colors.white
      }
    }
  },
  StyleSheet
);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentWillMount() {
    var config = {
      apiKey: 'AIzaSyD87u_a_jfREY6a1nlQkFMAJLnDiy36N7M',
      authDomain: 'priority-box.firebaseapp.com',
      databaseURL: 'https://priority-box.firebaseio.com',
      projectId: 'priority-box',
      storageBucket: 'priority-box.appspot.com',
      messagingSenderId: '516596155450'
    };
    firebase.initializeApp(config);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require('./assets/images/robot-dev.png'), require('./assets/images/robot-prod.png')]),
      await Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in Home.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      })
    ]);
    this._handleFinishLoading();
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
