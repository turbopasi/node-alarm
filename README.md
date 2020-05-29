![node-alarm](https://i.imgur.com/VCYTQQx.png)

```js
//alarm.js

const Alarm = require('node-alarm');
const alarm = new Alarm();

const rule = alarm.add({
  name : "foo",
  maxEvents : 10,
  timeframe : 10000
});

rule.on('alarm', () => {
  // Send Notification To Admin, 
  // Make Log Entry,
  // Restart Application,
  // Dynamically Change Value, 
  // Ignore , ...
});

alarm.on('alarm', (name) => {
  console.log(name);
  // "foo" 
});

module.exports = alarm;

```

```js
// any.js

const alarm = require('./alarm.js');

// Now, whenever an event occurs, which you want to keep track of,
// you raise the alarm buffer by 1. 
alarm.count("foo");

// If too many event like this occur (> maxEvents) within specified time (timeframe)
// the alarm will be raised. 

```
