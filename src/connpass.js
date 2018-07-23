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

exports.getAll = async ()=>{
  let opts = {
    hostname: 'connpass.com',
    path: '/api/v1/event/',
    headers: {
      'User-Agent': 'Node/8.10'  // TODO: 何を書くべきかを考える
    }
  };
  const search = require('./configs/search');
  console.log(search.words);
  const queries = {
    count: 15,
    start: 1,
    ym: 201808,
    keyword: '東京都',
    keyword_or: search.words
  };
  let isToContinue = true;
  let allResults = [];
  while (isToContinue) {
    let result = await this.getResponse(opts, queries);
    allResults.push(...result.events);
    console.log('results_start:',result.results_start);
    console.log('results_available:',result.results_available);
    console.log('results_returned:',result.results_returned);
    if (result.results_start + result.results_returned > result.results_available){
      isToContinue = false;
    } else {
      queries.start = result.results_start + result.results_returned;
    }
  }
  console.log('length:',allResults.length);
  return allResults;
};