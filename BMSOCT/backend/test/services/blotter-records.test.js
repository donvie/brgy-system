const assert = require('assert');
const app = require('../../src/app');

describe('\'blotter-records\' service', () => {
  it('registered the service', () => {
    const service = app.service('blotter-records');

    assert.ok(service, 'Registered the service');
  });
});
