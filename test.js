var fs = require('fs'),
    http = require('http'),
    should = require('should'),
    fakeDynamoGem = require('./'),
    DEFAULT_DB = '/usr/local/var/fake_dynamo/db.fdb'

describe('fake-dynamo-gem', function() {
  it('should construct ok with default args', function(done) {
    // Check if we have access to the default file
    try {
      fs.closeSync(fs.openSync(DEFAULT_DB, 'a+'))
    } catch (e) {
      // If not, just ignore it, we can't run this test
      return done()
    }
    fakeDynamoGem(function(err, fakeDynamo) {
      if (err) return done(err)

      http.request({port: 4567, method: 'DELETE'}, function(res) {
        res.statusCode.should.equal(200)
        fakeDynamo.kill()
        done()
      }).on('error', done).end()
    })
  })

  it('should construct ok with custom args', function(done) {
    fakeDynamoGem(['--port=1234', '--db=/tmp/fake_dynamo.fdb'], function(err, fakeDynamo) {
      if (err) return done(err)

      http.request({port: 1234, method: 'DELETE'}, function(res) {
        res.statusCode.should.equal(200)
        fakeDynamo.kill()
        done()
      }).on('error', done).end()
    })
  })
})
