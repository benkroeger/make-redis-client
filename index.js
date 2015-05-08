'use strict';

// native modules
var util = require('util');

// 3rd party modules
var redis = require('redis');

// local variable definitions

// Debugging
var debugEnabled = process.env.NODE_DEBUG && /\bredis-client\b/.test(process.env.NODE_DEBUG);

function debug() {
  if (debugEnabled) {
    console.error('MakeRedisClient: %s', util.format.apply(util, arguments));
  }
}

function isPlainObject(obj) {
  return typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
}

var validRedisOptions = [
  'unixSocket', // if this is presented, host and port are ignored
  'host',
  'port',
  'parser',
  'return_buffers',
  'detect_buffers',
  'socket_nodelay',
  'socket_keepalive',
  'no_ready_check',
  'enable_offline_queue',
  'retry_max_delay',
  'connect_timeout',
  'max_attempts',
  'auth_pass',
  'family'
];

/**
 * [makeRedisClient creates a redisClient according to the provided arguments. Also selects any specified database]
 * @param  {[Object Literal]} args [an object literal with the redis options you want to set on the client including connection parameters (host + ip or unix socket)]
 * @return {[redisClient]}      [the redis client created with the provided options]
 */
function makeRedisClient(args) {
  // pre-requisite validation

  if (args && !isPlainObject(args)) {
    throw new TypeError('args must be an object literal');
  }

  var redisClient;

  // defining default values
  var redisOptions = {
    host: '127.0.0.1',
    port: 6379,
    max_attempts: 5,
    retry_max_delay: 5000
  };

  // merge defaults with valid redis options from the provided args literal
  validRedisOptions.forEach(function(name){
  	if (args[name]) {
  		redisOptions[name] = args[name];
  	}
  });

  // make unixSocket superseed host and port information
  if (redisOptions.unixSocket) {
  	debug('creating redis client for unix socket');
    redisClient = redis.createClient(redisOptions.unixSocket, redisOptions);
  } else {
  	debug('creating redis client for host "%s" and port "%d"', redisOptions.host, redisOptions.port);
    redisClient = redis.createClient(redisOptions.port, redisOptions.host, redisOptions);
  }

  // BK: I think this can be ignored, since it would get called automatically, when options.auth_pass is presented
  // if auth information was provided, call redisClient.auth with provided parameters
  // details see here: https://github.com/mranney/node_redis#clientauthpassword-callback
  // if (redisOpts.auth && redisOpts.auth.password) {
  //   this.redisClient.auth(redisOpts.auth.password, redisOpts.auth.callback);
  // }

  // NOTE: we are intentionally not handling the "error" event, since we want the actual applicaton code to deal with it

	// listen for "ready" event and select the configured database if any
  redisClient.on('ready', function() {
  	debug('redis client for host "%s" and port "%d" is ready', redisOptions.host, redisOptions.port);
    if (typeof args.db === 'number') {
    	debug('selecting database "%d"', args.db);
      redisClient.select(args.db, function(err) {
        if (err) {
          debug('failed to select database {%d}', args.db);
          redisClient.emit('error', err);
        }
      });
    }
  });

  redisClient.on('connect', function() {
  	debug('redis client for host "%s" and port "%d" is connected', redisOptions.host, redisOptions.port);
  });

  return redisClient;
}

module.exports = makeRedisClient;
