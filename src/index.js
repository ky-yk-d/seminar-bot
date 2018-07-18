const Connpass = require('./connpass');

exports.handler = async (event)=>{
  let opts = {
    hostname: 'connpass.com',
    path: '/api/v1/event/',
    headers: {
      'User-Agent': 'Node/8.10'  // TODO: 何を書くべきかを考える
    }
  };
  const queries = [
    {
      name: 'event_id',
      value: '69821'
    }
  ];
  let result = await Connpass.getResponse(opts, queries);
  return result;
};