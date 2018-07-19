const assert = require('power-assert');
const testEvent = require('../sample/ScheduledEvent');
const Connpass = require('../src/connpass');

let opts = {
  hostname: 'connpass.com',
  path: '/api/v1/event/',
  headers: {
    'User-Agent': 'Node/8.10'  // TODO: 何を書くべきかを考える
  }
};

describe('クエリ文字列生成', ()=>{
  it('1つのクエリ文字列が取得できる', ()=>{
    let queryObj = {
      keyword: 'abc'
    };
    assert(Connpass.makeQueryString(queryObj) === 'keyword=abc');
  });
  it('1つのクエリ文字列（日本語）が取得できる。ただし、変換されていること。', ()=>{
    let queryObj = {
      keyword: 'ふりかえり'
    };
    assert(Connpass.makeQueryString(queryObj) !== 'keyword=ふりかえり');
  })
});

describe('Connpassモジュールのテスト', ()=>{

  it('1つのクエリ文字列でデータが取得できる', async ()=>{
    let localOpts = Object.assign({},opts);
    let queries = [
      {
        name: 'keyword',
        value: 'ふりかえり'
      }
    ];
    let result = await Connpass.getResponse(localOpts, queries);
    assert(result.events[0].title !== '');
  });

  it('2つのクエリ文字列でデータが取得できる',async()=>{
    let localOpts = Object.assign({},opts);
    let queries = [
      {
        name: 'keyword',
        value: 'ふりかえり'
      },
      {
        name: 'keyword',
        value: '実践'
      }
    ]
    let result = await Connpass.getResponse(localOpts,queries);
    assert(result.events[0].title !== '');
  });
});