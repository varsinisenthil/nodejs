// Events Directive
var events = require('events');
var eventEmitter = new events.EventEmitter();
//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}
//Assign the event handler to an event:
eventEmitter.on('sscream', myEventHandler);
//Fire the 'scream' event:
eventEmitter.emit('sscream');