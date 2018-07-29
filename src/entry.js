'use strict';

const AWS = require('aws-sdk');
const search = require('./configs/search');
console.log(search.words);
const queries = {
  count: 100,
  start: 1,
  ym: 201808,
  keyword: '東京都',
  keyword_or: 'アジャイル'
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
    // FunctionName: targetLambdaArn,
    FunctionName: 'seminar-bot',
    Payload: JSON.stringify(queries)
  };
  console.log('JSON',JSON.stringify(params));
  let lambdaCallback = await lambda.invoke(params);
  return 'done';
};

