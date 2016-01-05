'use strict';

var Screen = require("../helpers/screen");
var Menu   = require("../components/menu");

var React = require('react-native');
var {
  Component,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableHighlight,
  AlertIOS,
  View,
  AsyncStorage,
} = React;

var Yard = React.createClass({

  render() {
    return (
			<View style={[Screen.fullScreen, {position: 'absolute'}]}>
				<Text>Shop!</Text>
				<Menu navigator={this.props.navigator} globalStore={this.props.globalStore}></Menu>
			</View>
    );
  }
});

var LocalStyle = {
}
export default Yard;
