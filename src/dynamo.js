const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const {tableName} = require('./configs/dynamo');

exports.put = async (item) => {
  return new Promise((resolve,reject)=>{
    let params = {
      TableName: tableName,
      Item: {
        event_id: item.event_id.toString(),
        title: item.title,
        event_url: item.event_url,
        started_at: item.started_at,
        ended_at: item.ended_at,
        place: item.place
      }
    };
    console.log(params);
    dynamo.put(params, (err,data)=>{
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};