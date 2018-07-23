const Connpass = require('./connpass');

exports.handler = async ()=>{
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
  let result = await Connpass.getResponse(opts, queries);
  return result;
};