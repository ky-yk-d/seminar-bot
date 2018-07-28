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
        console.log('検索結果件数:', bodyObj.results_available);
        console.log('うち取得件数:', bodyObj.results_returned);
        console.log('1つめのイベント:', bodyObj.events[0].title);
        resolve(bodyObj);
      });
    }).on('error', (err)=>{
      console.log('error:', err);
      reject(err);
    });
  });
};

exports.getAll = async (queries)=>{
  let opts = {
    hostname: 'connpass.com',
    path: '/api/v1/event/',
    headers: {
      'User-Agent': 'Node/8.10'  // TODO: 何を書くべきかを考える
    }
  };
  let shouldContinue = true;
  let allResults = [];
  let connpassResponse;
  while (shouldContinue) {
    connpassResponse = await this.getResponse(opts, queries);
    allResults.push(...connpassResponse.events);
    if (gotAll(connpassResponse)){
      shouldContinue = false;
    } else {
      queries.start = nextStart(connpassResponse);
    }
  }
  console.log('length:',allResults.length);
  return allResults;
};

const gotAll = (connpassResponse)=>{
  return connpassResponse.results_start + connpassResponse.results_returned > connpassResponse.results_available;
};

const nextStart = (connpassResponse)=>{
  return connpassResponse.results_start + connpassResponse.results_returned;
};