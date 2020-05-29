const EventEmitter = require('events');

class Rule extends EventEmitter {

  constructor(options) {
   
    super();

    //this.triggerFunction = cb;
    this.name = options.name;
    this.maxEvents = options.maxEvents;
    this.timeframe = options.timeframe;
    this.autoreset = options.autoreset;
    this.once = options.once;

    this.triggered = false;
    this.eventsCount = 0;
    this.lastOccurence = null;
    this.eventBuffer = [];

  }

  count() {

    if (this.once && this.triggered) { return; }

    this.eventsCount++;
    const now = Date.now();
    this.triggerEvent(now, this.eventsCount);
    this.checkCondition(now);
    
  }

  checkCondition(now) {

    // Calculate ms since lastOccurence
    const diff = this.eventBuffer.length == 0 ? 0 : now - this.lastOccurence;
    this.lastOccurence = now;
    this.eventBuffer.push( diff );

    // Check Condition for "maxEvents"
    if (this.eventBuffer.length > this.maxEvents) {

      if (this.timeframe <= 0) {
        this.eventBuffer.shift();
        return this.triggerAlarm();
      } 

      this.eventBuffer[0] = 0;

      // FROM ALL EVENTS WE OBSERVE, CALCULATE IN WHICH TIMEFRAME THEY OCCURED
      const sumTime = this.eventBuffer.reduce((a, b) => a + b, 0);
      this.eventBuffer.shift();
      if (sumTime <= this.timeframe) {
        this.triggerAlarm();
      }
      
    }

  }

  triggerEvent(timestamp, totalEvents) {
    this.emit("event", timestamp, totalEvents);
  }

  triggerAlarm() {
    this.triggered = true;
    this.eventBuffer = this.autoreset ? [] : this.eventBuffer;
    this.emit("alarm");
  }

  reset() {
    this.triggered = false;
    this.eventBuffer = [];
  }

}


class Alarm extends EventEmitter {

  constructor() {
    super();
    this.alarmStack = {};
  }

  add (options) {

    const rule = new Rule(options);

    rule.on('event', (timestamp, totalEvents) => {
      this.emit('event', {
        name : rule.name,
        timestamp : timestamp,
        totalEvents : totalEvents
      });
    });

    rule.on('alarm', () => {
      this.emit('alarm', {
        name : rule.name
      });
    });

    this.alarmStack[rule.name] = rule;
    return rule;

  }

  remove (name) {
    if (!!this.alarmStack[name]) {
      this.alarmStack[name] = null;
      delete this.alarmStack[name];
    }
  }

  count (name) {
    if (!!this.alarmStack[name]) {
      this.alarmStack[name].count();
    }
  }

  reset (name) {
    if (!!this.alarmStack[name]) {
      this.alarmStack[name].reset();
    }
  }

  getLastOccurence (name, humanReadable) {
    if (!!this.alarmStack[name]) {
      let lastOccurence = this.alarmStack[name].lastOccurence;
      if (!humanReadable) { return new Date(lastOccurence); } else {
        let now = Date.now();
        let diff = now - lastOccurence;
        return `${diff} ms ago`
      }
    }
  }

}

/////////////////////////////

module.exports = Alarm
