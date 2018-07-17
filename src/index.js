const https = require('https');

const opts = {
  hostname: 'connpass.com',
  path: '/api/v1/event/'
};

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
        console.log('chunk:'. chunk);
        body += chunk;
      });
      response.on('end', ()=>{
        console.log('body:', body);
        resolve(body);
      })
    }).on('error', (err)=>{
      console.log('error:', err);
      reject(err);
    });
  });
};

exports.handler = async (event)=>{
  const queries = [
    {
      name: 'event_id',
      value: '69821'
    }
  ];
  let result = await getResponse(opts, queries);
  return result;
};