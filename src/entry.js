'use strict';

const AWS = require('aws-sdk');
const moment = require('./lib/moment');

exports.handler = () => {
  const targetLambdaArn = process.env.TARGET_LAMBDA_ARN;

  if (!targetLambdaArn) {
    console.log('後続のLambdaが設定されていない');
    return null;
  }
  console.log(targetLambdaArn);
  const lambda = new AWS.Lambda();
  // 検索ワード
  const search = require('./configs/search');
  let ArrayOfArrayOfWords = [[]];
  let i = 0;
  search.words.forEach((element, index)=>{
    ArrayOfArrayOfWords[i].push(element);
    // console.log(i);
    // 検索ワードを10語ずつ配列の要素（配列）に詰める
    const batchSize = search.batchSize;
    if (index % batchSize === batchSize-1){
      i++;
      ArrayOfArrayOfWords.push([]);
      console.log('i++', index);
    }
  });
  console.log(ArrayOfArrayOfWords);
  let yms = [
    parseInt(moment().format('YYYYMM'), 10),
    parseInt(moment().format('YYYYMM'), 10) + 1,
    parseInt(moment().format('YYYYMM'), 10) + 2
  ];
  const queries = {
    count: 100,
    start: 1,
    ym: yms,
    keyword: '東京都',
    keyword_or: []
  };
  let locations = search.locations;
  locations.forEach((location)=>{
    queries.keyword = location;
    ArrayOfArrayOfWords.forEach((element,index)=>{
      queries.keyword_or = element;
      const params = {
        FunctionName: targetLambdaArn,
        InvocationType: 'Event', // 非同期呼び出し
        Payload: JSON.stringify(queries)
      };
      lambda.invoke(params).promise().then(
        (res)=>{
          console.log(index,res);
        },
        (error)=>{
          console.log('Error:', index, error);
        });
    });
  });
  return 'endOfIndex';
};

