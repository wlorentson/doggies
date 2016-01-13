'use strict';

var React = require('react-native');
var _     = require('lodash-node');
var dogs  = require("../tables/dogs");
var {
} = React;


var YardState = {
	_state: {
		lastUpdate: 1451856564213,
		slots: {
			1: { toyId: 1},
			2: { toyId: 2},
			3: { toyId: 3},
			4: { toyId: 4},
			5: { toyId: 5},
			6: { toyId: 6},
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
		var dogId = this._state.slots[slotId].dogId;
		var timeLeft = this._state.slots[slotId].dogWillLeave;
    delete this._state.slots[slotId].dogId;
		delete this._state.slots[slotId].dogWillLeave;
    delete dogs[dogId].inSlot;
    dogs[dogId].lastTimeLeft = timeLeft;
	},

  _addDogs() {
    var self = this;
    var slotsSeekingDogs = {};
		_.each(this.getState().slots, function(slot, slotId) {
			if (!slot.dogId && slotId != 1) { //no Tubbs
        if(Math.random() <= 0.75) { //75% chance
          slotsSeekingDogs[slotId] = slot;
        }
      }
		});
		_.each(slotsSeekingDogs, function(slot, slotId) {
        console.log( "find dog for slot " + slotId );
				self._addDog(slotId);
    });
	},

	_addDog(slotId) {
    var self = this;
    var curTime = (new Date).getTime();
    var dogFoundId = 0;
    var dogFoundPower = 0;
 		_.each(dogs, function(dog, dogId) {
      if (!dog.inSlot && dog.lastTimeLeft == 0) { //sleepTime not implemented yet
        if(dog.power > dogFoundPower) {
          dogFoundId = dogId;
        }
      }
		});
        console.log( "adding dog " + dogs[dogFoundId].name +
                    " slot " + slotId);
        self.getState().slots[slotId].dogId = dogFoundId;
        self.getState().slots[slotId].dogWillLeave = curTime + 500000; //Playtime
        dogs[dogFoundId].inSlot = slotId;
	},

  updateState() {
		this.setState({lastUpdate: (new Date).getTime()});
    console.log( "updateState" );
		this._removeDogs();
    this._addDogs();
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
