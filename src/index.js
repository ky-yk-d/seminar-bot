const Connpass = require('./connpass');
const dynamo = require('./dynamo');

exports.handler = async (queries)=>{
  console.log('Search Start:',queries);
  let result = await Connpass.getAll(queries);
  let shouldNotify = true;
  for (let i = 0; i < result.length ; i++){ // array.forEach()はawaitに対応していないため
    shouldNotify = true;
    let res = await dynamo.put(result[i]).catch(()=>{
      shouldNotify = false;
      return '通知済み';
    });
    console.log('index.js:',result[i].title,':',res);
    if(shouldNotify){
      console.log('通知！:', result[i].title);
    }
  }
  // await dynamo.put(result[1]);
  return 'done';
};