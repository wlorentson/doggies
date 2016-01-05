'use strict';

var Screen      = require("../helpers/screen");
var MenuOptions = require("../models/menu_options");

var React = require('react-native');
var {
  Text,
	TouchableHighlight,
  Image,
  View,
	AlertIOS,
} = React;

var Menu = React.createClass({

	getInitialState() {
		return ({
			menuOpen: false,
		});
	},

	_onMenuPress() {
		this.setState({menuOpen: !this.state.menuOpen});
	},

	_renderMenuIcon() {
		return (
			<View>
				<TouchableHighlight underlayColor={'white'} onPress={this._onMenuPress}>
					<Image style={LocalStyle.menuIcon} source={require("../images/menu.jpg")}></Image>
				</TouchableHighlight>
			</View>
		);
	},

	_renderMenu() {
		if (this.state.menuOpen) {
			return (
				<View style={LocalStyle.menu}>
					{ this._renderMenuOptions() }
				</View>
			);
		}
	},

	_onMenuOption(optionName) {
		this.props.navigator.push({ id: optionName });
	},

	_renderMenuOptions() {
		var self = this;
		return (
			MenuOptions.options.map(function(menuOption) {
				return (
					<TouchableHighlight style={LocalStyle.menuOption} onPress={() => self._onMenuOption(menuOption.name)}>
						<Text style={LocalStyle.menuOptionText}>{ menuOption.name }</Text>
					</TouchableHighlight>
				);
			})
		);
	},

  render() {
    return (
      <View>
				{ this._renderMenuIcon() }
				{ this._renderMenu() }
      </View>
    );
  }
});

var LocalStyle = {
	menuIcon: {
		position: 'absolute',
		top: 25,
		left: 5,
		height: 50,
		width: 50,
	},

	menu: {
		height: Screen.height / 2,
		width: Screen.width / 2,
		position: 'absolute',
		left: Screen.width / 4,
		top: Screen.height / 4,
		borderColor: 'red',
		borderWidth: 4,
		backgroundColor: 'white',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},

	menuOption: {
		height: 40,
		width: 40,
		margin: 10,
		padding: 3,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},

	menuOptionText: {
		fontSize: 8,
	}

}
export default Menu;
