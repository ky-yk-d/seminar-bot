const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const {tableName} = require('./configs/dynamo');

exports.put = (item) => {
  console.log('Received item:', item);
  let params = {
    TableName: tableName,
    Item: 
      item
  };
  dynamo.put(params);
};