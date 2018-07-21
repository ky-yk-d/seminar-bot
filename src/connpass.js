const https = require('https');
const queryString = require('querystring');

exports.makeQueryString = (q)=>{
  return '?' + queryString.stringify(q);
};

exports.getResponse = async (opts, queries)=>{
  opts.path += this.makeQueryString(queries);
  console.log('path:', opts.path);
  return new Promise((resolve, reject)=>{
    https.get(opts, (response)=>{
      console.log('statusCode:', response.statusCode);
      console.log('statusMessage:', response.statusMessage);
      response.setEncoding('utf8');
      let body = '';
      let chunkCount = 0;
      response.on('data', (chunk)=>{
        chunkCount ++;
        body += chunk;
      });
      response.on('end', ()=>{
        console.log('チャンクの個数',chunkCount);
        let bodyObj = JSON.parse(body);
        console.log('1つめのイベント:', bodyObj.events[0].title);
        resolve(bodyObj);
      });
    }).on('error', (err)=>{
      console.log('error:', err);
      reject(err);
    });
  });
};
