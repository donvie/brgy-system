const assert = require('assert');
const app = require('../../src/app');

describe('\'barangay-request-lists\' service', () => {
  it('registered the service', () => {
    const service = app.service('barangay-request-lists');

    assert.ok(service, 'Registered the service');
  });
});
