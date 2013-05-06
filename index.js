var spawn = require('child_process').spawn

module.exports = start

function start(spawnArgs, spawnOptions, cb) {
  if (!cb) { cb = spawnOptions; spawnOptions = {} }
  if (!cb) { cb = spawnArgs; spawnArgs = [] }
  if (!cb) { cb = function(){} }

  var gemHome = __dirname + '/ruby', fakeDynamo, lastStdErr

  spawnOptions.env = spawnOptions.env || {}
  spawnOptions.env.GEM_HOME = spawnOptions.env.GEM_HOME || gemHome

  fakeDynamo = spawn(gemHome + '/bin/fake_dynamo', spawnArgs, spawnOptions)

  fakeDynamo.stderr.on('data', onStdErr)
  fakeDynamo.on('close', onClose)
  fakeDynamo.on('error', onError)

  process.on('exit', function() { fakeDynamo.kill() })

  function onStdErr(data) {
    if (/HTTPServer#start: pid=\d+ port=\d+/.test(data)) {
      removeListeners()
      return cb(null, fakeDynamo)
    }
    lastStdErr = data
  }

  function onClose(code) {
    removeListeners()
    cb(new Error(lastStdErr))
  }

  function onError(error) {
    removeListeners()
    fakeDynamo.kill()
    cb(new Error(error))
  }

  function removeListeners() {
    fakeDynamo.stderr.removeListener('data', onStdErr)
    fakeDynamo.removeListener('close', onClose)
    fakeDynamo.removeListener('error', onError)
  }
}

