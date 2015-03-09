/*global describe, it */
'use strict';
var assert = require('assert');
var makeRedisClient = require('../');

describe('make-redis-client node module', function () {
  it('must have at least one test', function () {
    makeRedisClient();
    assert(false, 'I was too lazy to write any tests. Shame on me.');
  });
});
