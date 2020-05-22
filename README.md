# node-alarm
Trigger alarm when certain events occur too often in specified timeframe.

Register new Alarm with options :
- name : String 
- callback function : function which will be called when alarm gets triggered
- maxEvents : e.g. 10 , how often an event can occur during specified timeframe, before alarm gets triggered
- timeframe : e.g. 10, timeframe (in seconds) in which maxEvents can occur, before alarm gets triggered

From the example above, an alarm will be triggered, if the event occurs 10 times within 10 seconds.

Additional Options : 
- once (default false) - if the alarm should only get triggered once or everytime the condition is met
- beforeTrigger (function) - a callback which will be raised before a alarm gets triggered. 

Methods on Alarm : 
- Start
- Stop
- Remove
- Flush
- Trigger
- 
