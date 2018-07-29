'use strict';

const AWS = require('aws-sdk');
const search = require('./configs/search');
console.log(search.words);
const queries = {
  count: 100,
  start: 1,
  ym: 201808,
  keyword: '東京都',
  keyword_or: search.words
};

exports.handler = async () => {
  const targetLambdaArn = process.env.TARGET_LAMBDA_ARN;

  if (!targetLambdaArn) {
    console.log('後続のLambdaが設定されていない');
    return null;
  }
  console.log(targetLambdaArn);
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: targetLambdaArn,
    Payload: JSON.stringify(queries)
  };
  let done = lambda.invoke(params).promise();
  return done;
};

