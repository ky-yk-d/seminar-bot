const Connpass = require('./connpass');
const dynamo = require('./dynamo');

exports.handler = async (event)=>{
  console.log(event);
  /*
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
    'count': 100,
    'start': 1,
    'ym': 201808,
    'keyword': '東京都',
    'keyword_or': search.words
  };
  */
  const search = require('./configs/search');
  console.log(search.words);
  const queries = {
    count: 100,
    start: 1,
    ym: 201808,
    keyword: '東京都',
    keyword_or: search.words
  };
  let result = await Connpass.getAll(queries);
  for (let i = 0; i < result.length ; i++){ // array.forEach()はawaitに対応していないため
    let res = await dynamo.put(result[i]);
    console.log(res);
  }
  // await dynamo.put(result[1]);
  return 'done';
};