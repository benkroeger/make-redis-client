#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Provides a simple factory function that returns a redis client instance


## Install

```sh
$ npm install --save make-redis-client
```


## Usage

```js
var makeRedisClient = require('make-redis-client');

var client = makeRedisClient({/* your node_redis options here */});
```

## Valid Options

```js

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

```


## License

MIT © [Benjamin Kroeger]()


[npm-url]: https://npmjs.org/package/make-redis-client
[npm-image]: https://badge.fury.io/js/make-redis-client.svg
[travis-url]: https://travis-ci.org/benkroeger/make-redis-client
[travis-image]: https://travis-ci.org/benkroeger/make-redis-client.svg?branch=master
[daviddm-url]: https://david-dm.org/benkroeger/make-redis-client.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/benkroeger/make-redis-client
