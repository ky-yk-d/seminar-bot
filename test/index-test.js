const assert = require('power-assert');
const index = require('../src/index');
const testEvent = require('../sample/ScheduledEvent');

describe('ハンドラ関数のテスト', ()=>{

  it ('ConnpassのAPIから何かしら取得できる', async ()=>{
    let result = await index.handler(testEvent);
    assert(result !== '');
  })

})