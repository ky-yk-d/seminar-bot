'use strict';

const AWS = require('aws-sdk');

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
    if (index % 10 === 9){
      i++;
      ArrayOfArrayOfWords.push([]);
      console.log('i++', index);
    }
  });
  console.log(ArrayOfArrayOfWords);
  
  const queries = {
    count: 100,
    start: 1,
    ym: 201808,
    keyword: '東京都',
    keyword_or: []
  };
  ArrayOfArrayOfWords.forEach((element,index)=>{
    queries.keyword_or = element;
    const params = {
      FunctionName: targetLambdaArn,
      InvocationType: 'Event',
      Payload: JSON.stringify(queries)
    };
    let done = lambda.invoke(params).promise();
    console.log(done);
    done.then(
      (res)=>{
        console.log(index,res);
      },
      (error)=>{
        console.log('Error', index, error);
      });
  });
  return 'endOfIndex';
};

