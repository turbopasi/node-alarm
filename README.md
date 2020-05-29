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

alarm.add("foo");

```
