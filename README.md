#  [![NPM version][npm-image]][npm-url] 

> Provides a simple factory function that returns a redis client instance


## Install

```sh
$ npm install --save make-redis-client
```


## Usage

Call the factory with a plain object containing the properties you want your redis client to be configured with.

In addition to the config options from [redis](https://www.npmjs.com/package/redis), you can also define the database-number you want to select.

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
	'family',
	'db'
];

```

## Example

```js
var makeRedisClient = require('make-redis-client');

var client = makeRedisClient({
	host: '127.0.0.1',
	port: 6379,
	db: 5,
	connect_timeout: 300
});

client.get('foo', function(err, result) {
	console.log(result);
});
```


## License

MIT © [Benjamin Kroeger]()


[npm-url]: https://npmjs.org/package/make-redis-client
[npm-image]: https://badge.fury.io/js/make-redis-client.svg
