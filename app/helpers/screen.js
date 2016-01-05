'use strict';

var React = require('react-native');
var {
	Dimensions,
} = React;


var Screen = {
	height: 548,
	width: Dimensions.get('window').width,
	fullScreen: {
		marginTop: 20,
		width: Dimensions.get('window').width,
		height: 548, // Dimensions.get('window').height,
	}

};
export default Screen;
