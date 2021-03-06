var request = require('request');

describe('calc', () => {
  it('should mult 2 and 2', () => {
    expect(2 * 2).toBe(4);
  });
});

describe('get messages', () => {
  it('shoudl retturn 200 ok', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      console.log(res.body);
      expect(res.statusCode).toEqual(200);
      done();
    })
  })
  it('shoudl retturn a list thats not empty', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      console.log(res.body);
      expect(JSON.parse(res.body).length).toBeGreaterThan(0);
      done();
    })
  })
})

describe('get messages from user', () => {
  it('shoudl retturn 200 ok', (done) => {
    request.get('http://localhost:3000/messages/tim', (err, res) => {
      console.log(res.body);
      expect(res.statusCode).toEqual(200);
      done();
    })
  })
  it('name should be tim', (done) => {
    request.get('http://localhost:3000/messages/tim', (err, res) => {
      console.log(res.body);
      expect(JSON.parse(res.body)[0].name).toEqual('tim');
      done();
    })
  })
})