var http = require('http');
var ran = 0;
var queryNum = 100;
var parallel = 10;
var agent = new http.Agent({maxSockets: parallel});

if (process.argv.length != 5) {
  console.error('usage: node http-request.js host port url\n' +
                'ex). node http-request.js example.com 8080 /index.html');
  process.exit(-1);
}

var host = process.argv[2];
var port = process.argv[3];
var path  = process.argv[4];
var options = {
  host: host,
  port: port,
  path: path,
  method: 'GET',
  agent: agent
};
var queryStatuses = [];
var startTime = new Date();

function get() {
  if (--queryNum < 0) return;
  var req = http.request(options, function(res) {
    var data;
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      ran++;
      queryStatuses.push(new Date() - req.queryStartTime);
      get();
    });
  });
  req.on('socket', function() {
    req.queryStartTime = new Date();
  });
  req.end();
}
for (var i = 0; i < parallel; i++) {
  get();
}

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

process.on('SIGINT', function() {
  process.exit(0);
});

process.on('exit', function() {
  var runningTime = (new Date()) - startTime;
  console.log('------------------------');
  console.log('ran ' + ran + ' queries');
  console.log('running time:' + runningTime + 'ms');
  console.log(ran / runningTime * 1000 + 'q/s');
  console.log('1st query time: ' + queryStatuses[0] + 'ms');
  console.log('queryStatus length: ' + queryStatuses.length);
});
