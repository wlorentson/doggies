/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var Yard = require("./app/components/yard");
var Shop = require("./app/components/shop");

var YardState = require("./app/models/yard_state");
var React = require('react-native');
var {
  AppRegistry,
  Navigator,
} = React;


var globalStore = {
  yardState: YardState
};

var sikka_net_client = React.createClass({
  renderScene(route, nav) {
    switch (route.id) {
      case 'Shop':
        return <Shop globalStore={globalStore} navigator={nav} />;
      case 'Yard': // fall through
      default:
        return <Yard globalStore={globalStore} navigator={nav} />;
    }
  },

  render() {
    YardState.updateState();
    return (
      <Navigator
        initialRoute={{ id: 'Yard'}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }

          return Navigator.SceneConfigs.FloatFromRight;
        }} />
    );
  }
});

AppRegistry.registerComponent('sikka_net_client', () => sikka_net_client);
