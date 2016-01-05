'use strict';

var React = require('react-native');
var _     = require('lodash-node');
var {
} = React;


var YardState = {
	_state: {
		lastUpdate: 1451856564213,
		slots: {
			1: { toyId: 1},
			2: { dogId: 2, toyId: 2, dogWillLeave: 1451856564213},
			3: { dogId: 3, toyId: 3, dogWillLeave: 1451856564213},
			4: { dogId: 4, toyId: 4, dogWillLeave: 1451856564213},
			5: { dogId: 5, toyId: 5, dogWillLeave: 1451856564213},
			6: { dogId: 1, toyId: 6, dogWillLeave: 1451856564213},
		}

	},

	_removeDogs() {
    var self = this;
		_.each(this.getState().slots, function(slot, slotId) {
			var curTime = (new Date).getTime();
			if (slot.dogWillLeave && slot.dogWillLeave < curTime) {
        console.log( "removing dog " + slotId );
				self._removeDog(slotId);
      }
		});	
	},

	_removeDog(slotId) {
		delete this._state.slots[slotId].dogId;
		delete this._state.slots[slotId].dogWillLeave;
	},

	updateState() {
		this.setState({lastUpdate: (new Date).getTime()});
    console.log( "updateState" );
		this._removeDogs();
		return this._state;
	},

	getState() {
		return this._state;
	},

	setState(newStateInfo) {
		var self = this;
		_.map(newStateInfo, function(value, key) {
			self._state[key] = value;
		});
		self._save();
	},

	toyIdForSlotId(slotId) {
		return this.getState().slots[slotId].toyId;
	},

	dogIdForSlotId(slotId) {
		return this.getState().slots[slotId].dogId;
	},

	load() {
		return;
	},

	_save() {
		return;
	},
};
export default YardState;
