const https = require('https');

async function getResponse(opts, queries){
  let queryString = '?'; 
  queries.forEach((query, index) => {
    queryString += query.name + '=' + query.value;
    if(index !== queries.length-1){
      queryString += '&';
    }
  });
  opts.path += queryString;
  console.log('path:', opts.path);
  return new Promise((resolve, reject)=>{
    let req = https.get(opts, (response)=>{
      console.log('statusCode:', response.statusCode);
      console.log('statusMessage:', response.statusMessage);
      console.log('headers:', response.headers);
      response.setEncoding('utf8');
      let body = '';
      response.on('data', (chunk)=>{
        console.log('chunk');
        body += chunk;
      });
      response.on('end', ()=>{
        console.log('typeof(body):', typeof(body));
        bodyObj = JSON.parse(body);
        console.log('body:', bodyObj);
        resolve(bodyObj);
      });
    }).on('error', (err)=>{
      console.log('error:', err);
      reject(err);
    });
  });
};

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
  let result = await getResponse(opts, queries);
  return result;
};