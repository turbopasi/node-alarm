![node-alarm](https://i.imgur.com/VCYTQQx.png)

> `node-alarm` is a simple mechanism which can be plugged in almost everywhere in your code. Be it a button click, a request error, the results from a calculation or sensors. The "alarm" will be triggered whenever a certain event occurs too often within specified timeframe. 


### Example usage : 

```js
//alarm.js

const  Alarm  =  require('node-alarm');
const  alarm  =  new  Alarm();

const  rule  = alarm.add({
	name :  "foo",
	maxEvents :  10,
	timeframe :  10000
});

// Listen for 'alarm' event directly on the rule, or
rule.on('alarm', () => {
	// Act on it
});

// listen globally for all rules
alarm.on('alarm', (rule) => {
	// Act on it
});

module.exports  = alarm;
```

```js
// any.js

const  alarm  =  require('./alarm.js');

// Now, whenever an event occurs, which you want to keep track of,
// you raise the alarm buffer by 1.
webrequest.get("/notexist")
.catch(error => { 
	alarm.count("foo");
});

// If too many event like this occur (> maxEvents) within specified time (timeframe)
// the alarm will be raised.

// This should trigger the alarm
setInterval(() => {
	alarm.coun("foo");
}, 500)

// This shouldn't trigger the alarm
setInterval(() => {
	alarm.count("foo");
},2000)
```

### Options

`alarm.add( options );`

