const index = require('./src/index');
const testEvent = require('./sample/ScheduledEvent');

console.log('---START---');
index.handler(testEvent).then((res)=>{
  console.log('res:',res);
});
console.log('---END---');