// 環境変数'SlackPath'に'/services/...'と記載。

const https = require('https');

const options = {
  hostname: 'hooks.slack.com',
  path: process.env.SlackPath,
  PORT: 443,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  method: 'PUT'
};

exports.handler = async (event, context, callback) => {
  console.log(options);
  return new Promise((resolve, reject)=>{
    let res = https.request(options, (res)=>{
      console.log('statusCode:', res.statusCode);
    }).on('response',function(response){
      console.log('---response---');
      console.log(response);
      callback(null, 'callback success!');
      resolve('success & resolved');
    }).on('error', function(e){
      console.log('error:', e.stack);
      reject('error & rejected');
    });
    let body = {
      text: 'Hello World!'
    };
    res.write(JSON.stringify(body));
    res.end();
  });
};