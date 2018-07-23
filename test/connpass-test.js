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

describe.skip('クエリ文字列生成', ()=>{
  it('1つのクエリ文字列が取得できる', ()=>{
    let queryObj = {
      keyword: 'abc'
    };
    assert(Connpass.makeQueryString(queryObj) === '?keyword=abc');
  });
  it('1つのクエリ文字列（日本語）が取得できる。ただし、変換されていること。', ()=>{
    let queryObj = {
      keyword: 'ふりかえり'
    };
    assert(Connpass.makeQueryString(queryObj) !== '?keyword=ふりかえり');
  });
  it('2つのクエリ文字列が取得できる',()=>{
    let queryObj = {
      keyword: 'xyz',
      keyword_or: [
        'abc',
        'def'
      ]
    };
    assert(Connpass.makeQueryString(queryObj)=== '?keyword=xyz&keyword_or=abc&keyword_or=def');
  })
});

describe.skip('Connpassモジュールのテスト', ()=>{

  it('1つのクエリ文字列でデータが取得できる', async ()=>{
    let localOpts = Object.assign({},opts);
    let queries = {
      keyword: 'ふりかえり'
    };
    let result = await Connpass.getResponse(localOpts, queries);
    assert(result.events[0].title !== '');
  });

  it('2つのクエリ文字列でデータが取得できる',async()=>{
    let localOpts = Object.assign({},opts);
    let queries = {
      keyword: [
        'ふりかえり',
        '実践'
      ]
    }
    let result = await Connpass.getResponse(localOpts,queries);
    assert(result.events[0].title !== '');
  });
});

describe('getAllのテスト', ()=>{
  it('全件取得できる', async()=>{
    let allResult = await Connpass.getAll();
    assert(allResult[0].title !== '');
  });
});