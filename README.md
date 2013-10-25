fake-dynamo-gem (obsolete)
--------------------------

NB: This project has been superseded by [dynalite](https://github.com/mhart/dynalite) - please use that for your node.js mock DynamoDB needs.

[![Build Status](https://secure.travis-ci.org/mhart/node-fake-dynamo-gem.png?branch=master)](http://travis-ci.org/mhart/node-fake-dynamo-gem)

A node.js wrapper for the
[fake_dynamo](https://github.com/ananthakumaran/fake_dynamo) gem.

For testing purposes mainly - and just because
[magneto](https://github.com/exfm/node-magneto) isn't quite as mature yet.

Example
-------

```javascript
var fakeDynamoGem = require('fake-dynamo-gem')

fakeDynamoGem(function(err, fakeDynamo) {
  if (err) throw err

  // We have now spawned fake_dynamo with the default settings (port 4567)
  // fakeDynamo is just a standard ChildProcess object

  // Kill it when we're done testing (will also kill on process exit)
  fakeDynamo.kill()
})

// Can also pass custom args
fakeDynamoGem(['--port=1234', '--db=/tmp/fake_dynamo.fdb'], function(err, fakeDynamo) {
  if (err) throw err

  fakeDynamo.kill()
})
```

Also provides a `nfakedynamo` binary, which just delegates directly to `fake_dynamo`

API
---

### fakeDynamoGem([spawnArgs], [spawnOptions], [callback])

Spawns `fake_dynamo` with the given args/options (requires Ruby 1.9 I believe)

Installation
------------

With [npm](http://npmjs.org/) do:

```
npm install fake-dynamo-gem
```

Thanks
------

Thanks to [@ananthakumaran](https://github.com/ananthakumaran) for the great
[fake_dynamo](https://github.com/ananthakumaran/fake_dynamo) project!

