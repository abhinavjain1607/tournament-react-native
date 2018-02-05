// import HomeScreen from './components/HomeScreen';
import HomeScreen from './components/HomeScreen/';
import Details from './components/Details/';
import Players from './components/Players/';
import {Button, View, Text} from 'react-native';
import {DrawerNavigator, addNavigationHelpers} from 'react-navigation';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux';
import React from 'react';
import { Font } from 'expo';
import * as firebase from 'firebase';
// import dotenv from 'dotenv';
//
// dotenv.config();

const config = {
    apiKey: "AIzaSyAyY9OHJZBCDDEu5AkIJFIwZf9AeDolqfQ",
    authDomain: "tournament-app-28b60.firebaseapp.com",
    databaseURL: "https://tournament-app-28b60.firebaseio.com",
    projectId: "tournament-app-28b60",
    storageBucket: "tournament-app-28b60.appspot.com",
    messagingSenderId: "189928823901"
  };
firebase.initializeApp(config);

const AppNavigator = DrawerNavigator({
  Players: {
    screen: Players
  },
}, {
  initialRouteName: 'Players',
  contentOptions: {
    activeTintColor: '#1565c0',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    labelStyle: {
      fontSize: 25,
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
});

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Players'));

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
const appReducer = combineReducers({
  nav: navReducer,
});

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");


class App extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
  appReducer,
  applyMiddleware(middleware),
);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
