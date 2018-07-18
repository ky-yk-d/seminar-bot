const https = require('https');

exports.getResponse = async (opts, queries)=>{
  let queryString = '?'; 
  queries.forEach((query, index) => {
    queryString += encodeURIComponent(query.name) + '=' + encodeURIComponent(query.value);
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
        console.log('1つめのイベント:', bodyObj.events[0].title);
        resolve(bodyObj);
      });
    }).on('error', (err)=>{
      console.log('error:', err);
      reject(err);
    });
  });
};
