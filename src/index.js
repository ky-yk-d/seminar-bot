const Connpass = require('./connpass');
const dynamo = require('./dynamo');

exports.handler = async (queries)=>{
  console.log('Search Start:',queries);
  let result = await Connpass.getAll(queries);
  for (let i = 0; i < result.length ; i++){ // array.forEach()はawaitに対応していないため
    let res = await dynamo.put(result[i]).catch(()=>'通知済み');
    console.log('index.js:',result[i].title,':',res);
  }
  // await dynamo.put(result[1]);
  return 'done';
};