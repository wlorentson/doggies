'use strict';

var Screen    = require("../helpers/screen");
var Slots     = require("../tables/slots");
var Toys      = require("../tables/toys");
var Dogs      = require("../tables/dogs");
var YardState = require("../models/yard_state");
var Menu      = require("../components/menu");

var React = require('react-native');
var {
  Image,
  View,
  Text,
} = React;

var Yard = React.createClass({

  _renderSlot(slot) {
    var toyId = YardState.toyIdForSlotId(slot.id);
    var toy = Toys[toyId];
    var dogId = YardState.dogIdForSlotId(slot.id);
    var dog = Dogs[dogId];
    return(
      <View key={slot.id} style={[LocalStyle.slot, {top: slot.y, left: slot.x}]}>
        <Text>{ toy ? toy.name : 'No toy' }</Text>
        <Text>{ dog ? dog.name : 'No dog' }</Text>
      </View>
    );
  },

  _renderSlots() {
    var self = this;
    var x =  (
      Slots.map(function(slot){
        return self._renderSlot(slot);
      })
    );
    return x;
  },

  render() {
    return (
      <View>
        <Image style={[Screen.fullScreen, {position: 'absolute'}]} source={require("../images/doge.png")}></Image>
        {this._renderSlots()}
        <Menu navigator={this.props.navigator} globalStore={this.props.globalStore}></Menu>
      </View>
    );
  }
});

var LocalStyle = {
  slot: {
    position: 'absolute',
    backgroundColor: 'yellow',
    height: 35,
    width: 35,
  }
}
export default Yard;
