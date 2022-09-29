const assert = require('assert');
const app = require('../../src/app');

describe('\'transparency-board\' service', () => {
  it('registered the service', () => {
    const service = app.service('transparency-board');

    assert.ok(service, 'Registered the service');
  });
});
