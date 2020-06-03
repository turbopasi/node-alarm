![node-alarm](https://i.imgur.com/VCYTQQx.png)

> `node-alarm` is a simple mechanism which can be plugged in almost everywhere in your code. Be it a button click, a request error, the results from a calculation or sensors. The "alarm" will be triggered whenever a certain event occurs too often within specified timeframe. 


### Example usage : 

```js
//alarm.js

const  Alarm  =  require('@turbopasi/node-alarm');
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
### `alarm.add( options );`
While adding a new rule to your alarm stack you can specify the following options : 
```js 
const options = {
	name		: 'unique-name', 
	/* Helps to identify rules after creating multiple rules */ 
	
	maxEvents	: 10,
	/* Maximum allowed amount of event occurences */ 
	
	timeframe	: 10000,
	/* Timeframe in milliseconds which within the maxEvents allowed to occur */ 
	
	autoreset	: false,
	/* If set to false, the alarm keeps triggering as long as conditions are met
	If set to true, the event count buffer clears onced triggered */
	
	once		: false
	/* If set to false, the alarm keeps triggering every time conditions are met,
	If set to true, the alarm triggers only once */ 
};
```

