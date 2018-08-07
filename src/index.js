const AWS = require('aws-sdk');

const Connpass = require('./connpass');
const dynamo = require('./dynamo');

exports.handler = async (queries)=>{
  const lambda = new AWS.Lambda();
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
      const params = {
        FunctionName: process.env.NextLambda,
        InvocationType: 'Event', // 非同期呼び出し
        Payload: JSON.stringify(result[i])
      };
      lambda.invoke(params).promise().then(
        (res)=>{
          console.log(res);
        },
        (error)=>{
          console.log('Error:', error);
        });
    }
  }
  // await dynamo.put(result[1]);
  return 'done';
};