//test created using mocha and chai
let expect = require('chai').expect;
let request = require('request');

describe('Status and Content', function() {
  describe('checking status of fetch request', function() {
    it('status', function(done) {
      request('http://localhost:8000/api/batman', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      })
    })

    it('content', function(done) {
      request('http://localhost:8000/api/batman', function(error, response, body) {
        expect(body).to.equal(response.body);
        done();
      })
    })
  })
})